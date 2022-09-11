import { Input, Space, Typography } from "@douyinfe/semi-ui";
import { Copy, Correct } from "@icon-park/react";
import { useState } from "react";
import useClipboard from "use-clipboard-hook";

export const CopyableInput = (props: { content: string | number, width?: string }) => {
	const [copiedOk, setCopiedOk] = useState(false);
	const { copy } = useClipboard({
		onSuccess: (_) => {
			setCopiedOk(true);
			setTimeout(() => {
				setCopiedOk(false);
			}, 2000);
		},
	});
	// @ts-ignore
	const onClicked = (content: string | number) => {
		copy(content.toString());
	};

	return (
		<Space spacing={"tight"}
			style={{ width: "100%" }}
		>
			<Input
				style={{ paddingLeft: "0", width: `${props.width ? props.width : '300px'}` }}
				contentEditable={false}
				value={props.content}
			/>
			<Typography.Text
				link
				onClick={() => {
					onClicked(props.content);
				}}
				icon={
					copiedOk ? (
						<Space>
							<Correct theme="filled" fill="#50e3c2" />
							<Typography.Text>Copied</Typography.Text>
						</Space>
					) : (
						<Copy theme="filled" />
					)
				}
			></Typography.Text>
		</Space>
	);
};
