import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormContext, useForm } from 'react-hook-form';

import { Link } from '@components/library/link';
import { Flex, FlexItem } from '@/styled/flex';
import { FormInput, ErrorText } from '@/components/form';
import Button from '@components/library/button';
import { BlockStyled, H5, H1 } from '@/styled/shared';
import Tooltip from '@components/library/tooltip';
import Helmet from '@/components/shared/helmet';
import { required, isEmail, isValidPassword } from '@/utils/validator';
import { userActions } from '@/store/ducks/user';
import useActions from '@/hooks/useActions';
import useFormError from '@/hooks/useFormError';
import { IRegisterParams } from '@/services/api/user/types';

import EmailConfirmation from './email-confirmation';

export const Register = () => {
	const { t } = useTranslation();
	const [hideConfirmation, setHideConfirmation] = useState(true);
	const [userId, setUserId] = useState('');
	const { formError, setFormError } = useFormError();
	const methods = useForm<IRegisterParams>({ defaultValues: { subscribe: false } });
	const register = useActions(userActions.register);
	const passwordValue = methods.watch('password');

	const onSubmit = async (values: IRegisterParams) => {
		try {
			setFormError();
			const params = {
				username: values.username,
				password: values.password,
				firstName: values.firstName,
				lastName: values.lastName,
				subscribe: values.subscribe
			};
			const res = await register(params);
			// @ts-ignore
			setUserId(res);
			setHideConfirmation(false);
		} catch (error) {
			setFormError(error);
			setUserId('');
			setHideConfirmation(true);
		}
	};

	return (
		<>
			<Helmet title={t('Register')} />

			<Flex center full>
				{hideConfirmation && (
					<FlexItem flex="0 1 600px">
						<FormContext {...methods}>
							<form onSubmit={methods.handleSubmit(onSubmit)}>
								<BlockStyled formPadding>
									<H1 weight="600" align="center" margin="0 0 50px">
										{t('Registration')}
									</H1>

									<FormInput name="firstName" autoFocus label={t('First Name')} validate={required} />

									<FormInput name="lastName" label={t('Last Name')} validate={required} />

									<FormInput name="username" label={t('E-mail Address')} validate={isEmail} />

									<FormInput
										type="password"
										name="password"
										label={t('Password')}
										validate={isValidPassword}
										AbsoluteComp={
											<Tooltip
												text={t(
													'Password must be at least 8 characters, with at least one lowercase, one uppercase, one number and one symbol.'
												)}
											/>
										}
									/>

									<FormInput
										type="password"
										name="confirmPassword"
										label={t('Confirm Password')}
										validate={value => (value !== passwordValue ? 'Does not match' : undefined)}
									/>
									<FormInput type="checkbox" name="subscribe" label={t('Receive E-mail updates and news from us')} />

									<Button type="submit" text={t('Sign Up')} loading={methods.formState.isSubmitting} />

									<ErrorText text={formError.errorDescription} center margin="14px 0 0" />

									<Flex center>
										<H5 align="center" padding="4px 0 0">
											{t('Already have an account?')}
										</H5>
										<Link to="/login">
											<Button text={t('Log In')} buttonType="text" padding="10px" />
										</Link>
									</Flex>
								</BlockStyled>
							</form>
						</FormContext>
					</FlexItem>
				)}

				<EmailConfirmation hideConfirmation={hideConfirmation} userId={userId} />
			</Flex>
		</>
	);
};

export default Register;
