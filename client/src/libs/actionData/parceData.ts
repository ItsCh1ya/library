export function getById(data: Array<any>, id: number) {
  return data.filter((element: any) => element.id === id);
}
