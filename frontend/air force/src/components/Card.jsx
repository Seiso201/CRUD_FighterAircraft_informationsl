import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({data}) {
  const domain = "http://localhost:3000";

    return(
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={domain+data.image}
        title={data.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <div>
            <p><strong>Country:</strong> {data.country}</p>
            <p><strong>Role:</strong> {data.role}</p>
            <p><strong>Max-Speed:</strong> {data.max_speed}</p>
            <p><strong>Year:</strong> {data.year}</p>
            <p><strong>Stealth:</strong> {data.stealth}</p>
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='outlined'>Edit</Button>
        <Button size="small" variant='outlined'>Learn More</Button>
      </CardActions>
    </Card>
    );
}
