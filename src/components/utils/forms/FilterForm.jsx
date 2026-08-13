import { useForm, Controller } from "react-hook-form";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { usePlatforms } from "../../../hooks/usePlatforms";
import { useCompletions } from "../../../hooks/useCompletions";
import { classNames } from "primereact/utils";
import BaseButton from "../BaseButton";

const inputClassNames =
  "focus:border focus:border-cyan-400 focus:outline-cyan-600 bg-gray-100!";

const FilterForm = ({ onSubmit }) => {
  const { register, handleSubmit, control } = useForm();
  const { platforms } = usePlatforms();
  const { completions } = useCompletions();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <h3 className="font-extrabold text-2xl"> Filters </h3>
        <InputText
          placeholder="Name"
          className={classNames(inputClassNames, "border")}
          {...register("name")}
        />
        <InputText
          placeholder="Developer"
          className={classNames(inputClassNames)}
          {...register("developers")}
        />
        <InputText
          placeholder="Publisher"
          className={classNames(inputClassNames)}
          {...register("publishers")}
        />
        <InputText
          placeholder="Released Year"
          className={classNames(inputClassNames)}
          {...register("release_year")}
        />
        <InputText
          placeholder="Played Year"
          className={classNames(inputClassNames)}
          {...register("played_year")}
        />
        <InputText
          placeholder="Genre"
          className={classNames(inputClassNames)}
          {...register("genres")}
        />
        <InputText
          placeholder="Tag"
          className={classNames(inputClassNames)}
          {...register("tags")}
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
              className="flex justify-between pr-4 bg-gray-100!"
              pt={{
                list: "max-h-[200px] flex flex-col gap-3 overflow-y-auto",
              }}
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
              className="flex justify-between pr-4 bg-gray-100!"
              pt={{
                list: "max-h-[200px] flex flex-col gap-3 overflow-y-auto",
              }}
            />
          )}
        />
        <InputText
          placeholder="Score"
          className={classNames(inputClassNames)}
          {...register("score")}
        />
        <InputText
          placeholder="Played Hours (min)"
          className={classNames(inputClassNames)}
          {...register("played_hours_min")}
        />
        <InputText
          placeholder="Played Hours (max)"
          className={classNames(inputClassNames)}
          {...register("played_hours_max")}
        />
      </div>
      <div className="flex flex-row-reverse mt-3">
        <BaseButton type="submit" label="Filter" />
      </div>
    </form>
  );
};

export default FilterForm;
