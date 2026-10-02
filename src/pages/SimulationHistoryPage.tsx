import { useState } from 'react'
import {
  CalendarClock,
  ChevronRight,
  Goal,
  History,
  PiggyBank,
  Trash2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { PageHero } from '../components/shared/PageHero'
import Button from '../components/shared/Button'
import { useSimulationStorage } from '../hooks/useSimulationStorage'
import { calcMonthlySavings } from '../utils/simulation'
import { parseCurrency } from '../utils/currency'
import type { SimulationRecord } from '../data/simulation'

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

const feasibilityStyles = {
  viable: {
    label: 'Meta viável',
    className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  needs_adjustment: {
    label: 'Ajuste necessário',
    className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  unfeasible: {
    label: 'Meta inviável',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
}

export default function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getAllFormData, deleteFormData } = useSimulationStorage()
  const [records, setRecords] = useState(() => getAllFormData().reverse())

  const handleDelete = (id: string) => {
    deleteFormData(id)
    setRecords(getAllFormData().reverse())
  }

  const handleOpen = (id: string) => {
    void navigate(`/resultado/${id}`)
  }

  const renderRecord = (record: SimulationRecord) => {
    const monthlySavings = calcMonthlySavings(record)
    const feasibility = record.insight?.feasibility
    const status = feasibility ? feasibilityStyles[feasibility.status] : null

    return (
      <li
        key={record.id}
        className="bg-card flex flex-col gap-4 rounded-2xl p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Goal size={18} className="text-primary" />
            <span className="text-foreground text-base font-semibold">
              {record.goalName}
            </span>
            {status && (
              <span
                className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}
              >
                {status.label}
              </span>
            )}
          </div>
          <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <span className="flex items-center gap-1.5">
              <PiggyBank size={14} />
              Meta: R$ {formatCurrency(parseCurrency(record.goalAmount))}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarClock size={14} />
              {record.goalDeadline} meses
            </span>
            <span className="flex items-center gap-1.5">
              Economia mensal: R$ {formatCurrency(monthlySavings)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            icon={Trash2}
            aria-label={`Excluir simulação ${record.goalName}`}
            onClick={() => handleDelete(record.id)}
          />
          <Button
            variant="primary"
            icon={ChevronRight}
            onClick={() => handleOpen(record.id)}
          >
            Ver resultado
          </Button>
        </div>
      </li>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de consultas financeiras"
        subtitle="Todas as simulações salvas neste navegador."
      />

      {records.length === 0 ? (
        <div className="bg-card mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl p-10 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
          <History size={40} className="text-muted-foreground" />
          <div>
            <p className="text-foreground font-semibold">
              Nenhuma consulta por aqui ainda
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              Crie sua primeira simulação para começar a organizar suas metas
              financeiras.
            </p>
          </div>
          <Button variant="primary" onClick={() => void navigate('/')}>
            Criar simulação
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">{records.map(renderRecord)}</ul>
      )}
    </main>
  )
}
