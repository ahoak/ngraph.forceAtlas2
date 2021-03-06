import { Node, NodeStore } from '../marshaling'
import { FA2Configuration } from '../../configuration'

export function computeGravity(nodes: NodeStore, config: FA2Configuration) {
	const g = config.gravity / config.scalingRatio
	const coefficient = config.scalingRatio
	let node: Node
	let distance: number
	let factor: number

	for (let i = 0; i < nodes.nodeCount; ++i) {
		node = nodes.getNode(i)
		distance = Math.sqrt(node.x ** 2 + node.y ** 2)

		let factor = 0
		if (config.strongGravityMode) {
			// strong gravity
			if (distance > 0) {
				factor = coefficient * node.mass * g
			}
		} else {
			// linear anti-collision repulsion
			if (distance > 0) {
				factor = (coefficient * node.mass * g) / distance
			}
		}

		// Updating node's dx and dy
		node.dx -= node.x * factor
		node.dy -= node.y * factor
	}
}
