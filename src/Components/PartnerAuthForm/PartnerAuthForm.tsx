import React from 'react';
import { Formik, FormikProps } from "formik";
import * as Yup from 'yup';

import { withStyles } from '@material-ui/styles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

interface IPartnerAuthFormPureProps {
    active?: boolean;
    classes: {
        fieldRow: string;
        container: string;
        hidden: string;
    }
}

interface IFieldProps {
    id: string;
    label: string;
    multiline?: boolean;
    rows?: number;
    select?: boolean;
    children?: React.ReactNode;
    required?: boolean;
}

interface IPartnerAuthFormValues {
    orgName: string;
    site: string;
    promoType: string;
    dealType: string;
    deal: string;
    city: string;
    fullname: string;
    phone: string;
    email: string;
    msg:string;
}

const styles = {
    container: {
        marginTop: 0
    },
    fieldRow: {
        width: '100%'
    },
    hidden: {
        display: 'none'
    }
};

Yup.setLocale({
    mixed: {
        required: 'Обязательно к заполнению',
        notType: 'Указано не правильное значение'
    },
    string: {
        required: 'Обязательно к заполнению',
        default: 'Должна быть строка',
        email: 'Почта заполнена не правильно',
        url: 'Адрес сайта заполнен не парвильно'
    },
    number: {
        required: 'Обязательно к заполнению',
        default: 'Должны быть числа'
    }
});

const validationSchema = Yup.object({
    orgName: Yup
        .string()
        .required("Название компании обязательно"),
    site: Yup
        .string()
        .url(),
    promoType: Yup
        .string(),
    dealType: Yup
        .string(),
    deal: Yup
        .string(),
    city: Yup
        .string()
        .required(),
    fullname: Yup
        .string()
        .required(),
    phone: Yup
        .number()
        .required(),
    email: Yup
        .string()
        .email()
        .required(),
    msg: Yup
        .string(),
});

const deals = [
    'Отели',
    'Туры',
    'Магазины',
    'Рестораны и кафе',
    'Красота',
    'Здоровье',
    'Развлечения',
    'Концерты',
    'Фитнес',
    'Обучение',
    'Авто',
    'Другое'
];

class PartnerAuthFormPure extends React.PureComponent<IPartnerAuthFormPureProps> {
    constructor(props: IPartnerAuthFormPureProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        alert('submited');
    }

    render() {
        const { active, classes } = this.props;

        return (
            <div className={ active ? '' : classes.hidden }>
                <Formik
                    onSubmit={this.handleSubmit}
                    validationSchema={validationSchema}
                    initialValues={{
                        orgName: '',
                        site: '',
                        promoType: '',
                        dealType: '',
                        deal: '',
                        city: '',
                        fullname: '',
                        phone: '',
                        email: '',
                        msg: ''
                    }}
                    render={(props: FormikProps<IPartnerAuthFormValues>) => {
                        const { handleChange, setFieldTouched, isValid } = props;
                        const change = (name: any, e: any) => {
                            e.persist();
                            handleChange(e);
                            setFieldTouched(name, true, false);
                        };
                        const renderTextField = this.renderTextField.bind(this, props, change);

                        return (
                            <form onSubmit={() => { }}>
                                <Grid
                                    container
                                    spacing={6}
                                    justify="space-around"
                                    classes={{container: classes.container}}
                                >
                                    {renderTextField({
                                        id: "orgName",
                                        label: "Название компании",
                                        required: true
                                    })}
                                    {renderTextField({
                                        id: "site",
                                        label: "Сайт компании"
                                    })}
                                    {renderTextField({
                                        id: "promoType",
                                        label: "Я хочу продвигать через сайт Биглион",
                                        select: true,
                                        children: ['Услуга', 'Товар'].map(name => (
                                            <MenuItem value={name} key={name}>
                                                {name}
                                            </MenuItem>
                                        ))
                                    })}
                                    {renderTextField({
                                        id: "dealType",
                                        label: "Вид услуги",
                                        select: true,
                                        children: deals.map(name => (
                                            <MenuItem value={name} key={name}>
                                                {name}
                                            </MenuItem>
                                        ))

                                    })}
                                    {renderTextField({
                                        id: "deal",
                                        label: "Товар или услуга для размещения"
                                    })}
                                    {renderTextField({
                                        id: "city",
                                        label: "Город, где будет предлагаться услуга/товар",
                                        required: true
                                    })}
                                    {renderTextField({
                                        id: "fullname",
                                        label: "Имя и фамилия",
                                        required: true
                                    })}
                                    {renderTextField({
                                        id: "phone",
                                        label: "Телефон",
                                        required: true
                                    })}
                                    {renderTextField({
                                        id: "email",
                                        label: "Email",
                                        required: true
                                    })}
                                    {renderTextField({
                                        id: "msg",
                                        label: "Комментарий",
                                        multiline: true,
                                        rows: 4
                                    })}
                                    <Grid item className={classes.fieldRow}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            disabled={!isValid}
                                        >
                                            Отправить
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        );
                    }}
                />
            </div>
        );

    }

    renderTextField(formikProps: FormikProps<IPartnerAuthFormValues>, onChange: (name: string, e: any) => void, fieldProps: IFieldProps) {
        const { classes } = this.props;
        const { id } = fieldProps;
        const { values, errors, touched } = formikProps;

        return (
            <Grid item className={classes.fieldRow}>
                <TextField
                    {...fieldProps}
                    name={fieldProps.id}
                    helperText={touched[id] ? errors[id] : ""}
                    error={touched[id] && Boolean(errors[id])}
                    value={values[id]}
                    onChange={onChange.bind(null, id)}
                    fullWidth
                    variant="outlined"
                >
                    {fieldProps.children}
                </TextField>
            </Grid>
        );
    }
}

const PartnerAuthForm = withStyles(styles)(PartnerAuthFormPure);

export { PartnerAuthForm };