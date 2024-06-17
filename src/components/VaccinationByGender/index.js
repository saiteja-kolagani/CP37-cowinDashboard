// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {details} = props
  return (
    <ResponsiveContainer width={1000} height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={details}
          startAngle={0}
          endAngle={180}
          dataKey="count"
          innerRadius="40%"
          outerRadius="70%"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByGender
