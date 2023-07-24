interface DateBased {
	date: Date;
}

interface DateStrBased {
	date: string;
}

export const convertDateToStr = (obj: DateBased): DateStrBased => ({ ...obj, date: obj.date.toISOString() });
