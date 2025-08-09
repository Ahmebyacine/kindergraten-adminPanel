import { TableCell, TableRow } from "./ui/table";

export default function LoadingRow() {
  return (
    <TableRow>
      <TableCell>
        <div className="bg-muted animate-pulse rounded h-4 w-8" />
      </TableCell>
      <TableCell>
        <div className="bg-muted animate-pulse rounded h-4 w-32" />
      </TableCell>
      <TableCell>
        <div className="bg-muted animate-pulse rounded h-4 w-48" />
      </TableCell>
      <TableCell>
        <div className="bg-muted animate-pulse rounded h-4 w-20" />
      </TableCell>
      <TableCell>
        <div className="bg-muted animate-pulse rounded h-4 w-16" />
      </TableCell>
    </TableRow>
  );
}
