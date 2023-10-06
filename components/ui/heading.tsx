interface HeadingProps {
	title: string;
	description: string;
}

export const Heading: React.FC<HeadingProps> = ({
	title,
	description
}) => {
	return ( 
		<div className="flex items-center justify-between">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
				<p className="text-sm font-medium text-gray-500">{description}</p>
			</div>
		</div>
	 );
}