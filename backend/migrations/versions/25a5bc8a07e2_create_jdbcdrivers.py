"""create_jdbcdrivers

Revision ID: 25a5bc8a07e2
Revises: f95a82ccd2e0
Create Date: 2023-07-02 19:24:41.195631

"""
from alembic import op
import sqlalchemy as sa
import datetime

# revision identifiers, used by Alembic.
revision = '25a5bc8a07e2'
down_revision = 'f95a82ccd2e0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    jdbc_drivers_table = op.create_table('jdbc_drivers',
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('driverclass', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.bulk_insert(
        jdbc_drivers_table,
        [
            {
                "name": "PostgreSQL",
                "driverclass": "org.postgresql.Driver",
                "created_at": datetime.datetime.now()
            },
            {
                "name": "MySQL",
                "driverclass": "com.mysql.jdbc.Driver",
                "created_at": datetime.datetime.now()
            },
            {
                "name": "Oracle",
                "driverclass": "oracle.jdbc.driver.OracleDriver",
                "created_at": datetime.datetime.now()
            }
        ],
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('jdbc_drivers')
    # ### end Alembic commands ###
