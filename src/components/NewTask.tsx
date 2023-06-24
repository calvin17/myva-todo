import { Button, Grid, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { FormInputText } from './form-components/FormInputText';
// import { FormInputMultiCheckbox } from './form-components/FormInputMultiCheckbox';
import { FormInputDropdown } from './form-components/FormInputDropdown';
import { FormInputSlider } from './form-components/FormInputSlider';

import { FormInputRadio } from './form-components/FormInputRadio';

interface IFormInput {
  title: string;
  description: string;
  category: string;
  status: string;
  priority: number;
}

const defaultValues = {
  title: '',
  description: '',
  category: 'HOME',
  status: 'BACKLOG',
  priority: 0,
};

const categoryOptions = [
  {
    label: 'Home',
    value: 'HOME',
  },
  {
    label: 'Work',
    value: 'WORK',
  },
  {
    label: 'Learning',
    value: 'LEARNING',
  },
  {
    label: 'Kid',
    value: 'KID',
  },
  {
    label: 'Others',
    value: 'OTHERS',
  },
];

const statusOptions = [
  {
    label: 'Backlog',
    value: 'BACKLOG',
  },
  {
    label: 'To do',
    value: 'TO_DO',
  },
  {
    label: 'Backlog',
    value: 'BACKLOG',
  },
  {
    label: 'In Progress',
    value: 'IN_PROGRESS',
  },
  {
    label: 'In Review',
    value: 'IN_REVIEW',
  },
  {
    label: 'Done',
    value: 'DONE',
  },
];

const StyledFormInputText = styled(FormInputText)`
  display: block;
  margin: 20px;
`;

export const NewTask = () => {
  const { handleSubmit, reset, control, setValue } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });

  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <Paper style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Create New Task</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormInputText name="title" control={control} label="Title" rows={1} />
          <FormInputText name="description" rows={4} control={control} label="Description" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormInputRadio name={'category'} control={control} label={'Category'} options={categoryOptions} />
          <FormInputDropdown name="status" control={control} label="Status" options={statusOptions} />
          {/* <FormInputMultiCheckbox control={control} setValue={setValue} name={'category'} label={'Category'} /> */}
          <FormInputSlider name={'priority'} control={control} setValue={setValue} label={'Priority'} />
        </Grid>
        <Grid item xs={12} container direction="column" alignItems="flex-end">
          <div>
            <Button onClick={handleSubmit(onSubmit)} variant={'contained'} sx={{ marginRight: '20px' }}>
              Create
            </Button>
            <Button onClick={() => reset()} variant={'outlined'}>
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NewTask;
