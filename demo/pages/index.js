import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<main className={inter.className}>
			<h1>H1 Heading</h1>
			<h2>H2 Heading</h2>
			<h3>H3 Heading</h3>
			<h4>H4 Heading</h4>
			<h5>H5 Heading</h5>
			<h6>H6 Heading</h6>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur, nunc eget
				aliquam ultricies, nunc nunc ultricies
			</p>

			<section className="has-red-background-color has-global-padding">
				Red BG with global padding
			</section>

			<section className="has-vivid-red-background-color has-light-green-cyan-color">
				Red BG with global padding
			</section>

			<table>
				<thead>
					<tr>
						<th>Table Heading</th>
						<th>Table Heading</th>
						<th>Table Heading</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Table Cell</td>
						<td>Table Cell</td>
						<td>Table Cell</td>
					</tr>
					<tr>
						<td>Table Cell</td>
						<td>Table Cell</td>
						<td>Table Cell</td>
					</tr>
					<tr>
						<td>Table Cell</td>
						<td>Table Cell</td>
						<td>Table Cell</td>
					</tr>
				</tbody>
			</table>
		</main>
	)
}
