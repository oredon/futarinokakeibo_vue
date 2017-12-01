/*
	AJAX URLをproductionと開発で別に定義
 */
let ajaxUrl = {}
if(process.env.NODE_ENV === 'production'){
	ajaxUrl = {
		monthly: "/kakeibo/forms/monthly",
		edit   : "/kakeibo/forms/edit",
		delete : "/kakeibo/forms/delete",
		yearly : "/kakeibo/forms/yearly",
		formTitleList: "/kakeibo/package/static/form_title_list.json"
	}
}else{
	ajaxUrl = {
		monthly: "/stub/monthly.json",
		edit   : "/stub/edit.json",
		delete : "/stub/delete.json",
		yearly : "/stub/yearly.json",
		formTitleList: "/static/form_title_list.json"
	}
}
export default ajaxUrl;
