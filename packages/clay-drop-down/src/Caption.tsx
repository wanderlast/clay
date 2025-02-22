/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import classnames from 'classnames';
import React from 'react';

const ClayDropDownCaption = ({
	children,
	className,
	...otherProps
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			{...otherProps}
			className={classnames('dropdown-caption', className)}
		>
			{children}
		</div>
	);
};

export default ClayDropDownCaption;
