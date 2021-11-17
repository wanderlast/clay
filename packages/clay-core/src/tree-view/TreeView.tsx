/**
 * SPDX-FileCopyrightText: © 2021 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {FocusScope} from '@clayui/shared';
import classNames from 'classnames';
import React, {useRef} from 'react';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {ChildrenFunction, Collection, ICollectionProps} from './Collection';
import DragLayer from './DragLayer';
import {TreeViewGroup} from './TreeViewGroup';
import {TreeViewItem, TreeViewItemStack} from './TreeViewItem';
import {Icons, TreeViewContext} from './context';
import {ITreeProps, useTree} from './useTree';

interface ITreeViewProps<T>
	extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'>,
		ITreeProps<T>,
		ICollectionProps<T> {
	displayType?: 'light' | 'dark';
	dragAndDrop?: boolean;
	expanderIcons?: Icons;
	onLoadMore?: (item: T) => Promise<unknown>;
	onRenameItem?: (item: T) => Promise<T>;
	rootRef?: React.RefObject<HTMLUListElement>;
	selectionMode?: 'multiple' | 'single';
	showExpanderOnHover?: boolean;
}

export function TreeView<T>(props: ITreeViewProps<T>): JSX.Element & {
	Item: typeof TreeViewItem;
	Group: typeof TreeViewGroup;
	ItemStack: typeof TreeViewItemStack;
};

export function TreeView<T>({
	children,
	className,
	displayType = 'light',
	dragAndDrop = false,
	expandedKeys,
	expanderIcons,
	items,
	nestedKey,
	onExpandedChange,
	onItemsChange,
	onLoadMore,
	onRenameItem,
	onSelectionChange,
	selectedKeys,
	selectionMode = 'multiple',
	showExpanderOnHover = true,
	...otherProps
}: ITreeViewProps<T>) {
	const rootRef = React.useRef(null);

	const state = useTree<T>({
		expandedKeys,
		items,
		nestedKey,
		onExpandedChange,
		onItemsChange,
		onSelectionChange,
		selectedKeys,
		selectionMode,
	});

	const childrenRootRef = useRef(
		typeof children === 'function'
			? (children as ChildrenFunction<Object>)
			: null
	);

	const context = {
		childrenRoot: childrenRootRef,
		dragAndDrop,
		expanderIcons,
		nestedKey,
		onLoadMore,
		onRenameItem,
		rootRef,
		showExpanderOnHover,
		...state,
	};

	return (
		<FocusScope>
			<ul
				{...otherProps}
				className={classNames('treeview', className, {
					[`treeview-${displayType}`]: displayType,
					'show-component-expander-on-hover': showExpanderOnHover,
				})}
				ref={rootRef}
				role="tree"
			>
				<DndProvider backend={HTML5Backend}>
					<TreeViewContext.Provider value={context}>
						<Collection<T> items={state.items}>
							{children}
						</Collection>
						<DragLayer />
					</TreeViewContext.Provider>
				</DndProvider>
			</ul>
		</FocusScope>
	);
}

TreeView.Group = TreeViewGroup;
TreeView.Item = TreeViewItem;
TreeView.ItemStack = TreeViewItemStack;