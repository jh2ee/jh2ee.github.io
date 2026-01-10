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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OTFVG2C%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD0yGUXxq%2F6GVa8TuKkr72UO9FFEfc%2BYt95zlpQU0NnAAIgLewHJB%2FOLrB9Q%2F3tEVllHnVdeUqFhCygcc7gaAfwdgwqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL4mHljpaRve%2FlexFyrcA7WfDla5EYLlcTr4dCH44lcfr%2F32sRg5ERZxmlQwDC9Iu2h9%2BDMyVdS3Kxv86jxk70ShV4EgteUMP0t9Ar38dgmzIiVOaQJc5OSt88gxVUSi%2FPE5NAGU9prfIOF%2F387qPO35qVux1jq%2B6oDloz0y%2BSLA34rEptV1eCM%2FBTrH%2FN%2BapJKbGlGL19wTkjzS4YrCJtdeQqPDxQ%2BQGr%2BAIZWbnVvZfJr165l8Gw3%2F8T6ZGtk1nqQc3Ooii6jyORl2VdlgOKl6Rvo6tKH59ubcLRPyJJJNcp9%2B3Ip3PibZtkiyMn%2Bv7eFPj9OrmU5ZWK7uWHL%2FNfNAIR6QObh%2FRYekRe0nqAuVGMItlZJ%2B0E6z0MbYU9zklvz5iyRtVQbmBZQJGJD8sTFA7WVTH%2FwZQ%2BGJUoZpJ0m3IKVbW4ER4tiWDlV8%2BljGRl7uV23%2FR8zkEUCTVp7EQeDqwoZ7eCUzbza8AClN4y8FHOC%2BreGFAjsg8emH5jBkN%2FOrPEGyKbBsKzyuGwEG6wt5wS5DCgQ9VMIlEXzW8mPMw2fXLD3E4%2BYmR7%2Bh0mLafXqfEOBXtJyA37K1zn9l59CeFypIErvxjg2lnTt8L6lGEhOjf0RnosSQr45%2F%2BHfnkXUyCfMwsHD7ljJiMLLFiMsGOqUBzcDObwVLbGuX03WzN7xATg8hzdq%2F7e6G1MGHHKISpn15QawMCy8tsBGfMihCqIuiA8tJDBjlz5nYyX5y1FxsD2JPnktHrcXQoR8fA6TTNuhBR1K9Rsdo2oyd5kDhwRXyCqAK1CQ8d4efZnRO7WsClcEAAcFzLV6ZW53VG4jd%2FqOBoqinDLjgGKO3zhyjHfaFIuZ%2BIPxPVYqCd9SMkR8dIhqvr1sE&X-Amz-Signature=ecc52b7d32d584affc3ab835ad4f67011cab19f7d8dc235c09fb41a01d72c136&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OTFVG2C%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD0yGUXxq%2F6GVa8TuKkr72UO9FFEfc%2BYt95zlpQU0NnAAIgLewHJB%2FOLrB9Q%2F3tEVllHnVdeUqFhCygcc7gaAfwdgwqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL4mHljpaRve%2FlexFyrcA7WfDla5EYLlcTr4dCH44lcfr%2F32sRg5ERZxmlQwDC9Iu2h9%2BDMyVdS3Kxv86jxk70ShV4EgteUMP0t9Ar38dgmzIiVOaQJc5OSt88gxVUSi%2FPE5NAGU9prfIOF%2F387qPO35qVux1jq%2B6oDloz0y%2BSLA34rEptV1eCM%2FBTrH%2FN%2BapJKbGlGL19wTkjzS4YrCJtdeQqPDxQ%2BQGr%2BAIZWbnVvZfJr165l8Gw3%2F8T6ZGtk1nqQc3Ooii6jyORl2VdlgOKl6Rvo6tKH59ubcLRPyJJJNcp9%2B3Ip3PibZtkiyMn%2Bv7eFPj9OrmU5ZWK7uWHL%2FNfNAIR6QObh%2FRYekRe0nqAuVGMItlZJ%2B0E6z0MbYU9zklvz5iyRtVQbmBZQJGJD8sTFA7WVTH%2FwZQ%2BGJUoZpJ0m3IKVbW4ER4tiWDlV8%2BljGRl7uV23%2FR8zkEUCTVp7EQeDqwoZ7eCUzbza8AClN4y8FHOC%2BreGFAjsg8emH5jBkN%2FOrPEGyKbBsKzyuGwEG6wt5wS5DCgQ9VMIlEXzW8mPMw2fXLD3E4%2BYmR7%2Bh0mLafXqfEOBXtJyA37K1zn9l59CeFypIErvxjg2lnTt8L6lGEhOjf0RnosSQr45%2F%2BHfnkXUyCfMwsHD7ljJiMLLFiMsGOqUBzcDObwVLbGuX03WzN7xATg8hzdq%2F7e6G1MGHHKISpn15QawMCy8tsBGfMihCqIuiA8tJDBjlz5nYyX5y1FxsD2JPnktHrcXQoR8fA6TTNuhBR1K9Rsdo2oyd5kDhwRXyCqAK1CQ8d4efZnRO7WsClcEAAcFzLV6ZW53VG4jd%2FqOBoqinDLjgGKO3zhyjHfaFIuZ%2BIPxPVYqCd9SMkR8dIhqvr1sE&X-Amz-Signature=ecc52b7d32d584affc3ab835ad4f67011cab19f7d8dc235c09fb41a01d72c136&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3NIHZDY%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCo8wrVWobgdZkrJSHZDUXFE2CLN2dGIVyvXqVm1lvj%2FQIhAPa5dttS511h8jPz4Od%2FZCvcr37qJdISfrXpRk3BfaqvKogECLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxHO5zwg%2FwjYhaQGcUq3AP3D5jH8%2F5OWuoQpAZ8UuqjeDGKha999PeWjOeVjuRldxmISUCyLQEe0D1p%2FpoYriJWIZeesgjBO2dy3gN1%2BMXrw9HiXt0mENY9te32lqVqdEkIhrByRfTPmbC%2BSbY%2BcIbayT5egAYkAKROvpFzXmwNRV0dj95nUWQV4zEVpsy1g1XKvT%2BuwuEXavGEbPdYrvgyUfB2Rcr1%2BnNwuiOu5KTXWGolwugDMMR2i8FidxF6x7%2BUilFHjUzEka56NYF7FjSXRfJVSpyZkNWGp%2F8I%2BOmadcW1NQd3%2FzqnpoNm342kk%2FxkmsQtqHLlFL6R1dvVyk5Iw5ndiVdt2CSVbyyNgmesAFpwmoFI7GXtD1hzOC7JFyP%2B732cHTMNKLKMmseu0kZDLKtHS31PCCOP1j1ZjlYz%2B7lQrxoAN7dUkyLYGGz2Ok3dLu9DTkf3TCjoSLIUafEYcT1t21FTnfJ5m4muZkFHqSqhi0DKWg2q45s3KTuQrG2qo2ydPtDWD8VNmERjbdiIGyb7aStYweEUci8drzs9XGFKprf1dTz6Q7RWNWXeqHLeay538wzmfB671ZB4CVTiH2yZF6CsvCgNuwKNTHCZ0GkXaK2xVU4D%2BEYBq1knwG5KDoRHNiJoy0dAyjCzxYjLBjqkAYCjeiZZpnxr%2FuQm87EYEin2yEel4BYOAeDcnCV5U5Fu5RwyTv6ie69hPLfy6jm%2FNAaHIxFsEmIUUhMf80%2F6v2GCOifyEQPy7pKRNEx3e0kDh3ZsQgLYUQiVfIXtHITxOD5H3NeNPikO32fluSXRQEb7WJgqTap6uYRsHWYc2PX0KRE7Y2vIfCCB9kTYE5nbzQm%2BtpBqYrnuigKMcJbi9LVeaA9o&X-Amz-Signature=e146b0de08a6f17f8bd5544e89aa4b8708cf9208750dd8d3004d49fa50cf5e12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YHMX4E7%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCh84l44cJIb8kWNwf%2F7QdyHi%2Bp1Pvsc0ZZSXxM3wVJUgIgFOxShYT9QUXUwZRl3HwyIXUFH8ZCW3HJq%2FG2xsnCFToqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAOkJ4%2Bqd9JY07YUWCrcA6AlJRqdoLrqf0Yi13cFeKw%2BzAS73M3dnhspXvES%2Btb140sGt3IrNhrhma9zQq5Bf99hwlso1gajVPRq%2F7lq1%2F021w%2Fx9eLoIEofnh%2F7eDQHEDgTiIuNJaIgNjeE28ycuy0Q8446rwgNfv%2F56Jb%2FGoNP5r0Kyb1eZIXB5pPkd0m7%2FSZqyR%2Fc7IPk8aEu3m0GvC0D5NLwIqWMIcVEJSxJKvubiIfoq3bOJ4i8KykgqEI5ZLZeqlD2bHvlEYVSOPhv4sRmr5FUusmre67qYEMv0s9IJVZTWGAoHD3VfyDDRLJ5sg06SIO0yNkNys1NPW9X9%2Bv%2FWq5ONkDT4iT0NLjk2oe7yQizTQu4ObJGcKklR5CGztu%2BQ1ILo3WaJAi%2FpoV1SWcP%2FzmIVxcmAoPiNOlwTqmNT%2B7e%2By9mAkU6tHcO5wwpFrpc%2FnIlDTMbk0yeMeApnC8aB7b6yqmjghB6Pcij57eN5Fa%2F28dr0FZypSzMoia6EoaNZg2AV8jB9S6V%2FR96qjX%2Bqm%2FSCreAUfTkMe6Ut58DlEfKoM39zCpKkVrB16wiQHDUF6BSESN3frxX3BtbNbou91UOZOsCXg470SAgxrETYY%2FqgiR4OYSbx6a70SRrcIpXLpc6GoBJZCJTMNWpiMsGOqUBRgp2FPGodeIKYhQ7kTtxgMYd6A5dy1ugo0DP9CgOfl79QAVBJye4A5kEcj8c%2FAWOnk3AD63bp0Y80TDQR23v%2BD1U0i%2Bi%2BLmlWHRmoeqhx5ILQm7kcBMfVwVaWdnouh1PnhO%2FHBiztDLXStVMtOaXVSJjkSMtXpP1iIE5bmGCWbrNkD9fqZl2HA%2Fol6wLYxhA3n5Kj1eCUaYUWj9Nmmu2Vrj7ayWs&X-Amz-Signature=9d17c10e95c186f7edfeb362d935f57791d52ef5c37989a3d3f0cfd2871d8be6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YHMX4E7%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCh84l44cJIb8kWNwf%2F7QdyHi%2Bp1Pvsc0ZZSXxM3wVJUgIgFOxShYT9QUXUwZRl3HwyIXUFH8ZCW3HJq%2FG2xsnCFToqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAOkJ4%2Bqd9JY07YUWCrcA6AlJRqdoLrqf0Yi13cFeKw%2BzAS73M3dnhspXvES%2Btb140sGt3IrNhrhma9zQq5Bf99hwlso1gajVPRq%2F7lq1%2F021w%2Fx9eLoIEofnh%2F7eDQHEDgTiIuNJaIgNjeE28ycuy0Q8446rwgNfv%2F56Jb%2FGoNP5r0Kyb1eZIXB5pPkd0m7%2FSZqyR%2Fc7IPk8aEu3m0GvC0D5NLwIqWMIcVEJSxJKvubiIfoq3bOJ4i8KykgqEI5ZLZeqlD2bHvlEYVSOPhv4sRmr5FUusmre67qYEMv0s9IJVZTWGAoHD3VfyDDRLJ5sg06SIO0yNkNys1NPW9X9%2Bv%2FWq5ONkDT4iT0NLjk2oe7yQizTQu4ObJGcKklR5CGztu%2BQ1ILo3WaJAi%2FpoV1SWcP%2FzmIVxcmAoPiNOlwTqmNT%2B7e%2By9mAkU6tHcO5wwpFrpc%2FnIlDTMbk0yeMeApnC8aB7b6yqmjghB6Pcij57eN5Fa%2F28dr0FZypSzMoia6EoaNZg2AV8jB9S6V%2FR96qjX%2Bqm%2FSCreAUfTkMe6Ut58DlEfKoM39zCpKkVrB16wiQHDUF6BSESN3frxX3BtbNbou91UOZOsCXg470SAgxrETYY%2FqgiR4OYSbx6a70SRrcIpXLpc6GoBJZCJTMNWpiMsGOqUBRgp2FPGodeIKYhQ7kTtxgMYd6A5dy1ugo0DP9CgOfl79QAVBJye4A5kEcj8c%2FAWOnk3AD63bp0Y80TDQR23v%2BD1U0i%2Bi%2BLmlWHRmoeqhx5ILQm7kcBMfVwVaWdnouh1PnhO%2FHBiztDLXStVMtOaXVSJjkSMtXpP1iIE5bmGCWbrNkD9fqZl2HA%2Fol6wLYxhA3n5Kj1eCUaYUWj9Nmmu2Vrj7ayWs&X-Amz-Signature=9cf341f6287d5be879b14ec2476d537c6ce37c8a32270718e40b93164ac82236&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666NDCDXS%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUnbcWDqv%2Frp%2BGzZr%2FN7EVMpy0oQm9TyxMv5qgbXBRwQIhAKqqKddY%2BzysgTfr5cx%2BNcUnR6F21W3aIa6vOqLWgRZ2KogECLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyzJ%2FzASocoDlSqMbYq3APZxf4DUdMyVnGzJ4IlLxqOQ8wZ%2FhnvN8FcDSfC%2FNtZIDJDFhHvytNqzm8nCtfWI5cWXROnY6FLNyE74r7npyzbv8PbLSB9zJJ6eHbIW1z5nW0TX3Tb2Dov19DV5ZxceoEYl1n9CzCwbffaCq7egXc0LniHmKI2MGzrByDLy%2BkKd06g%2F25jBVbQNfXo4rP5AA7WUqQh8X6Tdbd9BAcGAQTYc4h3tGqK0bO86AUFXGiiaX1G4e8Ns1heEOyaLBRK919wKtFZH%2B%2FTcijD3eC%2B5NTKh%2FR3giIzY6v%2BUpGmWvwKZ69ZdOFRrRpM6aNz4Hzc0QkQziz1n0HZEbSOIDstE2U5aN2KZ5E4hgq5FNHTON9IHHQIfRx3%2B5oww7OqyhwSIuWw0AcOqQeM%2FfZt1Er%2FEeZYcNPWujol06s2KI%2FJS%2FL9%2B0gFw9ek5KIsQPvFRuNmCoZMisX0CuEosd9lZmghpb0mWetx6udJ%2BCRFQmedxYZJwXZdIk2%2BiJDzbK2NBzm8MjPa8Kk5BIXgefEdAiCS5LU18sQ%2B0i7B0fnYeM%2FRfvM8Sk5vsH9JqoDyRYqqOtmOENdMt9CAT8EZOou0jMzd6M6pHnOZ4Ui6bN5If9uqXLttRpZo60UosvN10v254DCfxYjLBjqkAf07IOpK9Pfryn7QnvH923cxAMYwsnqBDiSbtJSw0wrCgO7KFcoszxeTq2ddFSKQ3MdURoyx%2BPuTyJMSVElQpP2Zda2zIahVK0vnUwfmk3wgCR4i1LLfF0m3cUEPwSneWBC6aUkM%2BTIstTbXOg0fQOsd76bABpLtKhsbpOJhZN%2FFa0DD5TejX6Zoj3Hq2ehhHJA6dPU7G0ymAHmZ9I8uiOJ29SCb&X-Amz-Signature=1a0013ecc6405ad10c616f2a96932377b7ccf1303fa595d8c60c4a42bf526179&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LUTRWQY%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCWIHZh%2BNMyQ9Km85HMXNNBMxFzOnbT89JO%2Bou9gCe9OQIhANhMNJfkHD%2FFqeEubipOQYn66uA8K0mnej5CkE%2BNAY9iKogECLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyD0BUBCZNmbbC4hWgq3AOEyercyHm0i%2Bsg1nN%2Be9Fxs3R5vp2WQWLerBh%2BeCu0xXfsdsXx24xl5ftfYH3cHROV%2FifOqGP5OuEb0BY3HL%2FctmJP6wYik6u%2FpObKHDrZCqmrseEViFVeQRvXqEMDmBrodubbberpoGGCLbUzoHlyWmR%2BzXQ6lBZ1s7ia0yun%2F1MtjA0j9qvIFLJeU2HKx%2BFyZsCGT30Giritwiyz41EYXpBt5IBPrRmFH1zsh6FgxG4%2FD9agzpdjkWyET0%2BZSWpdFUrjfOzRPV5KWajiT3BLKI5a75tU4WQZb5vKK5%2FWqOKNHE%2FD6GHhDTOYNtMatNLcOiZZBLZu%2BqDt7hyb4cbAua8PrhuOFOsWMtDBu%2FL00mh%2FIZPHACYqideu%2FJCfXZ9x4VnAFTON6iD4rsmK2XmiiYbat7arVM7%2Bu4uB73ma0LZNZ161FPZhyr9EOQGkeXBHmHjeTMmHeVUG18aT5WWVUHiaG25euVcWil0906W1w4n%2FVfdOY2QHQnApgVlCd%2FW7KYBeeuP5yhTFu1AofKzMeo46019SOisJgAbofCr104DRs%2ByhKemcebHUylKo27oVLFZxFU1omUrZyK5ATPTTYeIEnveOoa646xJ6UhyKPrYgnwyLUHn3Nfi8VDDIxYjLBjqkAVVQk%2FQUDyjYC%2BWBnQvnE83GA3Yq0t5pjdnRGBkXwxtPmPVDyhbNG3GQJEtxrqA7i2EFFv4t3lPEpaqv8%2Bl17su7e%2Fmu%2FhWu3AN2Boh17wo5txP0EaFNmrkuh54yxIBU80Ty47e%2Fj%2B7Dw5EMHu4jVEp0XgZQC91kqclxAm%2B9%2Ft%2Fwui%2FvCJVYDlsNQPip5IKUhvjBoaj3t5R%2F71UTbDlcLUxB%2B8da&X-Amz-Signature=980c4828ab6f20490cc7392792e73e495e6a8ba6eacce68a69fcbeaddfb53441&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LKHI4SI%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDTmeqg87CrMgIUlWuVL5fgsMvSDJO%2BJnRVZ%2B23JL2T4AIhAOpgXn%2BirjuWm2vpIG2IafwfXx0NATdvaHk4UfMnMh24KogECLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzLtE%2Bj2g0LcAGZO1Yq3AMTsNcLH89A5CeWK5SUImSGbkMwyCDxiXtMIoP5%2F3cADwk4Wz0XGrgWIFN%2BYGvZTBJ2rpRcHsboscUY%2BFVnRYbpeHOu6kcBJbDMFtaQE0WnumcA8KVlgjTrOGn%2BQ8lS3eQjNg1bhlrQ8wENBAhPZGaCkSxbfDnUrJbKd1kxnBElKUoI1bLbdo1UpKYitHY09nt6k29toyCMEc%2FU0hmwU5WIZBC5qIv7Qvfg%2FyvkScy0ogDtlyjoNgYSOqw5JBhU3uImjMGzOnLnJriGzBLXB9Q6MYF5ZFzgPrgaUM7axI9lsVkLcxsU2B7kv0TObN63VegCZO%2BKihw2sQfWJVgrorWQe55GJa%2FRWLi5LUdcET4yxuBSrxtO9V%2FXz0c6hI3hVT%2FH9t7Ufh0HZX6rEAM2udGxVKxxPD97Eck1DBm5Fa3LjVbcjrzUrJa%2BtedeJbfiR4ruwseDyERE%2FYWAGr8nOgs9IORt1daIW6SPMrBF5NdbT0oeP7KA9PGtwXNTxCzMHvaDsC8Xgvt0QGv%2BTowoDGZ0dBm3gyjce%2Fyywa2aQOFAQralbNB4Ca085VZsbdr70rCdK3Y8cQI2cKcPVGTns4yEcewFxF6hg2OBs41keryusZhBwvWi4C6VFRxa1zDfxYjLBjqkARvVKOFqesnItLxiVzpO7%2FS%2BZPOnpOQ4k%2FYkkEIsWTWAofmA3x8BYQbhq4go9Yom7SibyInTo8D5blydGWVAGm3tcEMEv%2FSA1Td5cePbkraXskt7h5hxU9GLCiViRkJ3ldUYw1NMJdFAEKlGiq4KmO6GvUu5ReYxgbF8JO8eSDqczE8zufKiGPsN%2FsEEZrPV1tuG7xFm%2By9uDMsy5QTzUHtve49M&X-Amz-Signature=b6b7bfddc84e31a3a6958753cf56ddfb55da3d05301310e09e20b38957794b52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JJMYTAL%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBDmGLJIa06a7HzNFEB2l9PfidavsIXpKxddmMs5%2F6lIAiEAnaCUXpFoYx9F%2FsNSzSSTLqSNS3o3KoFVXZwXYHLmwlEqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIh5Rxd4b3%2FoB6%2FQNircA%2BkFnauZfxxHJkhcpA155jlX9%2FkGDlwKhytGkpifMUy%2BF2IwTY8owfW%2BPWeeKzE3U875OAlmpXUAwnKIce1K6Q1Dv7OJVa9%2Fixfp7UwLFG7MECdFNSBUltd6gAhPW5D0U1QvD4Un9rRo8nwuysAwQqthJXqgub8vuks6JT4cGcd9cj7dLuYD%2FnQ%2F6p%2BN%2FA8B1WDfdObA1zPXQJnMCHriKiCgaIivArAxqN9vT1eXf17S2%2BB77o8ljwb3QFglHkhRzvl07RJ6PIuk2CsfgFk9xt7QPC3F5iiwI45Z4Qgl74xef9jREYY7oMNzCYIdoBF3Lw4288I%2BlTO%2BKRWNlz7kHrORbpmvTXzvTcEIM9uZdtwfBDX0OdzHESdbzO%2B%2Bkmf3BNY2O%2BTdDdMx8vbDKtW1lY4f%2FZHWf1wpsXCwZLU%2FBIZf4gNAez6Do1iv%2FfWEHuldL%2BdQQ%2BtKt8b9B5gYY%2FCMEl5nNpt%2BXUixCT4JMtIh2GEfZVQNeD2M%2FlUx7Ha3EuWb8LmVAgi0Pz2bThMN5vzlib9ZS09zdqXTqPfVIniILiUPJ%2B4CHtfJ6SiWLVWSnWuzP3LiBsbAFY6xes91Flj5l0%2FAroeBkEpCfGYRdn5nOZusBWWIbY1Aa7y1R0mFMKvFiMsGOqUBI69hYVStNoD3Ax%2FUARyTz6yS2kFQhN0FP%2F6JUCjDPnhkRxWifjukqdQ8nzHGClrKUc8zQBJXgBxIepCPCLMCwOl4BvFd7anVIarUU3nFoftNpkrv3nC7VVIEhA3vVKZQ1y80jvZOlRpQMTiMJqGPfEKKPrJZPSKKoG0i9Cw6vRtKRKa%2Bg0hBKVnzQoCu2MOi7RAbmdIkzZZtqaQ%2B9Dfh5C4iWE2r&X-Amz-Signature=26d789fdc67a4af92920a98a2fad30f191976a7cff9718b189a2c12c25c4178a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JJMYTAL%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBDmGLJIa06a7HzNFEB2l9PfidavsIXpKxddmMs5%2F6lIAiEAnaCUXpFoYx9F%2FsNSzSSTLqSNS3o3KoFVXZwXYHLmwlEqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIh5Rxd4b3%2FoB6%2FQNircA%2BkFnauZfxxHJkhcpA155jlX9%2FkGDlwKhytGkpifMUy%2BF2IwTY8owfW%2BPWeeKzE3U875OAlmpXUAwnKIce1K6Q1Dv7OJVa9%2Fixfp7UwLFG7MECdFNSBUltd6gAhPW5D0U1QvD4Un9rRo8nwuysAwQqthJXqgub8vuks6JT4cGcd9cj7dLuYD%2FnQ%2F6p%2BN%2FA8B1WDfdObA1zPXQJnMCHriKiCgaIivArAxqN9vT1eXf17S2%2BB77o8ljwb3QFglHkhRzvl07RJ6PIuk2CsfgFk9xt7QPC3F5iiwI45Z4Qgl74xef9jREYY7oMNzCYIdoBF3Lw4288I%2BlTO%2BKRWNlz7kHrORbpmvTXzvTcEIM9uZdtwfBDX0OdzHESdbzO%2B%2Bkmf3BNY2O%2BTdDdMx8vbDKtW1lY4f%2FZHWf1wpsXCwZLU%2FBIZf4gNAez6Do1iv%2FfWEHuldL%2BdQQ%2BtKt8b9B5gYY%2FCMEl5nNpt%2BXUixCT4JMtIh2GEfZVQNeD2M%2FlUx7Ha3EuWb8LmVAgi0Pz2bThMN5vzlib9ZS09zdqXTqPfVIniILiUPJ%2B4CHtfJ6SiWLVWSnWuzP3LiBsbAFY6xes91Flj5l0%2FAroeBkEpCfGYRdn5nOZusBWWIbY1Aa7y1R0mFMKvFiMsGOqUBI69hYVStNoD3Ax%2FUARyTz6yS2kFQhN0FP%2F6JUCjDPnhkRxWifjukqdQ8nzHGClrKUc8zQBJXgBxIepCPCLMCwOl4BvFd7anVIarUU3nFoftNpkrv3nC7VVIEhA3vVKZQ1y80jvZOlRpQMTiMJqGPfEKKPrJZPSKKoG0i9Cw6vRtKRKa%2Bg0hBKVnzQoCu2MOi7RAbmdIkzZZtqaQ%2B9Dfh5C4iWE2r&X-Amz-Signature=4386e63c513b676e8b92966f56f442c3d96957a820b065070ab2f70590083331&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5SMJX3S%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICQanmSjrxqJyqRShNSolOt1faaELbSJ%2BVcOaxIuP%2FBdAiAoRMGi3Mf6cGnLzJs34eGp2KUvxCVO5%2BQt%2Bvn3zcaqPCqIBAi6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdNZqcapXfZBHNCLqKtwD99gJZzEdvAKs3AbweOHoi%2B44ShNS3UnFJpYw8FGFRDcBRnTdLcszlDzcUOW6OULUpG3PlpF6bDXk6INsUnw5PFB6M2TicSRzQeTJHz6qWceZtEf5K9zmD9qIRqVjzUA4fPb0k73LfYQeobRgrVjJ9wzzn2FlLPdxES7RIBA3eTCjPZYcv4mhHFXUyX0UMKkrpElaf%2FdOu7yvZt9542K3kDYZEWWC6jUfJq7ELtQHJihXu8Qpa2lHQOIuUK3vlrUeY%2BmGJaK8urzluwIlyYylXNNEdyYqrUZboqjOf1wdAsqk5gGM7MYaYapYXaNmW89QHfw5esGSHc69bzBUjbUQvhY0kdLCnxjnFQTqwoAGZjeszupag34f%2FXVSeZNmBRSMq2ycMKhGNVelxnVp4Ta2uFidPfOBbh4%2BqFKcb8RQdhkFxIivQxDJbP1SEOG%2FTVs9UAY7VbmNg6hU23OoyFzlBi99EGg3O24u5HIG8iQ8vErif3X%2FRGh4vrLT04KmYMAijP5C23jQqgDi3mZlQjyzihgN9XHfpl%2FSPOpzAMD2dL%2FHLj3saR7b24BbYyGsFGMKdaCDIKGaf%2B1Zxg%2Bq%2FE3XvHFIzbMHmItXtHgkaUhdQFHTspP2e37ZTgdtwpIwsKmIywY6pgE94PBxcm8XdE4NrjsDyxyvei3OKo49xXkNdkMA0FiTxsUp7rg0iA8Nsz%2FoYX0j3VvtMDem2n6vUseu4ezN5r4hatspTCuAExc%2B7iaInCqjk%2BimtElI6h3dijjpEUt3emlZLc4sxnpfKvXaQnBqhye8U1EPdGqfPRdZnuqC8E0PAwBezi8E8Oxl7HOYV3w7gCAic%2BOpMY3m51lqS3zJiQqtImG75%2FIT&X-Amz-Signature=7ff0f5728d01151dee071ac4a508d0b4c376a8d54e8903ec85581fa739a8e7f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OMKO3GZ%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDY6PG%2FsV9u%2BXGgPm32lZ9J63V1p1V9NDbyoIJL7SWz9AIgFHAo849L77UEx%2BO%2Fu8F2qejjnVFqC9B8rr6uWe5617cqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNn8zT0g0T4gKTnStircAzTIWow0evCrUrlhcTf1cINYZtbksQwJZcm9jcN3cJiQlNAv22yvZq8YdRbpZ1C%2Ba5yATGoDKSsGNs4w%2FrQmQ49kKp%2FDusBbPStQ96WfOKXa3UvCrmcV7wvJaIkhZM2eQc2yJRzxmm%2FeRdp5VuxR3%2F9y9KPQSjGfwhTmum4JVuKkcW5IwS%2BvI8vFp1rLKH%2B8VeJdceYJ6N81BtETFW9pw%2B0RJV3vbKuEeGi8I%2BhxMqkhnNKTN9lgmwz3LOwZc8JVr1d3Q7vJqY28cyOV5H%2BtdJLBwfMpQKPeWVtNbUUE5MIhiP8%2B4vxz6PZdT4P1DypsVq8RA%2BaGsDyAI3PH27EF2Pw4FcjBKFpRm%2F8OiaDKtJtPv6mS%2B6icvF1zbAEcNnMbRWUn4%2BnemLR1NEmhcEuEWkR2O5oAG0K1ZPQQhbO8KkzY0e0hqrqhev5OUqkWAzAHJw52m50%2Bgvm1RGOQkifv2JdneXF2R8VrWw3vVn1%2BnC0MByLUAfu3WTGz%2B8Ed3Fv5JPYSvnvKewYpBApcFkl9zxhhIZTBupIhptBEoAzpO9z32Fz89HTY2k06zp989mZa2d8rYzMm1qoyB19mRndrNMORSlPb99%2FffFkTgnlY%2Ftle7IbJrRvIyZ%2BQKhVmMNPFiMsGOqUBAAba8uurvfvVwDyClA3%2FnVE5rUttPN7y6sONyPYB8em%2FArxHFh6EAyl6RhI8DaUvx7svIonFQWJBLUd5imXIytoq8tQq5S11O3BoVR9%2FLILwm0LHLobO5RXO8o%2FC8EVjVnq8QaeWpOn09gzqYMR180AR1Q%2FNOsH1y7EV2wPrDIFcw5bo%2FiRN9lQ3FojiHMw%2FywFyWwezBIcfJ8ROecZRfNaqzwT4&X-Amz-Signature=a19c506f87c3d93eb2e33aa31ceb9f799fdc0b67e41b8647b4275a3f40d413ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OMKO3GZ%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDY6PG%2FsV9u%2BXGgPm32lZ9J63V1p1V9NDbyoIJL7SWz9AIgFHAo849L77UEx%2BO%2Fu8F2qejjnVFqC9B8rr6uWe5617cqiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNn8zT0g0T4gKTnStircAzTIWow0evCrUrlhcTf1cINYZtbksQwJZcm9jcN3cJiQlNAv22yvZq8YdRbpZ1C%2Ba5yATGoDKSsGNs4w%2FrQmQ49kKp%2FDusBbPStQ96WfOKXa3UvCrmcV7wvJaIkhZM2eQc2yJRzxmm%2FeRdp5VuxR3%2F9y9KPQSjGfwhTmum4JVuKkcW5IwS%2BvI8vFp1rLKH%2B8VeJdceYJ6N81BtETFW9pw%2B0RJV3vbKuEeGi8I%2BhxMqkhnNKTN9lgmwz3LOwZc8JVr1d3Q7vJqY28cyOV5H%2BtdJLBwfMpQKPeWVtNbUUE5MIhiP8%2B4vxz6PZdT4P1DypsVq8RA%2BaGsDyAI3PH27EF2Pw4FcjBKFpRm%2F8OiaDKtJtPv6mS%2B6icvF1zbAEcNnMbRWUn4%2BnemLR1NEmhcEuEWkR2O5oAG0K1ZPQQhbO8KkzY0e0hqrqhev5OUqkWAzAHJw52m50%2Bgvm1RGOQkifv2JdneXF2R8VrWw3vVn1%2BnC0MByLUAfu3WTGz%2B8Ed3Fv5JPYSvnvKewYpBApcFkl9zxhhIZTBupIhptBEoAzpO9z32Fz89HTY2k06zp989mZa2d8rYzMm1qoyB19mRndrNMORSlPb99%2FffFkTgnlY%2Ftle7IbJrRvIyZ%2BQKhVmMNPFiMsGOqUBAAba8uurvfvVwDyClA3%2FnVE5rUttPN7y6sONyPYB8em%2FArxHFh6EAyl6RhI8DaUvx7svIonFQWJBLUd5imXIytoq8tQq5S11O3BoVR9%2FLILwm0LHLobO5RXO8o%2FC8EVjVnq8QaeWpOn09gzqYMR180AR1Q%2FNOsH1y7EV2wPrDIFcw5bo%2FiRN9lQ3FojiHMw%2FywFyWwezBIcfJ8ROecZRfNaqzwT4&X-Amz-Signature=a19c506f87c3d93eb2e33aa31ceb9f799fdc0b67e41b8647b4275a3f40d413ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637ZHBZTT%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDc2H44428AfiXfy8o1o0p6c8WzkzYXuVAVbaJNFAaEJAiEAsSPncnxk%2Fj9umctbMxdXaHOX%2BDp9vZKIQwbowFUgbG8qiAQIu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIX%2FNjTdXFvj%2BbtLzyrcA3wDynhcMsR3Xpr3yp8VsPrVuHidIDsH5yL04BaUrw6li%2F4UsU2EUYXjcC1HnEYRsta%2BDBVtfnbodZUO0mCWHvR7ZRsLc%2FqPuz0HCu7AffUx8WuZpWYu1x7riBkQnacFK0a0WRfBcygmt21oT%2BITl9t3CpdrNb%2BQlWdsqE7HqyIZvPAbik9T9GS5LIYEDrBxRtEJd7bqSNiMzwMNGtOiuUfq%2FCdQzeY1DpwEVrbYy3BI4M%2B6%2FiSiU6tcYJ7Y5PuWofgPKwxz%2BspazaaYYpcHlmISmh4Ekf%2Bvz41OkSq8BIhsuQl9gktDLoAn6nvLXcXEX9H6fe8PO7TcEGNGX2AMrthvnz4tZFWHiX6fjUl49w%2BfiNJi13iTJeXmAQwslI4j5XKNZXAYh62TXpSmoXwiE7NP9ykx5eEvIGJYKSATW%2FeR7UGukfeIhTDBGAXWxB5PHTjfqCvFPCekDhXE%2BBMkM80%2F7yAdHbNsB7lSmmBs11his29mSPdsd8YJg5%2F9Gor%2B%2FQwDjA%2B3gPQwOjqbOQnakPgVwqyA3UpZNLU9hXG6f1J%2BLCT8huVK7Msvy3L%2BXii72M5%2B9goIT39wes84a45uqEG%2BsDN2ijdq0zWOlzZZNVU8O%2BJXDpCj35yAG1DYMNzFiMsGOqUB%2FGaOzkU8TnoAfMUt8U0T4ArRg%2BOIAZOB0PR0EvZUZwFe2EnHfhsVVynCw5HPN6navJJy36LyxtIndlBZv9BmdOhQHTRYFRp6DXKmJoxHUCd2GkcWBODESmhSvZrpeugBcL6XvLSeRyFeOj95v0S6A4ZzjU%2Fz61E%2B463HGd3WPT4kUuwr1gigqMPeKAe9X%2BoeKtaZaOKiBRloEv8iaPicCof8M4Xg&X-Amz-Signature=e77b52207866c752053ba19c5ef2aa617c01ac3ed5c854b9b53c1be3acce8288&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

