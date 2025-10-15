import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination'

export default function PaginationComponent({ 
  currentPage, 
  totalNumberOfPages, 
  totalNumberOfItems, 
  handleClick, 
}) {
  return(
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={ () => { handleClick(currentPage - 1)} } />
          </PaginationItem>
        )}

        {Array.from({ length: totalNumberOfPages }).map((_, idx) => {
          const page = idx + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={ () => { handleClick(page) } }
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        {currentPage + 1 <= totalNumberOfPages && (
          <PaginationItem>
            <PaginationNext onClick = { () => { handleClick(currentPage + 1) } } />
          </PaginationItem>
        )}

      </PaginationContent>
    </Pagination>
  );
}