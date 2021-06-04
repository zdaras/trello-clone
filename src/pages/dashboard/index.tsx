import React from 'react';
import { useTranslation } from 'react-i18next';

import { Flex } from '@/styled/flex';
import { RouteWrapperStyled } from '@/styled/shared';
import Helmet from '@/components/shared/helmet';

export const Dashboard = () => {
	const { t } = useTranslation();

	return (
		<>
			<Helmet title={t('Dashboard')} />

			<RouteWrapperStyled>
				<Flex center direction="column">
					dashboard
				</Flex>
			</RouteWrapperStyled>
		</>
	);
};

export default Dashboard;
