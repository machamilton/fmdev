import { connect } from 'react-redux';
import React, { Component } from 'react';
import { actions as toastrActions } from 'react-redux-toastr';
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { PickList } from 'primereact/picklist';
import BreadCrumb from '../BreadCrumb';
import Button from '../../styles/Button';
import { ConfigContainer } from '../../styles/ConfigContainer';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { Creators as CourseActions } from '../../store/ducks/course';
import { Creators as SubjectActions } from '../../store/ducks/subject';
import { Creators as SemesterActions } from '../../store/ducks/semester';
import { Creators as IndicatorActions } from '../../store/ducks/indicator';
import { Creators as PreProcessingActions } from '../../store/ducks/pre_processing';
import {
  Header, Separator, Content, LeftContent,
  RightContainer, SelectText, SelectContainer,
} from './styles';
import {
  DATASOURCE, PRE_PROCESSING, ADD_TRAIN,
} from '../../constants';
import { selectStyle } from '../../styles/global';

class Indicators extends Component {
  componentDidMount() {
    this.props.indicatorInitFilter();
  }

  getDataSourceContext = () => (this.props.indicator.datasource ? this.props.indicator.datasource.split('/')[0] : null);

  getDataSourceId = () => (this.props.indicator.datasource ? this.props.indicator.datasource.split('/')[1] : null);

  getPickListTemplate = (item) => (
    <div className="p-clearfix">
      <div style={{ fontSize: '14px', textAlign: 'right', margin: '15px 5px 0 0' }}>{item.label}</div>
    </div>
  )

  handleChange = (item, name) => {
    this.props.setIndicator(name, item);
    this.refreshFilters(name, item);
  };

  refreshFilters = (name, items) => {
    if (name === 'courseSelected') {
      if (!items || !items.length) {
        this.props.subjectSuccess([]);
        this.props.semesterSuccess([]);
        return;
      }

      this.props.getSubjects({ courses: items.map((item) => item.value) });
    }

    if (name === 'subjectSelected') {
      if (!items || !items.length) {
        this.props.semesterSuccess([]);
        return;
      }

      this.props.getSemesters({ subjects: items.map((item) => item.value) });
    }
  };

  onPickListChange = (event) => {
    this.props.setIndicator('source', event.source);
    this.props.setIndicator('indicators', event.target);
  }

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg,
    });
  }

  onSubmit = () => {
    const filter = {};
    const { setScreen } = this.props;
    const {
      indicators, targetSelected, courseSelected, subjectSelected, semesterSelected,
    } = this.props.indicator;

    if (!targetSelected || !targetSelected.value) {
      this.renderWarningMsg('Selecione um indicador alvo');
      return;
    }

    if (!indicators || !indicators.length || indicators.length <= 1) {
      this.renderWarningMsg('Selecione ao menos dois indicadores');
      return;
    }

    if (!indicators.filter((indicator) => indicator.value === targetSelected.value).length) {
      this.renderWarningMsg(`É necessário selecionar o indicador ${targetSelected.value}, pois o mesmo é um indicador alvo`);
      return;
    }

    filter.context = this.getDataSourceContext();
    filter.id = this.getDataSourceId();
    filter.target = targetSelected.value;
    filter.courses = this.getValueFromSelect(courseSelected);
    filter.subjects = this.getValueFromSelect(subjectSelected);
    filter.semesters = this.getValueFromSelect(semesterSelected);
    filter.indicators = this.getValueFromSelect(indicators);

    this.props.getPreProcessing(filter);
    setScreen(ADD_TRAIN, PRE_PROCESSING);
  }

  getValueFromSelect = (items) => {
    if (!items) {
      return null;
    }

    return items.map((item) => item.value);
  }

  render() {
    const {
      /* course, subject, semester,  */indicator,
    } = this.props;
    const {
      source, indicators, targetSelected, /* , courseSelected,
      subjectSelected, semesterSelected, */
    } = this.props.indicator;
    // const dataSourceContext = this.getDataSourceContext();

    return (
      <ConfigContainer size="big">
        <PerfectScrollbar style={{ width: '100%' }}>
          <div style={{ width: '35%' }}>
            <BreadCrumb text="Voltar para Escolha de Fontes de dados" screen={ADD_TRAIN} destiny={DATASOURCE} />
          </div>
          <Header>
            <h1>Selecione os indicadores</h1>
            <div>
              <Button onClick={this.onSubmit.bind(this)}>PRÉ-PROCESSAR BASE</Button>
            </div>
          </Header>

          <Content>
            <LeftContent>
              <SelectText>Indicador Alvo</SelectText>
              <SelectContainer>
                <Select
                  isClearable
                  value={targetSelected}
                  noOptionsMessage={() => 'Sem dados'}
                  onChange={(e) => this.handleChange(e, 'targetSelected')}
                  placeholder="Selecione um indicador alvo"
                  styles={selectStyle}
                  options={indicator.data.asMutable()}
                />
              </SelectContainer>
            </LeftContent>

            <Separator>&nbsp;</Separator>

            <RightContainer>
              <PickList
                metaKeySelection={false}
                responsive
                showSourceControls={false}
                showTargetControls={false}
                sourceHeader="Disponíveis"
                targetHeader="Selecionados"
                source={source}
                target={indicators}
                onChange={this.onPickListChange.bind(this)}
                itemTemplate={this.getPickListTemplate.bind(this)}
                sourceStyle={{ height: '40vh', width: '28vw' }}
                targetStyle={{ height: '40vh', width: '28vw' }}
              />
            </RightContainer>

          </Content>
        </PerfectScrollbar>
      </ConfigContainer>
    );
  }
}

const mapStateToProps = ({
  course, subject, semester, indicator,
}) => ({
  course, subject, semester, indicator,
});

export default connect(
  mapStateToProps,
  {
    ...ScreenActions,
    ...CourseActions,
    ...SubjectActions,
    ...SemesterActions,
    ...IndicatorActions,
    ...toastrActions,
    ...PreProcessingActions,
  },
)(Indicators);
