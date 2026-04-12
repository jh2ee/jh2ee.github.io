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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCWP6KTG%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T201958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzI6WUa%2BnmMfvEvoE1WofhSPoALpnybEEmTr2nQqzjbgIgacqGGK8D6l2VmwsUl35Jv9AsuBmG33nEzpaMBgBomBMq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDDaZmcAKwRj0eplbDyrcA9J2A1bpw6NhX3DKDV5SwQbiFMhHf8cin7p38%2BINJqJcGDsugI%2BJNEERdM1MFzAH2OyFOT6KRuIaE8vjOHrimFwB97zzgRfijWxhCSJQaWfghsB8wsy%2BnPNOK8Uu83kjbX6MU6rZJgn7zRiGN6Dumf%2B3pMvgiFLRrHAiCWikViEP4d5hzc8g1XpvmPd1Vw8Ofq0OofXPEbrEcdDB9SZ%2FvkTQbMuN64gbQlWykmCYqN7twSnpb48LgoUwxP9LY89mrGpSzE3TSgtBX%2FwLfTYzog0MAGuimdAm%2FgQ6rWIULTBJaTlqnThtqUkDekgDVbAvLHgpad0ez3aXBEeiVeuT%2BJHiWWOjYC%2B%2BsDEc4mXe75be%2B97c%2BefSfEcsE6MLT5Ds%2BYE37MwhSajsm5JmEgnlbnCzGsHkMnlwlrD6A9BE%2B0qApmIGEUvs9VX8v8t7M1ik1iDcAiSrsqfQbNDXz%2FIh2Mx35yX5kwNKnAnTro5mD3OED1U1NBK1%2F%2FH4jHP1DanD59pIzfPuwFdrnQ9gluicibgM8GHkauHl2A0X5uYaSqCp4%2BiN6T9iOE2mJQs5FCsUYvSzQYa02rPMaV5oFLE0ItTQzvaTc7io2RJmzQQ9EEVN%2B6HO%2Frm6pZHQ8b69MOPl784GOqUBDFpzMTFPzHuPk3cfLPpCoRcU9O0x4oKKT5TDxI%2BH3N96LFVgzUP4jERCQD0NH0o%2BYwBAMShPKjhcVTu39xjuCPmynQ8Src811Z66sZjWl%2BhlZxWHP5N11DCmsNtbFwaagl9QfUrtyui9VgWQw8TfYip0HrKNe3CAsn%2Byq70dT2OVdJjt1qBRLs4Fy20doVliKFUzkCPBr1XL%2FIvKcX9EzpusinIT&X-Amz-Signature=87a022b7c7b3cd4a2661e4cfb694907b91181ce3851a2951a7c19678f6f87be4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCWP6KTG%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T201958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzI6WUa%2BnmMfvEvoE1WofhSPoALpnybEEmTr2nQqzjbgIgacqGGK8D6l2VmwsUl35Jv9AsuBmG33nEzpaMBgBomBMq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDDaZmcAKwRj0eplbDyrcA9J2A1bpw6NhX3DKDV5SwQbiFMhHf8cin7p38%2BINJqJcGDsugI%2BJNEERdM1MFzAH2OyFOT6KRuIaE8vjOHrimFwB97zzgRfijWxhCSJQaWfghsB8wsy%2BnPNOK8Uu83kjbX6MU6rZJgn7zRiGN6Dumf%2B3pMvgiFLRrHAiCWikViEP4d5hzc8g1XpvmPd1Vw8Ofq0OofXPEbrEcdDB9SZ%2FvkTQbMuN64gbQlWykmCYqN7twSnpb48LgoUwxP9LY89mrGpSzE3TSgtBX%2FwLfTYzog0MAGuimdAm%2FgQ6rWIULTBJaTlqnThtqUkDekgDVbAvLHgpad0ez3aXBEeiVeuT%2BJHiWWOjYC%2B%2BsDEc4mXe75be%2B97c%2BefSfEcsE6MLT5Ds%2BYE37MwhSajsm5JmEgnlbnCzGsHkMnlwlrD6A9BE%2B0qApmIGEUvs9VX8v8t7M1ik1iDcAiSrsqfQbNDXz%2FIh2Mx35yX5kwNKnAnTro5mD3OED1U1NBK1%2F%2FH4jHP1DanD59pIzfPuwFdrnQ9gluicibgM8GHkauHl2A0X5uYaSqCp4%2BiN6T9iOE2mJQs5FCsUYvSzQYa02rPMaV5oFLE0ItTQzvaTc7io2RJmzQQ9EEVN%2B6HO%2Frm6pZHQ8b69MOPl784GOqUBDFpzMTFPzHuPk3cfLPpCoRcU9O0x4oKKT5TDxI%2BH3N96LFVgzUP4jERCQD0NH0o%2BYwBAMShPKjhcVTu39xjuCPmynQ8Src811Z66sZjWl%2BhlZxWHP5N11DCmsNtbFwaagl9QfUrtyui9VgWQw8TfYip0HrKNe3CAsn%2Byq70dT2OVdJjt1qBRLs4Fy20doVliKFUzkCPBr1XL%2FIvKcX9EzpusinIT&X-Amz-Signature=87a022b7c7b3cd4a2661e4cfb694907b91181ce3851a2951a7c19678f6f87be4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IRG33S3%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T201958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCMv5CaEwNb3c0RNw6g79e0EgeQEKqNpxRP5vEoOAh2tgIhAPNdFRwDNlOD3gfvT4gc6G6JzkumfWUgDtfxTcFjUFHfKv8DCGUQABoMNjM3NDIzMTgzODA1IgzgjvYzlSZhp0Ayqlwq3AOUbcFmN%2Bj1DrvC%2Fxkyc2g4dGBd4U8u263CBW4gBbckv9SsKIPzaZhE%2Fpa2jmSigHP3gCJsl5LJniZf8lJNHNIG3cvXP82tMvrtT4NhvPA3mxQxtrDBDZE3n9zdzfR8%2BEtkmWNl3Qr0%2BnD82%2FuwLIHqk94X7JdNREX1j1zOMGL62AF7%2BA8tIX6VgfGQnCpZXXie3DqFiglxlKO5IKAdxr28ftap4wyaD5rwZ6bDZFWntgfhGjv%2Fn08obj3J7kgrTIChvJEapEt%2BoZ0%2BIglRkBetcjFdImcTGYJi5xjvhu%2B4TfdEC0MaxBMfiVqSIDsRBiHIaz3CKEhHjp92N4h6No6LdTXvGAMX3wA1buVVJnKTdIeh0R7JAUqXx7kKOEcuADL3fuq7ZMIgUs39cliI4s5LkMKOKptYrTkamQ%2BbpAiXOCGOoV23d0XczzoK4rhxhKU5sq010ORctf708wrDYA13UHYin4zSlJSV1usNAEDlQsFLDPnEuor7XUQaUkK8M7mH7yKoK1%2BxBUcvjydL6nj7Ebu6BQ2qJEroWbPdj1QGmVIs7qp5Zn2cH6JuJ9cq7zK2k6diBJ7VAV%2FIJy%2BL%2BKYA5x5G0gHIxr0zz3SSC3KSsd2%2F3jTU2l4CSbM%2F9zC65u%2FOBjqkATAxZdeZ3ADO5cnxd3G6NpqI3tcND1Hn3BkJPzO%2FEtEkvSW33q6eayDO5x8XOLcAv7FZ5ZIw9Uh%2B0rAYWXUOLkuRNwtCc6psyI7OYVaYXBW4yKv9Ev2CDcFe%2B2wBo20o1VTHNpeIkZdIjPxqLjAt6PzXnHmNAzy8AVldCzu3NQFj4IQ%2FdnepljIiO2bxlLCvnx2oo2qknNKCmUrbusg36HU2AVc5&X-Amz-Signature=07b2c3cc9e9ebbd82e3620904c382083ef75e5aefb207de1c3b60a8b78de5458&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHNIO3T3%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T202002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDwJtu9aEoFxklh5aMSOUOCNwAK%2FxnHmgeKyopAAo2SmAIhAKQj%2FjVsg17khhssPf4sNQiKAXErA5nVqAoTRwudVQdOKv8DCGUQABoMNjM3NDIzMTgzODA1IgxZ%2FbBf56kYuuRYIwkq3AN4SAt9O1JfhQAHXf5jJtMVnGw4NpHAzW5ldiRO9zQuhfJWoRyYLZVfVN1fsL%2BcQjI2bv4CyJsRE5s4fB72SqCmO8Pzk1H5s2r1oKLsiveiB5Sg7zdm6tn7mZG5FhYXcMiQ3y6xUxXvbnqDy%2BRxx74Uor%2BqA69YfxM9lLu1o877R6kBJDt79et8S%2FDvQiWkqOHmHcwi4QdaK5aFXhoIvhh2iln5f3Zb%2BtVUBP653v3RbcizWx0GdfEInfTU1jbYaDfwHzL19s3TwcpurjEKd6lg%2Byez%2ByL3sqxys5B5Iwk%2Be04n6jcVEENUNRUeOMZ6FW9kLSWp%2BOf3OEZBEUcU6l4p4DiIo5qxg5L88B%2Fzuqm5jhDNgHLsj%2FxUHRtdszryf9IEo0hHmv5jfw5t2fxR6w59eGSNB7f%2F4J4CtYGBnF7N%2BX0xjYPH8vFJjWoee5O7JpCXojq5tHzgvw7xh6DLEvkAh%2BB2LhoQ0ay2WhAyi8uenpSTygzaqD77OdG0QPDZeQtewxKbZBLlXlomtAq8biSG7U1kBEabyrFVrWpgFVGicFzdijVyX88Fz4q%2BS91ImoCk2G8J3MfK8jqmhpI7s6eh0aNq2O%2BqBhtcAC13TIoTIWFuFb03J6963bAK0jCP5e%2FOBjqkAYYuu5CTNC8iq3dU1shkI35nxVroREuhgJ8gpUQhO7bP70dn0D5z7spG3rqMkpc60bXzus3e6L0rdA%2Fn3hiKVCphlQeA%2F3M44FndlUdpBWJQJPyzsGB6DhmYjFIHONMrAQlqWGIadY8Ikwkyw5NptFLvgrNgWgD7pcmG0RuCjS0eTu3rMFVQ6DyliwXEvhz0PICPhYwDeoC40SDeHlJ5vyXyPFYe&X-Amz-Signature=cea0b6f1d26149c904109029a8088d9144463bfabe7daa4e46ec2b6a9e6391a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHNIO3T3%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T202002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDwJtu9aEoFxklh5aMSOUOCNwAK%2FxnHmgeKyopAAo2SmAIhAKQj%2FjVsg17khhssPf4sNQiKAXErA5nVqAoTRwudVQdOKv8DCGUQABoMNjM3NDIzMTgzODA1IgxZ%2FbBf56kYuuRYIwkq3AN4SAt9O1JfhQAHXf5jJtMVnGw4NpHAzW5ldiRO9zQuhfJWoRyYLZVfVN1fsL%2BcQjI2bv4CyJsRE5s4fB72SqCmO8Pzk1H5s2r1oKLsiveiB5Sg7zdm6tn7mZG5FhYXcMiQ3y6xUxXvbnqDy%2BRxx74Uor%2BqA69YfxM9lLu1o877R6kBJDt79et8S%2FDvQiWkqOHmHcwi4QdaK5aFXhoIvhh2iln5f3Zb%2BtVUBP653v3RbcizWx0GdfEInfTU1jbYaDfwHzL19s3TwcpurjEKd6lg%2Byez%2ByL3sqxys5B5Iwk%2Be04n6jcVEENUNRUeOMZ6FW9kLSWp%2BOf3OEZBEUcU6l4p4DiIo5qxg5L88B%2Fzuqm5jhDNgHLsj%2FxUHRtdszryf9IEo0hHmv5jfw5t2fxR6w59eGSNB7f%2F4J4CtYGBnF7N%2BX0xjYPH8vFJjWoee5O7JpCXojq5tHzgvw7xh6DLEvkAh%2BB2LhoQ0ay2WhAyi8uenpSTygzaqD77OdG0QPDZeQtewxKbZBLlXlomtAq8biSG7U1kBEabyrFVrWpgFVGicFzdijVyX88Fz4q%2BS91ImoCk2G8J3MfK8jqmhpI7s6eh0aNq2O%2BqBhtcAC13TIoTIWFuFb03J6963bAK0jCP5e%2FOBjqkAYYuu5CTNC8iq3dU1shkI35nxVroREuhgJ8gpUQhO7bP70dn0D5z7spG3rqMkpc60bXzus3e6L0rdA%2Fn3hiKVCphlQeA%2F3M44FndlUdpBWJQJPyzsGB6DhmYjFIHONMrAQlqWGIadY8Ikwkyw5NptFLvgrNgWgD7pcmG0RuCjS0eTu3rMFVQ6DyliwXEvhz0PICPhYwDeoC40SDeHlJ5vyXyPFYe&X-Amz-Signature=3207731bf092d65514f724400587e2b0215d7a5f44aa50e0114d283bb4d6c326&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3O6EWBG%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T202002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHT9kmtHv7Ozf7etjGIl9T0oVk3kTX5NHDv9NdDFummmAiEA6mlyuVZ1ISeTzcGQkdVxd5342EkO1QEs7y52icPSHEYq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDKU9Qz5A4prUKGUUPCrcA7Sf9gKkrQ65%2FPXaBf0RTq8AROty3pLYcKl3eazKYlTwrfl7NYDFAOB3P%2F12S3kwLZhqZD6h%2FPdDHmCpIne1iuDLxiza3mxbJ9IzoGJWw7GPI%2BngiFblwXSMIyhl6UdwaqoIGSTw12dLpCxJj6yLO6580EXUgy7ghhEj4TiETU%2BGuid3wXAifOop2IkuTLmkyG4%2BcenA8gYAGOCVBS1TueD1wgZmsRx56VhByk7ANkMo2qfl01T2tlcBwYket0o2JB7VcBuoooqqe%2BUJE91KoiUb9thONMfs0Vz1OYvnUSj5cbPyrhH1zadtNZoW7qtRKt1cFvTb5hVhxlq4gdML%2B8DyEaA3nL4iqRzxLzWt1ypAo0mTsanftCY5pXXkG4A%2FVABOUmNJFjitVZmH2MvGs2jA95FJSi73tr9doVtZ1UK3lLFEBt4G%2BOIgj%2B8WerY86T0UiOzm9DgmawzGuyoPUjoAjTXDLqbLgHlRoedyKEcxYsJJJGJxv%2BAS8XgoIdfsXfr0aFoqnsToB0g%2BNhNTE61urPJRCJYu89bPw5WxxErI4gqHSbaFguSOy7LTCe65T0Q1Ht7umBSUkn07ugFWBQMxZKACZmECSvzj%2FmDXZsAhbjqjkwNUPGmyRKJ%2BMJvl784GOqUBI4DJGbL1AbE6QkwUXD%2BVNoNjo60Yu6McJAmUiW7RN2hjKd4aSVNQr0OMl%2B2CFET%2FtEQQEKFZuB6rRITe8x4bhCdsjPW9tt697TEopR%2F5eLFmd0EBS1QjeAzkpgPD7X2sI5FdWtYwHQFjVg8NxNgoeZVq8Ry6tKeuErA8AlPd%2B4%2Bpqs68N%2BGtt5obOxamscsx3gVQ%2FZIeWrlU%2B7ayLqhVfg5xCERV&X-Amz-Signature=7a210dd25706def5beb623fe03113c19390b7dd1a99745e3cf7d31baa0c03aa6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGFLW6TV%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T202002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDwG89wHjsziAJ6er0W2c1rZgFG0N3H0SUa9TZY9VLGcwIhAM7O4FVJYQpeY0k0OSXqeI98gOHXTEUH3l1OIeZ9KLffKv8DCGUQABoMNjM3NDIzMTgzODA1Igxhj3dkdYI9XHHMtM4q3APGDkwwBTQVvBkOt6Xv76nKYRgmlQxF7ymJJucyDt0F9%2Bur5pt3r3qodz2d8ujoTHtKg%2F5ERPJPI6yiSYkOPpDLmVji4bqRzdCLE9YQhBI6CdwsTQXXUu8pbCyNLRQXJxqC7iqIQIgg9UV8GSQJ19zxrhudv6PZGLgmsUFHC4gqPxf1q4LJwVLqN%2Faol4iFfvy3rAalRbjlmAspKtAOiBbcslxK11Dlej8F7RxIzVmH9TWqii2bsXhuja3uANMp8Xg6pzzm2Wfs1M%2FeSnYSlES5OiMXn53sDRGuNvAy9H8dhJBFd%2BQMeM%2BL8J4c06S5a7Dj0Hip%2Bilp5uSS8AxqbBrVdXb35gZbxm%2Fntx18l7MxOOKzTA%2BvC7baLob6xRHl4k20eG2ygrUnX8OsqF80qXEFoDxnIBwOBE8qRTextbjpGm16nG7Oc3MJFvotmSk%2F1t3wPCHx86sbfA7mr3KTsB1zW1CuvDKBYB821fhvHKJPxeCPB9LyT%2FcR7oD%2Bl%2FlDXXOJP%2BcYuy%2FbfnIlKM%2BwLO0YG9pXI%2F92%2Bm34h78EK1bE7G96oGWt48pCeACUfYnOkmcsLokyFIB3kcxP5Bb0lZ20%2BvDIiD1gxuLTf24HssVTNmxW2zOY71UHFx7gQzDj5e%2FOBjqkAVXwgZrx%2FczZ5B7EJIvWw01JMaTwB7%2F4A05CFwdMEbNATqTnVixjIbdMl7ycNQlAC4Hq2R7U3Z6VLAVKRB3WDV9ksV2lzy4zIpnBKkjMopFKXBZZrxpFtE%2BsZ3z463vnqshgVNpUbGhtazjzgFiXxiRgCI%2B68v3ttGWww7U1r8mGalYLUvdmxDuH1XRwKNqy73pm62JAJKlvFO0vbR4%2FZb21Y0aF&X-Amz-Signature=f31d4d731e8c5223bbfabae3cbe94748761e9f9e35eb6dfbf610f68c55c7d0c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667F4EYWNR%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T202004Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGbvh8FM%2F173C7TZeKZqchDtADpFoUR%2FA4btO4vYvIM%2FAiEAoHdYB8MwvQATWZcQzwxhiE7MKBLOXKEJ1LxkFMp%2FbYcq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDD0AZRHBm80HWTNNRyrcA2mycJEvbk%2B2p9opk3jVjWIBcmk80OlHbOIx98PxjdNAVw8Nx6O8hbytLJxLfcu39B7mJ%2FNlfwlAMlmuCkVNZv2MRkuVfxDlicSAVIgQkw1fWau2aYhVbEke3CoZb6UhpTtr%2FtwSmDUlzYWlFIBZe2O%2BDD2iA6F3G3NuxqdM4XTyqxXhuq1uIIq6abyHg4nHkQZXeH%2Fmm0Gg6hJL%2FVZSOMSBpp8ER424p2ICKxDhnO7w1zgh7dt8AKr3ma%2BRxs45l1EhbfSe1flxK29A2y817j1tX3iYgPrxlzS05GiJdLD5vp1I7%2Bk3y5GvAimHpNk4BG6e98UBp0QbdzlH3vqOAMhHBq9sdlje3PShyOoV3PWv%2Fo4EOKe%2BZ09Fe%2FSqeY%2FyfL1bK1N4HW9hB8%2FyMt070xE7ECn%2FLRDaWW69zBA4aNSouUbbo2A8r%2Bb47BYMlakZZ9p0kT4VCy4tyfqT8h5aXm6mLUbjG7SGOz%2B7G96SrzAxMHB6iJL7Q2oxFDuHeJPaSgXDz%2BVCeW9tIdqkrHTnjudIaq4uYRy3%2FVD1F3e5kSrxoUf%2BM0duShcpLfc92MXO4jswYCI3dC8vTp49xminEjOYOsM9xAeMGTtH%2BMWgfUgxoBvYYvUUh7XJFcyYMOjm784GOqUBO%2F9MzfId%2BvlavtgWsQCFjItq9xlodeW1rH15Vk%2BczgAk0zCtE9MSYyQTNjGrUiswU3XSU65zfjcjVhyckFaDtYKLqmoCT3ssGXPCeo%2F%2FVU%2B%2BUPAlWoUJdcaMwoCSA%2B4m1TuRyQdwFUbYuX3n0SShSvo0mzXakJJcxHyOzquvm%2FbsROXP8oUc4kb5mOIZag%2BQWVTjR%2Bk7DmOZ3WO6rDL3g3JXUrSl&X-Amz-Signature=391694aaea9c7b029c4251f239b6ab0b9091af8009c1106e5059ee0688cb6a52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XZ5LVZ5%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T202005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCm148rAsJgYeH5UXJuT4RmMDtUz%2FCPrIp1mik7DSjNWwIgJSmJBCwodB8fMLSdpo9Y%2FA46X2xPJ4tMhIpgPwddNIsq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDCy8ckC7XQ4FKveRICrcAxVO4w4zpNt8x43k5YjU1WOH9EKC1UST1XgAGzXVRtJ9VrBGxjd48MWsG20apTqyhpz3hpMPpT8qXPHGyJL4livR%2BHJY4ERrbtU%2FC6vLmug4otQ9A3Z7F4dXfMxKCbTQtmn1v3mC9rv6k%2FJsav3D8KgHCC8KQgGpbZHoEbJkG8%2BToAn5184Y6mN4NtAiylc6z9SyDeEQ4J81R8wH7vfE14xS78luRM8XCzO5W2JPbmMKEPV4h36VjcF4pwZDPodfA0l9v9EedyOtD1wrZR4N0rPORe19i9tP32xG2S%2BQAo34C5NktpF8Z2PnitgPMcO4fp0RK%2FQCEeOkuSDN3XwXpVNLfinVOVJ5JMUkq5VjiMv0ODld4AoMDQZQ%2Fg%2FjXRU8RcGIwMuBDalEGBe55QIKEwXpEQ0Mo5Tq3tAryB1MKIRntCraQMpgBb1yvMDNVBeqQX9JL88S2Eg4I5MNLa1qr30gs4ZeIX2cqbcv%2FLgnrtpQhe9YEkj%2BsAzswcY50EEMFJQriBmYZDqVnOEiCW6VO2UCI4eBgnwDd7U4gEkjCPHT1EsTZQDg4DiXUBrXTCl8eutM8VqSIXpPUpFZ6XjT6rpW3lrTJxy4dPMBcD6dbRrlUPUiqthxlCwFp1biMNTm784GOqUBweS2yaT0HGFLSy5ziw1b3JFQlkTsLqM22A4iNqToLc0baLhj%2F%2BG7vZa%2Bnl9NAG8QrtYDUqcPsJzPjccWktvb%2BFznX9uDohS0BsknHebbmphUwoAqIXkpcoyk%2BV4ZLDr7pUg2ITadXHAs7R1dJXNJhfTiSV9s9cRP7kngBkAahQSDlZ9Ympkdfs2ushJgeP%2F%2FfEtNE5YRIEnH60k7z55KTCpZZz8j&X-Amz-Signature=dec3342d40af7898cadd99d89f7cfc4daa9e1c7213f48c8b0632582cd6165e82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XZ5LVZ5%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T202005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCm148rAsJgYeH5UXJuT4RmMDtUz%2FCPrIp1mik7DSjNWwIgJSmJBCwodB8fMLSdpo9Y%2FA46X2xPJ4tMhIpgPwddNIsq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDCy8ckC7XQ4FKveRICrcAxVO4w4zpNt8x43k5YjU1WOH9EKC1UST1XgAGzXVRtJ9VrBGxjd48MWsG20apTqyhpz3hpMPpT8qXPHGyJL4livR%2BHJY4ERrbtU%2FC6vLmug4otQ9A3Z7F4dXfMxKCbTQtmn1v3mC9rv6k%2FJsav3D8KgHCC8KQgGpbZHoEbJkG8%2BToAn5184Y6mN4NtAiylc6z9SyDeEQ4J81R8wH7vfE14xS78luRM8XCzO5W2JPbmMKEPV4h36VjcF4pwZDPodfA0l9v9EedyOtD1wrZR4N0rPORe19i9tP32xG2S%2BQAo34C5NktpF8Z2PnitgPMcO4fp0RK%2FQCEeOkuSDN3XwXpVNLfinVOVJ5JMUkq5VjiMv0ODld4AoMDQZQ%2Fg%2FjXRU8RcGIwMuBDalEGBe55QIKEwXpEQ0Mo5Tq3tAryB1MKIRntCraQMpgBb1yvMDNVBeqQX9JL88S2Eg4I5MNLa1qr30gs4ZeIX2cqbcv%2FLgnrtpQhe9YEkj%2BsAzswcY50EEMFJQriBmYZDqVnOEiCW6VO2UCI4eBgnwDd7U4gEkjCPHT1EsTZQDg4DiXUBrXTCl8eutM8VqSIXpPUpFZ6XjT6rpW3lrTJxy4dPMBcD6dbRrlUPUiqthxlCwFp1biMNTm784GOqUBweS2yaT0HGFLSy5ziw1b3JFQlkTsLqM22A4iNqToLc0baLhj%2F%2BG7vZa%2Bnl9NAG8QrtYDUqcPsJzPjccWktvb%2BFznX9uDohS0BsknHebbmphUwoAqIXkpcoyk%2BV4ZLDr7pUg2ITadXHAs7R1dJXNJhfTiSV9s9cRP7kngBkAahQSDlZ9Ympkdfs2ushJgeP%2F%2FfEtNE5YRIEnH60k7z55KTCpZZz8j&X-Amz-Signature=81539bb8628030522d40de1835c4e279edeb3c7ea42fe5950b6b435a925f281e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664NXS56O%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T201956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF7Ih5WFu%2F5pskiaJ3fuiXoT%2F272trS%2BCy5UxyLL55LmAiEAtVoElC9pbR0lq0Vfz4xPmBIgGlobY0EbToZU4ZrarTYq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDHgwCKiHwmwEyNTfySrcAz3jD32f%2FIYVdlecy0XsZiDQdcQ%2FqfhM4UIeYX4oYgfmPTMHhwGiBRthHV6M60OzCYKxctv3qbbLP%2F7tf0f6md3PeTuku9qBxig2hhyCnE8SQTfSIa%2BkJiE9JmSYUdkDrPHA%2BYETfON9qpKpdIz3fa80OcJnm7pSDQeNW2HZ%2BMF%2F94vLDIdtdLD6l8XNDxCTTNS8sQfV4nIbSNWqSc9TnaL9impq5JtTsptievRNR%2BvVYMFaWHHqA87UAzTOUOBvm3jNZapa4YmGKyfRydr9tot2dVDm9JmMTdZgz%2FSQahe4yM5Zjf1NeNIlZLH30WMW607xap4DnGrf3tDJ5JdsvQzyNaaKX9Y%2BR0rjGl31APd%2FREcAd57iQ%2B9AIQy0smQ7YdunY2YECY34jV6T7%2B3qzm5kVqttUwXYj3XwF0ZSpK%2By1a%2FLRyjLou1JCSGtPo%2BYPrwBlpFJBV4tYkUU87IYTGokPdtX1HJVF3IUDbxuKADrpz3r2AdQtJG3%2FLPcBGZg62fCFU%2BM1BJTMVU36wgc%2B7x35tph9SybE5aPHezyO03mH434MzQX3rEFD3QzXkPHPOVedRLccYxB1%2BSaNCV3eUCksGG26FYNT6gqfZElEjgJi9wwvyHWLUm%2BS%2Bx3MJvn784GOqUBVwIbTPEMBU1akcNVyPfCalQD17fTcintDjAZBcNobn4qw2Wpz6qc26wQzrgalNKqxwvt00WlTFDeDoJvsCDwg3ef0UVyU%2FNfoQ4vEI1kze1wnhBogmwnw804LSuPGIS2ZRWTE6pJgy1g3CEAZmAK%2BGgmHhE51EAt9rMla0yc%2FwI1k71Ayd%2BfdLItVpToV1zg54I%2BRrDph%2FOmFNg50BBzcCWd2DXF&X-Amz-Signature=c98dff2085e220d79fc53adfa0bbccad0bcd7dfa1595949864bb8ea91dc79876&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7M3JUB4%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T202006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHgPquyj20NtkHXr26ddnKsD443jyHMATQoqUELQRQAsAiA6RsMBM8%2FDNKTbLKWVgY9rJ6dlqGMtw%2FJc42xCs3nTqCr%2FAwhlEAAaDDYzNzQyMzE4MzgwNSIMRwvlvDKRku8smEv9KtwD8cchm8NNQzBJ4nr4V%2F9cCH7Kpn2daZoNNnkQe%2F0bhPNxWT3uLxh3AQaDqGgNgRwXrinQlMjZy6%2BHAGBjRhLGtBY3f7CwWY%2BOpcDgt4e7hIhQ9AgH8knX0PZW6sQzDp5Pezg8n73ifpR12SQvpROdlLuV3WtP9cnT8WrQUFIjFDK9M8N0roiHxlJNKe95rtmGS2d%2FDNLFJB0Ctb71YDlzCf7JrAPQN3pKJ2%2BHbaLmUJhUT8E1x2Z8FavESeiQ2hzOux%2BqDhNuOoTKywwYtwWgJe6hTLZ%2Bxh0MEVjygfyVSy1IgrLeyDxLSRojl%2FBYEAGuuBqyY24Yitw%2FkfeL39rHuN9%2F3JjF9W5Lf5xoGiKMMRS7RLJQ1QdZcFL7HcB2S%2F%2F67BJxt0aOJhKD55Q%2Fci2hjeAMDTk2lVtypTHBthBOfVUH1xix1MqgxsC%2FHXaCKmb%2FN5gASQZxbl2DfJJrdTy9PzrEFUFeCDzU7vgfswq%2BPuwnTjn1Ns%2Bayr3vRw4zEMqRWns2Y1is2K1vN7FQO94krtqHWNXJru0dR8rpgeNxsVxmHuub6DPXdIfSvQaipEIny22r6Ka%2FsIJZSGlK%2BhZegR3dcdGeI9NqWF%2FdpPE8vG%2B151ScFFaDlExTUHgwkeXvzgY6pgGONTU1EiiqTeBOf4%2Fhv7U7AztkThhp016pC45oivcqpVdGpIflaNV%2BFCT9j7GSG9ksCvWKFBaH6hFYFVNufJAjaa5ffrEn9VhQHYdCHWoYR5Om4ShPpmGvxGpp50%2F9IGX7g5rNp6ZfTL%2FRoVepugYABb%2FO8ONbW%2FOoIIDJGMOmw94ClbJhCGbPC2EYMzYzIE0McjGsrl3TjLIAY%2F1KvKDe0LUxb8y9&X-Amz-Signature=8a4ce0f8337d531c7651e4f1dae0b890a03e92bc750abbb78d56011953dc99b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7M3JUB4%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T202006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHgPquyj20NtkHXr26ddnKsD443jyHMATQoqUELQRQAsAiA6RsMBM8%2FDNKTbLKWVgY9rJ6dlqGMtw%2FJc42xCs3nTqCr%2FAwhlEAAaDDYzNzQyMzE4MzgwNSIMRwvlvDKRku8smEv9KtwD8cchm8NNQzBJ4nr4V%2F9cCH7Kpn2daZoNNnkQe%2F0bhPNxWT3uLxh3AQaDqGgNgRwXrinQlMjZy6%2BHAGBjRhLGtBY3f7CwWY%2BOpcDgt4e7hIhQ9AgH8knX0PZW6sQzDp5Pezg8n73ifpR12SQvpROdlLuV3WtP9cnT8WrQUFIjFDK9M8N0roiHxlJNKe95rtmGS2d%2FDNLFJB0Ctb71YDlzCf7JrAPQN3pKJ2%2BHbaLmUJhUT8E1x2Z8FavESeiQ2hzOux%2BqDhNuOoTKywwYtwWgJe6hTLZ%2Bxh0MEVjygfyVSy1IgrLeyDxLSRojl%2FBYEAGuuBqyY24Yitw%2FkfeL39rHuN9%2F3JjF9W5Lf5xoGiKMMRS7RLJQ1QdZcFL7HcB2S%2F%2F67BJxt0aOJhKD55Q%2Fci2hjeAMDTk2lVtypTHBthBOfVUH1xix1MqgxsC%2FHXaCKmb%2FN5gASQZxbl2DfJJrdTy9PzrEFUFeCDzU7vgfswq%2BPuwnTjn1Ns%2Bayr3vRw4zEMqRWns2Y1is2K1vN7FQO94krtqHWNXJru0dR8rpgeNxsVxmHuub6DPXdIfSvQaipEIny22r6Ka%2FsIJZSGlK%2BhZegR3dcdGeI9NqWF%2FdpPE8vG%2B151ScFFaDlExTUHgwkeXvzgY6pgGONTU1EiiqTeBOf4%2Fhv7U7AztkThhp016pC45oivcqpVdGpIflaNV%2BFCT9j7GSG9ksCvWKFBaH6hFYFVNufJAjaa5ffrEn9VhQHYdCHWoYR5Om4ShPpmGvxGpp50%2F9IGX7g5rNp6ZfTL%2FRoVepugYABb%2FO8ONbW%2FOoIIDJGMOmw94ClbJhCGbPC2EYMzYzIE0McjGsrl3TjLIAY%2F1KvKDe0LUxb8y9&X-Amz-Signature=8a4ce0f8337d531c7651e4f1dae0b890a03e92bc750abbb78d56011953dc99b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q643CNGO%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T202007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB11AKGpYsiGMN8m531NWCipeOFAU6o4tTZJlFVoRAdqAiAWdmzX17NEQM9x3Mnt6CU3il5VaVaaFpygJ7soJiL%2FhSr%2FAwhlEAAaDDYzNzQyMzE4MzgwNSIMKu1a2viBND31YVhjKtwDQwNcc818M9%2FnmyVBIwx7xSsk5pKK9VLEONz7Rjp%2FxWqd4o8TzW7tvRhy4H%2F9ikd1tk%2BOptxD6V9Cvo6whRSBQx%2BJz8aB%2ByifFrbPO0GhtikhwwAqCoHVOZKkxvsExlU%2FOr9NYE7pt%2F6VX5Y9CMntV%2FdnWHCeycIrwsXL2p5HWf%2BpD5NZMT5%2B%2F%2FW99SQhGb1HT%2F36MVRSTKWMmkNL45yRgi7%2BJOwRrZ3ZjIhbBV6i8tgpXFn8uDwlmqKqg97wm7vXafSNMlzbBS%2BtZHyc%2BUgcln2xN30VJMrk3PwjaoMi31UYFrQfJQIhwxOUmx%2FyPHnOgYdrljMNZfDfqa4BBiFNz3TxPV30YoM5ajym9EnddnvjgPiizvmLb08qpRwgHz%2BJQ6Lq79TxyzdQXfp7%2BdHeFCKvm8WpaPD1X1px34Pmv8G32WMWQ%2FBFQjbcT2tE2ZGEx1bbEk8cjewwwQtzVRMRbkHegBRVhxcZD1%2B%2FTmytMt7mnjlhi%2B%2BO17Wj2nmcRfhIQCuIH1qn6Qz%2FYv97ntKmM%2BEpLwbwpK3%2FK4rcGfRAJp%2Bw3Ej2dRGihyLMhNbotdVnt1mgn0XiNxqzAEmNM%2FcVXEf7yJzFtPaXXXyTiNXbnDZ1fGWIizZ8SnaFNeYwkeXvzgY6pgEl9NkWBoU4a%2BxUh9LctO5FkIIWcOuiC0VVK8j3hiSQiFy3gnnvv%2B9ZbZ1ueHpK9vqCMGTV0rjO6c9wBzBVZ6exAPCGp3HuGsn9C%2BST4lu2LrDTNM6m%2FjmF1iR3PfCaBfNsYrLP2S%2F%2FLzyi4n3zKQ7WMYYc1qD7nmKODBwaqKF72uJrl9OGLVjCsXkUT8JYX1HDppgWX%2BHKJ5XMfcn7YVwt2BzXwPn2&X-Amz-Signature=66803a594c3f62404cb16837afd2ecc63409e3472add2d02ed88414ee4e0c608&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

