import { PiggyBank } from 'lucide-react'
import StepProgress from './Progress'
import FormStep from './FormStep';




export default function SimulationForm() {
  return (
    <>
      <StepProgress currentStep={1} totalSteps={6} />
      <FormStep
        icon={PiggyBank}
        title='Renda mensal bruta'
        question='Quanto é depositado na sua conta todo mês (somando as fontes)?'
        inputProps={{
          type: 'text',
          placeholder: 'ex: 5.000,00',
          prefix: 'R$'
        }} id={''} onBack={function (): void {
          throw new Error('Function not implemented.');
        } } onNext={function (value: string): void {
          throw new Error('Function not implemented.');
        } }      />
    </>
  );
}
