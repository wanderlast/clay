/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import React from 'react';

type Props = {
	/**
	 * Group content.
	 */
	children?: React.ReactNode;

	/**
	 * Value provided is a display component that is a header for the items in the group.
	 */
	header?: string;
};

const ClayDropDownGroup = ({children, header}: Props) => {
	return (
		<>
			{header && (
				<li className="dropdown-subheader" role="presentation">
					{header}
				</li>
			)}

			{children}
		</>
	);
};

export default ClayDropDownGroup;
