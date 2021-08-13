export const updateObject = (oldObj,UpdProp) =>{
	return {
		...oldObj,
		...UpdProp,
	};
} 