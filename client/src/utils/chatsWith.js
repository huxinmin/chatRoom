const setChatsWith = (itemName)=>{
	localforage.setItem(itemName,[]);
}


export {setChatsWith}
