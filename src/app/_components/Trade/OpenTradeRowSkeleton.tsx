import { TableCell, TableRow } from "@/components/ui/table";

const OpenTradeRowSkeleton: React.FC = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="h-5 w-14 animate-pulse bg-gray-300"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-10 animate-pulse bg-gray-300"></div>
      </TableCell>

      <TableCell>
        <div className="h-5 w-20 animate-pulse bg-gray-300"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-20 animate-pulse bg-gray-300"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-20 animate-pulse bg-gray-300"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-10 animate-pulse bg-gray-300"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-10 animate-pulse bg-gray-300"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-10 animate-pulse bg-gray-300"></div>
      </TableCell>

      <TableCell>
        <div className="flex space-x-2">
          <div className="h-5 w-5 animate-pulse bg-gray-300"></div>
          <div className="h-5 w-5 animate-pulse bg-gray-300"></div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OpenTradeRowSkeleton;
