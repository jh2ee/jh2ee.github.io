---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666P52FSAH%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCN5xRtaNuLS9sTW650a6987b9Mu23KfjWBEwxg2SaCzgIgFrwSlHJxLw3K1veYr%2FcnqYia2r4ubvgP1hh2ZDn6vgEq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDErGvZmB5DByWzYqmyrcAyN02aAcGXSOFEUSs%2Fizu%2Fa8gd3BCoScC55SHb9ZwagG7cOkfhAkeKW3lu%2BUdzYPEGEn9t1VSmi7Psn9HeRSTTLzurhI5mTnaKYet%2FXSo71EGYF0d%2B3Kkw%2FteOFSq5cS6EadsrVnYmffXPil0EEMYI8jpmLl6ENi6FfnNl2dli8kaBFcgZtpB4uwtqb%2B%2FNrc%2BXAIWIxQM5r%2Bl4EC9Nsmplm9Iwx1FzGdMSDHOnQN9dFvkmUAxCWld0nLL%2FQqVjtctaCe5%2F7n2qsdLJ6GJN6L30Hrrmb89eUmvLC8wFBtNnCdXuSKB%2BImsoAIOCi39Yco%2BbQuptX%2FQIFezkoi5B9PFXjrBWDcbqlh35y47m8v4XOXCOEZTLX8HGUojpHK%2BXCVFmkkOzMZFKvJ%2FgnR4Js%2Bl3Ix%2FDjNcplT4tn5k9pUNMbKnahAuiIHXc5Y3cKmKMsxH1IFS60Ea%2B%2FHj929D7LzMnQu%2FZpA9tK9MX3ZFBP%2B76InWbc6yValirxOFG6kwMiLDxULku0MC1gzObwk%2BSa0qrXKmshie7fKfQdVioMqGDYojFtjh8BHFcCgRE74FT%2B2xhiC%2BblUuxuE9ZHGRZxXQQzDluqoPt%2FWmwGm2U4wV7FnhXjF%2BttF3IIx1TSlML2Wks8GOqUBBr2DIRfViMRjdMCVW2e%2FU2P91ONo%2FgeP0nog%2FmbUUAiTxL%2BoMfVPp6q1StEVi71%2BeQOx5O7DH3aHL8nkatHJsh48BEw9Q4oZs5kA0KvEJE%2FCI%2FUWrlUgL6PCo0W624JWD4LVBn7zfhtaseNmeKXVLCsiMDONwP6wg9IptoAAwLPovIxVdZ1XIVeIM69ieL1%2F9VBJ5Gfl5YN5giBkxmbNQZK%2F%2Fb1J&X-Amz-Signature=c4f7c0be8578e35385380be63a027af3042f5308b53249e5c01ecf870df30963&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666P52FSAH%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCN5xRtaNuLS9sTW650a6987b9Mu23KfjWBEwxg2SaCzgIgFrwSlHJxLw3K1veYr%2FcnqYia2r4ubvgP1hh2ZDn6vgEq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDErGvZmB5DByWzYqmyrcAyN02aAcGXSOFEUSs%2Fizu%2Fa8gd3BCoScC55SHb9ZwagG7cOkfhAkeKW3lu%2BUdzYPEGEn9t1VSmi7Psn9HeRSTTLzurhI5mTnaKYet%2FXSo71EGYF0d%2B3Kkw%2FteOFSq5cS6EadsrVnYmffXPil0EEMYI8jpmLl6ENi6FfnNl2dli8kaBFcgZtpB4uwtqb%2B%2FNrc%2BXAIWIxQM5r%2Bl4EC9Nsmplm9Iwx1FzGdMSDHOnQN9dFvkmUAxCWld0nLL%2FQqVjtctaCe5%2F7n2qsdLJ6GJN6L30Hrrmb89eUmvLC8wFBtNnCdXuSKB%2BImsoAIOCi39Yco%2BbQuptX%2FQIFezkoi5B9PFXjrBWDcbqlh35y47m8v4XOXCOEZTLX8HGUojpHK%2BXCVFmkkOzMZFKvJ%2FgnR4Js%2Bl3Ix%2FDjNcplT4tn5k9pUNMbKnahAuiIHXc5Y3cKmKMsxH1IFS60Ea%2B%2FHj929D7LzMnQu%2FZpA9tK9MX3ZFBP%2B76InWbc6yValirxOFG6kwMiLDxULku0MC1gzObwk%2BSa0qrXKmshie7fKfQdVioMqGDYojFtjh8BHFcCgRE74FT%2B2xhiC%2BblUuxuE9ZHGRZxXQQzDluqoPt%2FWmwGm2U4wV7FnhXjF%2BttF3IIx1TSlML2Wks8GOqUBBr2DIRfViMRjdMCVW2e%2FU2P91ONo%2FgeP0nog%2FmbUUAiTxL%2BoMfVPp6q1StEVi71%2BeQOx5O7DH3aHL8nkatHJsh48BEw9Q4oZs5kA0KvEJE%2FCI%2FUWrlUgL6PCo0W624JWD4LVBn7zfhtaseNmeKXVLCsiMDONwP6wg9IptoAAwLPovIxVdZ1XIVeIM69ieL1%2F9VBJ5Gfl5YN5giBkxmbNQZK%2F%2Fb1J&X-Amz-Signature=c4f7c0be8578e35385380be63a027af3042f5308b53249e5c01ecf870df30963&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIMPWF2O%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCICWpm0OeZgyueH2f48yv3GoeEshz4s%2Bb%2ByW3ABhz9M6EAiEA366%2B5Djr4e6wY1Gnz9b8aIu4N55wYzSfI6aW5RK9fdcq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDJma9lxhq%2BRTqnVAcyrcAzoqY%2FTetBlm2hFY0TnPqk%2BG%2FBVo4%2FJRRobEdiXgvC%2F9HBJ%2FxY7mgMNxNm0PboLbSrMFKD3zwAtDPb43qnkObo174Gjl2qdPEySH4Ild60aYMVhoN1MX6PkfV%2FKbeKIoj99KnrKaWFGVn1ACWgKf8qHIc7evXdK%2FCv6yDbNMdRUDAcLTVuKbfSeAOAgwMS%2FYNYjfDfXsMpivzIfHB81CFLmAL3L5G5Zj5uFv2g7H3jvq8Fo3kbEWb2eZE2gu6Vg6wIxwA7RdZFZ3TN7EA64hYRdo%2FZzn0TeH7yr0V73tI4bYHX1xW5xvALFclh%2BrdbrNJgairEYeai75eahzNrlN0blfjVg2L4RjZL7xkLIEtgclEgPvzpw%2By6hB373wptGtja8PCCaMY5meZNGEXxRqyBVC5lBcwYKEh2FU%2Bir1gk%2B3afL8Kk8lMu9JbcVHxzJI4%2F%2F%2BaDsHDsKTI9%2FVnJVvWEqIGsxR8boHYG%2BCYZQg7TkJ8AbrfALUtRDr0VoLI%2BzPu8%2Bz9oEKVBD4zLLMNK2G7PXs8uDoKrrSzqP1Oz4Z7c76gRkk%2BgkmHw62wFIRp84GXoKEDtm%2FOYc9gSC3xZM3mAHvZuV3snaw4kBwa1qsv%2FjHlCX3WllUWsRx5EJqMNiVks8GOqUBpR5rdvw0DCipiNHp%2FHcw5kZLI28NEsJV%2F%2B6embqrAJCENr7OcZbCZkgaRDoa0QP55CkQGFRgdVDjQcP%2BUiOQPKM4BFEgPJH2qXoNjE7hHklHViryzYNRsvtNJQjWQYGPl6%2F7fvmBPgDmpYPBDScvCczNb8EI5aQg2Qw8G6IhVTwiKA%2FEz9JASANR9rB4U%2B7owzxXnEoyKm%2FhCjOrSwnYkVVU5f8I&X-Amz-Signature=df8c6c3eb5d8daa0f361e44abb7a61e95e6e5feb72f925be1c294aeec8d1fb61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675ZTFTY3%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIDEe9k7jDCmShisdigrJBAiJxb0fWA6VCH5OFC%2B8%2BUlnAiBbYv1eSlOEUcWOxDhIUsLgRhNTVqlts6eMR1kv0dKKwSr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMNdbBwsaJFFQk5T2IKtwDSG4CEX9HYFOKqhSRhlUC7UwNP%2B3nNwRMBJcQK%2BI3b4CBzfOFaiYWcM3%2FqEWcEcHQdsR4Ze51sVcauRRdvlzwBlo9iSwqcXjC1grxLDW6T5qX4nGLlySfhqAmSZFyFmVLVXv25A55EIPlqm7m44blUXTE11bEXvZqRgCah6KzOb2aPZ9vI5WHFOZDZR6RUDRtGV1Zg216Bi%2Fd8IeynhoDvAQFsliapqiUXxEP7MVtlGb3V7rajhucopcmagwjZOzvGkF%2Fi0uApl4Gf5pL2xb8%2BBZSRkAnfmqNpZINdHJHiIqlNTAGph48rFddHRP2bXYEIN3D%2B8tLs0iEmQxzT8Ii6FjYV1SzK4w25pGrNteBRoVHeXqFc%2Fyn4Ijo%2Bp3RhFJzJqhjmZ2elJtj8TdLd%2BcYnuxWlV5bP8v045Vrl5QXuynfRIKbJapIrSbHhsuzh8bPkANk9EGG%2F3ShA4HNMBsKghkXjjIsIci8P3AvGwEqF%2BElr0T%2F7H0rkpnEHCDl5mSINEPxrWXBlY7%2BBxUE3lZiUcf2thvfOw0to3rxNQwbl%2BaMGGAo%2F5Jg8AUM%2FiIYnYQ7PhzkeHtiL%2FGzKk1SMGbbmZpmx%2FsyWWhHkyEqmLhQYIp%2BWTL3rUdy89Wi81kw%2BZaSzwY6pgEhnn%2BO7941XxkUL1sWg04KVivxjibc%2FK2yeEFM%2BNKh9h%2FmNUYBclFu%2BzvMbx1JzP8SMVawlSuXYugnmlf3EJfHjPrRBuQbUDELz8tWQqRat9u7XcDrsC4AJSaROpz%2Ft0V6RQaIaB%2BYLEJHLA0zVen2sjMkw2sGbOfU8jkkyBakxKIFmK3DZm8IAe1QXNF6%2Fwg04Kp871fhimHswzuvxxwFBAJkcj%2B4&X-Amz-Signature=38bb8c2b0b9179e94147c4ac1cce4ce3c4f25d3c8d8b3203368408caa883c478&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675ZTFTY3%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIDEe9k7jDCmShisdigrJBAiJxb0fWA6VCH5OFC%2B8%2BUlnAiBbYv1eSlOEUcWOxDhIUsLgRhNTVqlts6eMR1kv0dKKwSr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMNdbBwsaJFFQk5T2IKtwDSG4CEX9HYFOKqhSRhlUC7UwNP%2B3nNwRMBJcQK%2BI3b4CBzfOFaiYWcM3%2FqEWcEcHQdsR4Ze51sVcauRRdvlzwBlo9iSwqcXjC1grxLDW6T5qX4nGLlySfhqAmSZFyFmVLVXv25A55EIPlqm7m44blUXTE11bEXvZqRgCah6KzOb2aPZ9vI5WHFOZDZR6RUDRtGV1Zg216Bi%2Fd8IeynhoDvAQFsliapqiUXxEP7MVtlGb3V7rajhucopcmagwjZOzvGkF%2Fi0uApl4Gf5pL2xb8%2BBZSRkAnfmqNpZINdHJHiIqlNTAGph48rFddHRP2bXYEIN3D%2B8tLs0iEmQxzT8Ii6FjYV1SzK4w25pGrNteBRoVHeXqFc%2Fyn4Ijo%2Bp3RhFJzJqhjmZ2elJtj8TdLd%2BcYnuxWlV5bP8v045Vrl5QXuynfRIKbJapIrSbHhsuzh8bPkANk9EGG%2F3ShA4HNMBsKghkXjjIsIci8P3AvGwEqF%2BElr0T%2F7H0rkpnEHCDl5mSINEPxrWXBlY7%2BBxUE3lZiUcf2thvfOw0to3rxNQwbl%2BaMGGAo%2F5Jg8AUM%2FiIYnYQ7PhzkeHtiL%2FGzKk1SMGbbmZpmx%2FsyWWhHkyEqmLhQYIp%2BWTL3rUdy89Wi81kw%2BZaSzwY6pgEhnn%2BO7941XxkUL1sWg04KVivxjibc%2FK2yeEFM%2BNKh9h%2FmNUYBclFu%2BzvMbx1JzP8SMVawlSuXYugnmlf3EJfHjPrRBuQbUDELz8tWQqRat9u7XcDrsC4AJSaROpz%2Ft0V6RQaIaB%2BYLEJHLA0zVen2sjMkw2sGbOfU8jkkyBakxKIFmK3DZm8IAe1QXNF6%2Fwg04Kp871fhimHswzuvxxwFBAJkcj%2B4&X-Amz-Signature=3b19b82abbb03b3d88647cf1132ca84f2618008500acc7acf865c836478a0a85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSJU765P%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDGbmIxOp2RHBTKmSzUMvuhik1SsSYUYH3q6kBgA8rsTAIhAI%2BRqEBMCoi8lg13qZ9WWBimG42GLwD5ZO2FWjf38CgDKv8DCAEQABoMNjM3NDIzMTgzODA1IgzR%2B1yCQyLbTSXhcrAq3AOmPLXVSf5T2wOZ%2BMB3YBf8QBWNE67Un%2BBKsy4BQxswtYZIW%2FkC6t93RY3h1IGwxizAIFhXF4p6ULR9L2QnY8v3k6NI0940Kr5LvZBsgx08VwAuaKQquSa2k2dLBIX%2FfMQeN%2FTLMLP61ZKJPXk%2FaDFUm4A1VXfD3U7uwRYzlIjJAvIEN%2FAWWphnnD3AunzTWW0lQ7xWhCy543m8H%2BDFKC78fig5RxnWiChGeGla5rqTs%2F3BSEAnHSkGM9LRt0mu0NlBKwSi4Eg5NqSwYQh9buVztGVqM5R7QegCLbt0HcR7Ysan3R%2FGMEk6ovljp2k5g09JDdK0f7rBnZ%2FMIAP8lHKPY8gTKVuC6lZY5y1WYNt0Jr%2B42aoySG129vwiIKP4JtGP4L%2BHIHrtnR5vjxr5%2FGMng7Kvst6Aoc4uBSY2Uhpr23wnb4qHQJBY%2BoAKJ3UvpNtDGgjHh6czCOqH5aCx4YYrxqEPdu9IkTnRoOip0nCTvwWT1xlWPDBqM8%2B6hVsjrnAktEnTmJwSes2eod3wlwWi7m247cWFbclDuXcAHtmztxvRoROxFPTtwWHwUdCWl7%2FB7YHMTNreh3kJxGudl5BIC7W9T%2BPHDWW30lyqr8qW%2B6inKpIIzGpGMJFtzzCvlZLPBjqkAXG94fHw4%2BaYw2Aqayo0StokxUzP3IuJYeLQ9LwIfioD7oEAJFSsvlBJaVHN8WAPl8jd17ykyxOA7Wirc3LFhhp95petqUUNaQtrxP%2FeAsw74pCB3bD62lw1utk1As097he9YF2RTwno3YYPP3BNeNG6lXbvOProXQQlV7kG%2F8rlRtdtskCdE7Q6tL9gyLUNQa6g611ISeSZObzDaZG9rDCHGy97&X-Amz-Signature=b6101096a8dd380dc30769edf8155a0916dcfe71c132b2bd9037e859bbdfa095&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NYWGSZQ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIBdid11ub%2BU39qzyoGAvL8plDG9jyB9ASmctilDVwe9iAiEAwlT6Ku4YQgHq%2BwF%2FizJyp8iLsGZrxeFshhgyX5XQbQkq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDC8K53MLYFZLDBgWeSrcA2fBh8llIqTpzv9ANjhSIKZvvSAntH1BFxxrY76hpNUReG9d9o5qDyV5AKTxcTsaDJI1IU6zfJsDOmvwnGdMPJn7DKS18%2FhCZqIxn8A5H%2FFNWx3bZsvD%2FEXMr33uc67jvhYa2VtoNVEpQK%2BrPNFbPF1OQHjTRlGsYUOz6VrO%2FZ%2Fk2YU6y8pmLGy7wFlanBcsVBhhP%2FwJka18Jz0c%2FjuzGbrBFd3DSv%2FkBqPdvMcmMbIma3EPIMzaznlFdbPoMdnoYPKDwv31l9mXvhAot8hIXuTgnL7xhscOvQQILhZbYLHCAjuXP2rSI3sj%2FvYCOAT1bFGCZE6dTWFFI8wvUcG%2BkupCTLKKZOKB%2B5MHqo01kcxuBD1uMOlIYmNxvvXnQPgE8TuffCFjHfTxNTHBZ1WMy9B0laMidpZym28yib8gYkMN8B9ULdUZ%2BOsJCvXv7qo9hUuXxxhoRPNI9%2BT%2F%2FHq4L1019Xb6gnRvUBzYZ6DCQcj5PAh2Goagi4BTJU%2FXtGeY1Ck5yeeCcU8ssBRC2OiHPrMPWJppFEiqEeBzn1tpwfsXffZkpnuT6lc77I%2BLOob96uN7dGukzYEOSe8EXnVvmOnbtUkLc6CHxxoNmthQq%2BWJl0YhMKgx%2BwbANaZYMKi3ks8GOqUBkxv2ZU%2BlTdrbCi8rnpdkfqh3jlwFriO6ll%2Bto0jfn0el6fYog%2BRgNWbYUwaEZ00HGBONP%2FY7ipe1de5xW%2FH7fXxOCP3rc2ttzzlV%2F2q4%2F755cDx3PiqRGK45dU5TTDm5d8i2OYyqS3WEM51duky83uq2w%2B8LVETlEaUg5MOyzYeGIpUvEm0vl%2FGs%2FqP5mitXUW7ivhGW4Taqkl4RqAaCui2VDTeK&X-Amz-Signature=b06c69a3ace2676d7e4f5d6555c3c5e8ab47f99338187d47ddf6c32234062802&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TI5CDJS%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQD4hERTnkUdI0u8KTtnQ4V0Wv9YeMlJEp1lbBEPijbouAIhAPHtHv%2F2QEuSp0BzRMPllNiKfmkYiHbC2wAvD82pk0B8Kv8DCAEQABoMNjM3NDIzMTgzODA1IgxmKWSz2HFeVfOocOMq3AN05BmwxJpv1D93tQaU5Y1GYMZgdYeq%2FXJ%2Blz9oTpgEVf2v4C0oKwQrVdK%2F1rjeUIWymn3OC%2BhHfkOTrKlticNnB5kKUhPozGJw3iyNo1LfOj%2BQIfj06w8SwrIS58J4ZPBPWrfOFFHYoQlYbbflO83dTT%2BKb2T19caU%2FJUtk%2BY7OhrCp0UtWgh9UrwV3SxSSqA0hT%2B6alh3qKIybdmfW30TXQYR7PYsOXfT5qtwE826gnnOifKHY4AlbYslIFTPiiq%2Fn2x7etnzw98N1y%2F9pn11wEVu%2B0yto1CAIMBIwtiFJjwbh4%2FzNAEUjkaa9m4PGbifHbsskELbZ88mWhauEEP6Sf%2Fn%2BsKQH8DTx9mDb07aUGDLMrQjQR2fpqUpahWdAc8ADNdF5kKhk8hQvftn34X4PDuOVFJunW5pYEM8d29jUINpg1HA4spPvUnwIHZ%2FqqKH9gxB4SErVyo8PkGABZv18V69DHwf5qeOiZ%2BDoVKSPhB2yJi3bqEYSOAcsjHkAnvzGRajK8xw7YI39cq79H%2FSsuWuGuYo%2BDu%2FbpHwqfMHY%2BQQar%2F%2F3fu9l2H1BproIE2wW9q0dPK38EB9dleIjiWMTmUFcymv4bTGIkg6E8gHZHfAv6oaXxTaJiJcYzDKlZLPBjqkARuTH%2FPuF9xv3UqAypJCheuuKoFlDyJRpKfUES4yWRKCtGTtqHFgjrIu1NrZIGy2jz6D1QKj8rk7dUhHgEpdjKj8usCBj%2F8f2maLHfSIV1EWaMsHg%2F1sVgekztIT7GNM4XZtlKkSs1Vk9PRHD1s6Dmh1Mlh5T6tpV1E8naWJcQVvtb9jmxui%2FdZYfzfpshl%2B8pLc4oyaPS%2FMIG58qxzhHI4sl2wJ&X-Amz-Signature=cdf7f77f44f20ef5c01ed4e2a11f7573f7dc6c03162ea1f3249549004f1a1a82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FRIOSOF%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIDj91fiTTY%2FhRh8iG1B7%2Bx7uhdsGNTETmoGK2mL13bYEAiEA9v%2Bru9oXGxN4apSw9i4M3%2Bd3irC6ZSh03HGjbOi8UH0q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDPHhAOypbv5Zqeme9ircA4yK8IoAvdhFXbZtfH0uPXUJhg5mlwQQ2JR2wWa1e%2BDqB3KMg%2F19doJMLnSpwKG8rxizAtjaIR6oP5vDZD%2FtY06XPqZMAfdr%2BFyCQUZKVTNwYxpylcM9tThjJ5OczsjleQgahPpSBpfJfQwVpk3Dx8AypYcydYl7LQkdkyKFZTuxJLwlIFZqW2e1w%2BOfnpm9EHRAiJ50xwur6CN5YURDcixWJ%2BkTl01eqm%2F5hw%2F8VI4JT%2FgwSHbFXlR9gjnKRAS%2FOa61NU6DSCS%2FZpUSaWDJfVcBSVGKtFArfnJ7Mo0eSHmwQcZva%2BXSEnyK7kchV8nHMjinCIvH0Pbxm6LKlyRsuR58dhJF%2BBGCdWdmXZ62T7SqSKtA0Tip26MQL3v2XwvweRuOO27cJHQnGrkoj9%2BNR%2Fd31DbNxOdPLb5X7ejvyEBUUMYynCLANNcrNB1g03jr%2BszaqWY1UjP0QlZaFVKDX2A507VSHAMzUpHOTQX6aLC94WUjF5%2Bw0vuvPjiQg%2B%2BrgyQu3GnwEVB8vD5CmF8ZPrIo%2FbFbiXGb82AJ0w2u%2FW7COblfJjjkEuG9eBMlpKmQI8oWpFRv6AS3%2F8lEkh%2Bj2y%2B2kA9FB4zuK26c7QzygI1b4jMMrZQINS0M5QpGMK%2BYks8GOqUB4Vptc5S%2FPAjyLGfxIl%2BNXk4T7DwMxHH%2F60uPbNQY0ozeJ%2FirihYqwdQH0GIF76OwUF6sfqjco0Z6PGwI00xN4Kz99oojOyqxB7SahBo6pWcr7rwuPlhlxgzvYcJXgXR34ePsD0E4rUPFevP%2BRiNcIS2RFEoS8PjmnBzeRmApkT%2BEg7s1w46CB9kG3q%2Bw%2FcN%2Bjr85gF4y066Q3qqovvaXL1YXJXDs&X-Amz-Signature=416183e6fded55e7cc5f55b403233470866649c4c9c9aa3940433bcb95e59430&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FRIOSOF%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIDj91fiTTY%2FhRh8iG1B7%2Bx7uhdsGNTETmoGK2mL13bYEAiEA9v%2Bru9oXGxN4apSw9i4M3%2Bd3irC6ZSh03HGjbOi8UH0q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDPHhAOypbv5Zqeme9ircA4yK8IoAvdhFXbZtfH0uPXUJhg5mlwQQ2JR2wWa1e%2BDqB3KMg%2F19doJMLnSpwKG8rxizAtjaIR6oP5vDZD%2FtY06XPqZMAfdr%2BFyCQUZKVTNwYxpylcM9tThjJ5OczsjleQgahPpSBpfJfQwVpk3Dx8AypYcydYl7LQkdkyKFZTuxJLwlIFZqW2e1w%2BOfnpm9EHRAiJ50xwur6CN5YURDcixWJ%2BkTl01eqm%2F5hw%2F8VI4JT%2FgwSHbFXlR9gjnKRAS%2FOa61NU6DSCS%2FZpUSaWDJfVcBSVGKtFArfnJ7Mo0eSHmwQcZva%2BXSEnyK7kchV8nHMjinCIvH0Pbxm6LKlyRsuR58dhJF%2BBGCdWdmXZ62T7SqSKtA0Tip26MQL3v2XwvweRuOO27cJHQnGrkoj9%2BNR%2Fd31DbNxOdPLb5X7ejvyEBUUMYynCLANNcrNB1g03jr%2BszaqWY1UjP0QlZaFVKDX2A507VSHAMzUpHOTQX6aLC94WUjF5%2Bw0vuvPjiQg%2B%2BrgyQu3GnwEVB8vD5CmF8ZPrIo%2FbFbiXGb82AJ0w2u%2FW7COblfJjjkEuG9eBMlpKmQI8oWpFRv6AS3%2F8lEkh%2Bj2y%2B2kA9FB4zuK26c7QzygI1b4jMMrZQINS0M5QpGMK%2BYks8GOqUB4Vptc5S%2FPAjyLGfxIl%2BNXk4T7DwMxHH%2F60uPbNQY0ozeJ%2FirihYqwdQH0GIF76OwUF6sfqjco0Z6PGwI00xN4Kz99oojOyqxB7SahBo6pWcr7rwuPlhlxgzvYcJXgXR34ePsD0E4rUPFevP%2BRiNcIS2RFEoS8PjmnBzeRmApkT%2BEg7s1w46CB9kG3q%2Bw%2FcN%2Bjr85gF4y066Q3qqovvaXL1YXJXDs&X-Amz-Signature=dccb87400434b4dbe142c305ae81c8aac7e9b5f59c858e7e6eee1001b418ad5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662G7MXTTR%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIB7ZnZfujrkgsyTIYkKZGCeX34IA4gYxUsFnbsb4kfNYAiALCBRr4LUzmdmEgSO5m9kC%2F8GFAZpM4Wsv%2Fp%2BhlFf71Cr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMXM3QYBMdnyF0RSD0KtwDAfA5%2FVboZgBztpqRUzqMePFtlbw3gxnOPsBbdi4nvaNWV%2F2oUXwJBGC3CWuWx0hfbSRLIjwF6xiCLu2ShGRF4PanWASFs8m%2FvIrVZR330ozVlxP5AdHj8eg5RYr4FbMLgRS60e61Ifi7otGdicE%2FhmsqVP1EOZcMW0arfwn6p%2BSt70T3ZmEXk7Vu0DJLOu4AO39EJFKrEHvELaP5H9d6ob2JgGDbF%2FCQ8sJfKHuQr6QnLHR9e%2Frt2mWOWOJN6SfzZlVOFPb7UyRQhbGQ3LVGC8ZgJSi9QPCOWtm9eN1E3Kct%2BAPz%2FcQkK0xCzIQp0%2FGcStp9rvNfGvnYJ9ECSaKv4MAKkGsOkaExLsDS%2BhBsbeyd%2FznXFnhURDUD6cRje1s83Ev5w4U6EXgYAGtGF%2FKkInDJIw006osCCjaHhXomkX5SkVpoHBc8uqLVoJUlUldmicXxgM3gXfVjA%2F1Dkv0eQA%2BD2yIf7M3fENZQNIS0ZIXyHQu7B%2F4KtH7YeZLO9J%2Bp6P4U7akkKn6MAhTywoeZJqfGXOMAzNDTbB7ACq6TBFgjXFLEPi1einEmVMo7KPXODCox2zBpYWVIOZTtPoIV7vr3xW21PR68Wy8s1myql465%2BAG%2B%2FwpoV%2FRFHcYw6JaSzwY6pgHvlwUJ8eWVGYk710nf18mhQcTzV3itWuPtMxJrkpEkJz5sMtMsOFak%2FX91zQgBulTlIpFJEd9IOfP19rAwnp%2BHWxlJN9CXflv2rzUyCYkZhd%2F6gkinqm8nQivE6cwH4%2FLAXatWwopuvA0gZJo8VKtKGILIcCIk9jZL2XEiyF5%2BP0Yu6vUQn1ImeNQUsqHWyASKqdfOby1%2BJ9p71xvqX47gPnPwvJf7&X-Amz-Signature=e39dcd068ca988c7adf91f7000721c634f440aa5b8972a599d4ab72bfa33b38c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2G7R2BF%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCtfBbKdS8dTdlSlax2dGMEERoKjfh%2BVjly8zEDEr50uQIgCg2ugi6cQw%2FzwZc9cbc3ug5GxhDs09ezk8k5EgO1Go4q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDO0kgdhD3cRCQ6jBRircAyE24%2FMi%2BnPRvqtmm2Sx6dt3QcA3FzPVzCJ1Poon8o4KEPRucCe2sHMdHV0G9xwxcxlR2JXVw7K8bN4V2FBqQIEi4K9PrAZJjGQcKWVKadixqneUFWVF1GsrhROhUbgmAhdfb0Yg8pzNOfS1xpZVmtSZVXHvlI5hm3i%2B1Xk4tJmWEjnKND94Xq5V31qJg%2Bw%2FTv%2FIFUZTC6pbR9UF%2FEuCHyHli1GdPhW83rTeBQU5GdVoV3199c9%2FOLgBQ1edN6yZUw5zs97jL6y26cXmvgb3puSe%2Bund0vrlsKCHkEVIe883AMJUXX8upzzTQj%2Fu8aJBTGTsnwtMUxf13e0DM6L8UBW2Db1IVpYPUh988Nt%2F6KAnXBqHcQbtG1tKbSAWlrYpSEjpVwEueyh2UhE2nE2w50VXdIwOpz0uQoHEGljE0zjKofqWO7ZR2ofjkANrWjaK%2BfflIMG64y4K60dOoqlFoZobJ8YFlsuCEZ33jXnBTEktpGNUKk3Lh9Zd7tTXNsuOXk1qY7v030Ljf7AoXfoBc3ecJxvfrd8pirqhW3jdJYi9O%2BAARJC6fX3ag8EjUE95t5VCN%2FNkDjpBjaq3i9uS5iry02d4srrRpBCnngED3SuvEEXad%2FE1apK7imSkML6Vks8GOqUBaHVuDzxCw1tcJw%2Byy1sWU0kQmjV4ciBybVWxxscZhwc%2FznI0M4rnpU4BFe8opozO%2FwTr%2FWKlukUOAcsau5Ylhr5%2BoWF2QrK3D%2BVDCycS%2F2BWh2dp3ZLwTXtdVfqJ0mI7SPNbbFh39XIArDHQChvFqwU%2Bb7pvTrnYvzhs9HblwP48%2BYuF4gAt6fn%2F8yn4eecDiUj%2F%2BeUYNtE7QC2%2F7pxvNCQnG7UO&X-Amz-Signature=7f8354d7dd99f576ed2c9fefdadfaab67cf012d56d2e592abac31bd65750f6f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2G7R2BF%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCtfBbKdS8dTdlSlax2dGMEERoKjfh%2BVjly8zEDEr50uQIgCg2ugi6cQw%2FzwZc9cbc3ug5GxhDs09ezk8k5EgO1Go4q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDO0kgdhD3cRCQ6jBRircAyE24%2FMi%2BnPRvqtmm2Sx6dt3QcA3FzPVzCJ1Poon8o4KEPRucCe2sHMdHV0G9xwxcxlR2JXVw7K8bN4V2FBqQIEi4K9PrAZJjGQcKWVKadixqneUFWVF1GsrhROhUbgmAhdfb0Yg8pzNOfS1xpZVmtSZVXHvlI5hm3i%2B1Xk4tJmWEjnKND94Xq5V31qJg%2Bw%2FTv%2FIFUZTC6pbR9UF%2FEuCHyHli1GdPhW83rTeBQU5GdVoV3199c9%2FOLgBQ1edN6yZUw5zs97jL6y26cXmvgb3puSe%2Bund0vrlsKCHkEVIe883AMJUXX8upzzTQj%2Fu8aJBTGTsnwtMUxf13e0DM6L8UBW2Db1IVpYPUh988Nt%2F6KAnXBqHcQbtG1tKbSAWlrYpSEjpVwEueyh2UhE2nE2w50VXdIwOpz0uQoHEGljE0zjKofqWO7ZR2ofjkANrWjaK%2BfflIMG64y4K60dOoqlFoZobJ8YFlsuCEZ33jXnBTEktpGNUKk3Lh9Zd7tTXNsuOXk1qY7v030Ljf7AoXfoBc3ecJxvfrd8pirqhW3jdJYi9O%2BAARJC6fX3ag8EjUE95t5VCN%2FNkDjpBjaq3i9uS5iry02d4srrRpBCnngED3SuvEEXad%2FE1apK7imSkML6Vks8GOqUBaHVuDzxCw1tcJw%2Byy1sWU0kQmjV4ciBybVWxxscZhwc%2FznI0M4rnpU4BFe8opozO%2FwTr%2FWKlukUOAcsau5Ylhr5%2BoWF2QrK3D%2BVDCycS%2F2BWh2dp3ZLwTXtdVfqJ0mI7SPNbbFh39XIArDHQChvFqwU%2Bb7pvTrnYvzhs9HblwP48%2BYuF4gAt6fn%2F8yn4eecDiUj%2F%2BeUYNtE7QC2%2F7pxvNCQnG7UO&X-Amz-Signature=7f8354d7dd99f576ed2c9fefdadfaab67cf012d56d2e592abac31bd65750f6f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFSJ73MY%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T112503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIE0wWavE61qeE4h7yO%2FG1s%2FOMQ7adGfa0AI0ZeBgwQIwAiA22nlsLp9sIhdPd2UGbsKyDY5JNQI1x16%2FUFynC3WbZyr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIM3nPIidgTswb0F7%2FIKtwDbav%2FqLC0NbDvkUHchBHmQcZZtcfYggZ4aLu2DM%2BDPJwfEasfQKFQPIagS%2BlqHjYUjLotYC14PS3YE06PACkDDEMHo9O%2BV9TXhRAd3Qm6XR2ClWI1dLQAvLIoZYJvxu8CD6ZBag5uqmWg35HvTuaChB40X%2BzES4uslA2%2BQowoILOkkCm5W%2FrePLwf1ubi%2FLXQnTpz1jd1K8Iu0D86MxwDIr2tg7NAiQ3jrc1aIemNu1jQQxaqYTXXnS6tyiQ2KWeVatAa4KXlOD29YcOQEDJJEW17RdHStvaqigbWAWnFTblrgcGMVOkrSEIVogceB340PuGQ7EzAES8DXFx7GhTj6GHfoUpQIURpOga1iBx1bXwokQqGRs%2FmzXDHs7EwXAn61Qs8s%2FbuoI4U89xu5jYau9TqeE2%2FVnlcYojVFmrPc6gb83jvfIz267916dDduW6g5SdeddnxR%2BvRQru2VHCgnsmagIZZehXncaJhnIAULJ7q33YEgKT1XbC9cPZ4PD718xQm%2FeZ8FKKP0HpjFYzcrzNwGHv49G%2B3l7KyFwPOZNnmAlSjhmgav8Gp3dxCVt0ug%2BcMjEJxjKUTB1yJbVZO30owiIzxEheWRC76qPD%2BOa%2BHCu3UIdEGtDGxq1Ewv5iSzwY6pgHYjIPc525juNYZqZjil%2FtYVi2QM3BZugABXPrePC%2FT8duahKheUHOUfNTMwVTfBsFYTZBPjJbdi7noThj%2FDm2Fyv%2FUzTMdAXuRo8ha4XJhb2AHcBl34gnYyMLIEgWjPZHUhPGSAxl0qDcntNklrdsmhZwFhtduCQtSefMdwUjhy8JF18NVUTL00YfznDO%2Bdb9vC0vs7kvf%2Frb%2Fef2y7e9EqKTeqC50&X-Amz-Signature=6e4aa1da85156ca1faf671d84272e9c81ba69caf87efff8b4da73bc2074c273f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

