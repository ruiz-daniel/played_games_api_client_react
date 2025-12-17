import { useForm, Controller } from 'react-hook-form'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { usePlatforms } from '../../../hooks/usePlatforms'
import { useCompletions } from '../../../hooks/useCompletions'

const FilterForm = ({ onSubmit }) => {
  const { register, handleSubmit, control } = useForm()
  const { platforms } = usePlatforms()
  const { completions } = useCompletions()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="game-form">
      <div className="game-form-item gap-3">
        <h3> Filters </h3>
        <InputText
          placeholder="Name"
          className="p-inputtext-sm"
          {...register('name')}
        />
        <InputText
          placeholder="Developer"
          className="p-inputtext-sm"
          {...register('developers')}
        />
        <InputText
          placeholder="Publisher"
          className="p-inputtext-sm"
          {...register('publishers')}
        />
        <InputText
          placeholder="Released Year"
          className="p-inputtext-sm"
          {...register('release_year')}
        />
        <InputText
          placeholder="Played Year"
          className="p-inputtext-sm"
          {...register('played_year')}
        />
        <InputText
          placeholder="Genre"
          className="p-inputtext-sm"
          {...register('genres')}
        />
        <InputText
          placeholder="Tag"
          className="p-inputtext-sm"
          {...register('tags')}
        />
        <Controller
          name="platform"
          control={control}
          render={({ field, fieldState }) => (
            <Dropdown
              id={field.name}
              placeholder="Platform"
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              options={platforms}
              optionLabel="name"
            />
          )}
        />
        <Controller
          name="completion"
          control={control}
          render={({ field, fieldState }) => (
            <Dropdown
              id={field.name}
              placeholder="Completion"
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              options={completions}
              optionLabel="name"
            />
          )}
        />
        <InputText
          placeholder="Score"
          className="p-inputtext-sm"
          {...register('score')}
        />
        <InputText
          placeholder="Played Hours (min)"
          className="p-inputtext-sm"
          {...register('played_hours_min')}
        />
        <InputText
          placeholder="Played Hours (max)"
          className="p-inputtext-sm"
          {...register('played_hours_max')}
        />
      </div>
      <div className="flex flex-row-reverse">
        <Button type="submit" className="pink-button" label="Filter" />
      </div>
    </form>
  )
}

export default FilterForm
