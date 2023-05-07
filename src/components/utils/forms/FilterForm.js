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
    <form onSubmit={handleSubmit(onSubmit)} className="filters-container">
      <div className="filter-in">
        <h3> Filter In </h3>
        <InputText
          placeholder="Name"
          className="p-inputtext-sm"
          {...register('name')}
        />
        <InputText
          placeholder="Developer"
          className="p-inputtext-sm"
          {...register('developer')}
        />
        <InputText
          placeholder="Publisher"
          className="p-inputtext-sm"
          {...register('publisher')}
        />
        <InputText
          placeholder="Year"
          className="p-inputtext-sm"
          {...register('year')}
        />
        <InputText
          placeholder="Played Year"
          className="p-inputtext-sm"
          {...register('played_year')}
        />

        <InputText
          placeholder="Genre"
          className="p-inputtext-sm"
          {...register('genre')}
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
          {...register('played_hoursMin')}
        />
        <InputText
          placeholder="Played Hours (max)"
          className="p-inputtext-sm"
          {...register('played_hoursMax')}
        />
      </div>
      <div className="filter-out">
        <h3> Filter Out </h3>
        <InputText
          placeholder="Name"
          className="p-inputtext-sm"
          {...register('nameOut')}
        />
        <InputText
          placeholder="Developer"
          className="p-inputtext-sm"
          {...register('developerOut')}
        />
        <InputText
          placeholder="Publisher"
          className="p-inputtext-sm"
          {...register('publisherOut')}
        />
        <InputText
          placeholder="Year"
          className="p-inputtext-sm"
          {...register('yearOut')}
        />
        <InputText
          placeholder="Played Year"
          className="p-inputtext-sm"
          {...register('played_yearOut')}
        />
        <InputText
          placeholder="Genre"
          className="p-inputtext-sm"
          {...register('genreOut')}
        />
        <Controller
          name="platformOut"
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
          name="completionOut"
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
          {...register('scoreOut')}
        />
      </div>
      <div className="mt-2 flex flex-row-reverse">
        <Button type="submit" className="filter-button pink-button" label="Filter" />
      </div>
    </form>
  )
}

export default FilterForm
