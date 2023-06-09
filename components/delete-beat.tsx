import { Grid, Row, Text, Button } from "@nextui-org/react"

interface DeleteBeatProps {
  deleteFn: () => void
}
export const DeleteBeat = ({ deleteFn }: DeleteBeatProps) => {
  return (
    <Grid.Container
      css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <Row justify="center" align="center">
        <Text b>Confirm</Text>
      </Row>
      <Row>
        <Text>
          Are you sure you want to delete this beat?
        </Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center">
        <Grid>
          <Button size="sm" onPress={() => deleteFn()}> 
            Yes
          </Button>
        </Grid>
        <Grid>
          <Button size="sm" light>
            Cancel
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  )
}