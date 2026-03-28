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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MDK24CQ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIALzCbxUQMGRzO1reD0pNuHy34zJcSK%2FEwV5a3Axjf%2BMAiBz1EZ4%2BqwkiHrpwbj0DvRcbXyJh6D5CForlcNd1FqdhSqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrFevI%2B9T92ygCxVRKtwDGrknpauwkuWjZ9SRXMidYVm05QWoAq9cxjoJ5LCp87he0UdPyWctj%2BfVP0%2BYHwHIKFUN2wvldrbvMeJhrVYqEZ%2FqeBjChz42fKdlvKWWeldEa3jfFMTpxfFl2AiS5%2B5uPiwscLmXI6zZxciUP3JSQgY%2F4cmU5Y30eHJ9i5m3lmvnzSN8FJs9olGEmq1RZZRhtfG7ggm101s9K5H2l7SN9MEzrwR5wHnVYp6fwCKU8DVNCqTAk%2FvkyxRfsrE7cS7uX%2Fce3SrsR0%2Ftj4nbs5Tsp4ur%2BirEO03dhk9gIYLQuIImmWIEaqFd0AysHZcIKlpZvzGd4%2FemELT796n%2Bj4sKsjkgBRX9%2BDaozTj0mZQIK6vD0VnXpNrJYpnihmSS9u%2BQgmVarGBN6pTNbLOplh52ZC9KMvNrEB6LuYj8ajh3s9L%2BkHMcWzHMCwRLsMmklSAIckZrFhEy%2BIJ7mdfcT2iBrS%2Bc%2Bsq%2BfNbDXEYSucYh%2FxBMwqBtsNVVseyw8pTAHCJAedFIvBAnz7wlSirXF9pOM2g53LfPK9iTwqFJQQku%2FlqdkkPhRbbt9DCjcU9Cx0Y1NXYV5NYeDig2cfesZ5aekcBX3h%2F%2F2yjAdCJ54enhmNsBaD0mFqKiZjFMMikwnL2fzgY6pgEPWFj3vWCY11NgW%2F63DLN7seWGyJsfvFiQlmvqwzGsJm0408GaweeRcNhLodmswu2OQW1Um5bYTHOZK%2FZrij1X6VnwUBvRq%2FFjFbpp9S9Zk9LZojDsvdhps8DFcpsQA5KmnNKDIX2oYC7d%2Fg0S0P3L3nTT4%2Buvzvu3haEum5a49A5SoeOc4v7B8M3GYZmZh6BEEAAFbUtcD81p4PUkqoZcZlmK3y%2FL&X-Amz-Signature=1dd825fead42652e525f47c06befde3a1a4b81c9984d319b52bdd1650a35e8ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MDK24CQ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIALzCbxUQMGRzO1reD0pNuHy34zJcSK%2FEwV5a3Axjf%2BMAiBz1EZ4%2BqwkiHrpwbj0DvRcbXyJh6D5CForlcNd1FqdhSqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrFevI%2B9T92ygCxVRKtwDGrknpauwkuWjZ9SRXMidYVm05QWoAq9cxjoJ5LCp87he0UdPyWctj%2BfVP0%2BYHwHIKFUN2wvldrbvMeJhrVYqEZ%2FqeBjChz42fKdlvKWWeldEa3jfFMTpxfFl2AiS5%2B5uPiwscLmXI6zZxciUP3JSQgY%2F4cmU5Y30eHJ9i5m3lmvnzSN8FJs9olGEmq1RZZRhtfG7ggm101s9K5H2l7SN9MEzrwR5wHnVYp6fwCKU8DVNCqTAk%2FvkyxRfsrE7cS7uX%2Fce3SrsR0%2Ftj4nbs5Tsp4ur%2BirEO03dhk9gIYLQuIImmWIEaqFd0AysHZcIKlpZvzGd4%2FemELT796n%2Bj4sKsjkgBRX9%2BDaozTj0mZQIK6vD0VnXpNrJYpnihmSS9u%2BQgmVarGBN6pTNbLOplh52ZC9KMvNrEB6LuYj8ajh3s9L%2BkHMcWzHMCwRLsMmklSAIckZrFhEy%2BIJ7mdfcT2iBrS%2Bc%2Bsq%2BfNbDXEYSucYh%2FxBMwqBtsNVVseyw8pTAHCJAedFIvBAnz7wlSirXF9pOM2g53LfPK9iTwqFJQQku%2FlqdkkPhRbbt9DCjcU9Cx0Y1NXYV5NYeDig2cfesZ5aekcBX3h%2F%2F2yjAdCJ54enhmNsBaD0mFqKiZjFMMikwnL2fzgY6pgEPWFj3vWCY11NgW%2F63DLN7seWGyJsfvFiQlmvqwzGsJm0408GaweeRcNhLodmswu2OQW1Um5bYTHOZK%2FZrij1X6VnwUBvRq%2FFjFbpp9S9Zk9LZojDsvdhps8DFcpsQA5KmnNKDIX2oYC7d%2Fg0S0P3L3nTT4%2Buvzvu3haEum5a49A5SoeOc4v7B8M3GYZmZh6BEEAAFbUtcD81p4PUkqoZcZlmK3y%2FL&X-Amz-Signature=1dd825fead42652e525f47c06befde3a1a4b81c9984d319b52bdd1650a35e8ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OMRXRFV%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQCr%2FNXtd5KM2PJkiseFnqOc83qcB8Ipge2kqITL4kxaLQIgQgBF%2FMdFr8PMJhweJ1G0AWsbjbZ%2FTbKTIBOCpTndLlMqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI40QXOMAEVSNjb3MCrcA1bP9mGS3Xc9kcRZDAEmP4ekcM0rJaybG%2FkPBttKuN0DT6X9ITeZI7rUCBewxR8NSjDxYz2w9IfhpgWHfhiF%2BUq8RU591s6fHFyjUgmPf8jCWqmGwQT7yPgYIyHTK1MVfZV%2BvOUfVv%2FpjTGpcY1QbbHK6tp02qnjn%2BK3y3DJ%2FKFCtMHLSDdVMyNlOm4JtYref2R0XwATHCZRdCWCUXaJSqoOw6KgI5ZaUCPrhz%2BQas0wzsQCZ22BTD1whR6qk98oREdqJQrFN6ytknrSwQIlmlJSkaE7senIMmAsUECV0QHC1sL%2FFD44ZAL%2FMOu36miOyYKswm1JDvUBiR2OxQ%2BwH1H61CsGms6wbv%2Fyl854D7B6EWEXYKAqx5oectUUyI1noHGGHDeQZN7i9siOZijyHDZKDb24mLBVgMfLsX1%2BQ7gFL36Ha7GGQzvl3T0DxxYa8YPFPROyJmtCqyeR3ULAUJ1DKnJrtpUSq3fuM0omS5pFvsnO1ic4DHyyHkzU5n3MKlucIKEBXlNDrD8YryVueapLVYVkNQmCSGLD58N0ydS7wmhJC%2FOaFzcenTWIf60EjLCD5AhpFw7MSNLX22lp8Z2ZVpeVSzgungphLM2kIC%2BOAa9lP%2BqWq231PW4MMIK9n84GOqUBL4L6fLHsSBUwiTDPlxC3sPF93%2FGmo26IwqgibTDlBUyqLfm1B9D9ylv977b2oycifRHB2%2F8XTI97AFDONEATQbFAUsNhhv8lThdSKNzNzRx%2F8IaoalcIjVrCISG8OW3wUii2nKdB%2Bxocx%2FCxb79PoZxmjpvbOYw8GtgpLwppOlvnIdwJel9GUQowno4Gg%2FLLsPWJQ2RYXQrwbvgk%2FCae5cEQBtBt&X-Amz-Signature=d4071fec13ef3d0cce4e7c40cb8942c782758eaaa9f4f3e4cc3d504830f26ecf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PC5TTW5%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCICoLP5z0AF7pNX6SvEFwttcXo3Qimf9%2BgL2AT5dzsGTUAiBYYnU9R%2B%2Fq%2Fr%2FjfbPTiiH7mULNJ%2FmnHa0zbbfuVUmK3yqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbDeCr5lLMpi1jUtYKtwDoDEJWLK%2FnMjrQNiG3EfLSzR4G2yVUVqWDI1vJcy%2BmxnS3KGPKWB7KIcq%2BvfjueYPkV%2BjE0qKwQa9GeyMcWVoJ21aJ%2BfiEQAUHNtk8PTuWFgizxW7q25%2Fm4N2bc604FLSYoARy9Kq1z3BdGUU5t1zsJfOM4PWlmBJDtdxSPESxaR0spOGcJfVHSh07P%2BKTKJr85Sp5wlPRq47YD6RXOqQ8jk09J3H5G3ShuiMm7JZ7%2FQoLOEk76W9hz%2BVwfiwZR95mII1Xrdf%2BJgjZrpoZM4nc%2FBWanOQK9uvJToLtYvNcB0SzqPvtgIte8wK2dlHZwmzd1hTpBo%2FZp%2Br8Fsgh63ELwPfOhhV6loMIUV56%2BScpNdpaRkSoRDLJdPUC8McC4mkYuwWq18VzLW2oimIcqDgkRPePE4W2QLRjI8V9BDG23isjMRk4kpTHPjIpsSNdBfcS7axRRyqwSU%2BL3H%2FOnyoUaT765N4GkfVK04hEA8b5j28sC5wWA%2BUxYzU58YMokuXwyK78tZlhp9Hy5WMi%2BrKfF%2F4ar%2F9qC8qWmTbmyhUUys0Gxyt4z6kW5%2By3OkNAuCwpwVTNsf6AjTm%2BKRt9%2BkMEpp2f1O%2FBht%2B3AdmKCtGRoJndt8yABIcU5uwSgwwvb2fzgY6pgHsWEROxzMHgyZjqAC4P2Bj2IsObIcggDqTFIAXn%2BT2dVfnEJIWT9xZjqA8M7kHPZCo0jE27FLxENEKqsINwQ7n5njVDzehZK1N7crwhwysOwUIuUv1qHQ%2BWpQqxSabi9rfIsbbCGmP%2BnHz3F28xgtEkH168LdItbyWEWB9SeCjNWiaj4TZIXQt6QguxcK9H4P1IHVt36rQeKPsZA3MNIMWsvMlti%2Fm&X-Amz-Signature=64d0bc7806fadb27bd36e75a830f4747b79eea36a17fd702f3c20c5305864075&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PC5TTW5%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCICoLP5z0AF7pNX6SvEFwttcXo3Qimf9%2BgL2AT5dzsGTUAiBYYnU9R%2B%2Fq%2Fr%2FjfbPTiiH7mULNJ%2FmnHa0zbbfuVUmK3yqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbDeCr5lLMpi1jUtYKtwDoDEJWLK%2FnMjrQNiG3EfLSzR4G2yVUVqWDI1vJcy%2BmxnS3KGPKWB7KIcq%2BvfjueYPkV%2BjE0qKwQa9GeyMcWVoJ21aJ%2BfiEQAUHNtk8PTuWFgizxW7q25%2Fm4N2bc604FLSYoARy9Kq1z3BdGUU5t1zsJfOM4PWlmBJDtdxSPESxaR0spOGcJfVHSh07P%2BKTKJr85Sp5wlPRq47YD6RXOqQ8jk09J3H5G3ShuiMm7JZ7%2FQoLOEk76W9hz%2BVwfiwZR95mII1Xrdf%2BJgjZrpoZM4nc%2FBWanOQK9uvJToLtYvNcB0SzqPvtgIte8wK2dlHZwmzd1hTpBo%2FZp%2Br8Fsgh63ELwPfOhhV6loMIUV56%2BScpNdpaRkSoRDLJdPUC8McC4mkYuwWq18VzLW2oimIcqDgkRPePE4W2QLRjI8V9BDG23isjMRk4kpTHPjIpsSNdBfcS7axRRyqwSU%2BL3H%2FOnyoUaT765N4GkfVK04hEA8b5j28sC5wWA%2BUxYzU58YMokuXwyK78tZlhp9Hy5WMi%2BrKfF%2F4ar%2F9qC8qWmTbmyhUUys0Gxyt4z6kW5%2By3OkNAuCwpwVTNsf6AjTm%2BKRt9%2BkMEpp2f1O%2FBht%2B3AdmKCtGRoJndt8yABIcU5uwSgwwvb2fzgY6pgHsWEROxzMHgyZjqAC4P2Bj2IsObIcggDqTFIAXn%2BT2dVfnEJIWT9xZjqA8M7kHPZCo0jE27FLxENEKqsINwQ7n5njVDzehZK1N7crwhwysOwUIuUv1qHQ%2BWpQqxSabi9rfIsbbCGmP%2BnHz3F28xgtEkH168LdItbyWEWB9SeCjNWiaj4TZIXQt6QguxcK9H4P1IHVt36rQeKPsZA3MNIMWsvMlti%2Fm&X-Amz-Signature=d6c443896c76c5b9f61559d14e91a6d54fee71dfc81bab477b23ff217737419c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XLECM2W%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCIFSAtPjTYq7bOwajzKySV9jeCGzVafPJlNMu7Sj%2BbNUeAiBbL90xjTDGtB5PDMid4cdvt8YA2U%2FWcULZRk%2FFhwtlUCqIBAj5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMCUVg7lmLAa72LTS3KtwDvIvVV5VN%2BaOoBzjGYkyyNoFlbatsC26vbhA3U7AtT%2Bq2OrVUvZqz7b0BuMSLbj%2BgF8HzIxf7owiH3BXVSFWxQnDwpGWyAb8CYdbqNl986oXP76lMh5aHl8X2aiD7z8a%2FFDQ5Mux46iS4sBG3tAbVt2YH%2BoOgBnQmgmoD9BtedxxqVhxsm0cp61gcRTd6jXi%2FGpJ4W5pBlJBiDy2PV3a8OWkb6AvZVg7GSA2oSCc25RXH7TuhJoXAzZvvK3Y5zm7zrTamOcoCe8lkfHFNzgEUhxT9bofHJuWTPI%2BWl%2BDeFglLugY2TzjWZ45GSrUY6R6jVrNgZiAr%2Bkk91kraoe1rrfSANy3m8oAPxBUph7qaUvQZYOVwGUGUBWgWZSbIZvdy9D1oG6ijWGFsAzxjiUrEsFisIzHeRoPy8wa%2FtZve0qJ6KV53ypcEu8wYGyWnUJN3XANitFXIWelJYtQwdoykaWRFJOeIh5QECxhfSc6NHiZUGRkOTPhobKWr8m0PuE8yUI6EyRrVq8o5fZhh6oeAnF3bn4vvZ5Fat96hQ7PewYpSxbuU3ylCMfZoRse7s%2F%2FxxkrH2v7qtpZ5WZLX%2BmLGiZOMbQz7SioLLE4bbTcw2DKfv3rgytwCBCAOqJIw5PifzgY6pgHtmUrUoOBhXeHws07bJLZq4qHSJ2jxDHhDzVkSLoHJ1RzJMLPeA%2BgGojwlVR1p3E5RqWQFZOXj4Ykr1vTZlejhLazs13Ht9o2PSGI8ipoY3Y0O0b45U8G710DwrrSwIhM2BRFY1wUl6kMm0FbnnSm6K8%2FLS30nYDK3PL%2FsW%2BItnZlicjGxOg0aCa1LbI%2BuvnlqiRrBjcksWPgMZea3yrNVUCrGvtA8&X-Amz-Signature=e66e61610db307763f14575ff2280e14a8ef5d4ac8d0ec983f9b85a07f1d9d52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQFT4QXX%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDSY0JRpU9v90K9BGGre0HV3oJgqxUrnx3hkxZnTkXejwIhAL1oxggUjTAaHNdvOUsN8JozlImxDQPnwFw%2BJRs8SyncKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzeYCrt1huQf1RKoNsq3ANtdXZhp%2BuhIYyA6DwXldXPeA4A%2BfjDK8HLSv2jBc5KREvFETS%2BgL4%2BeZTqa0E5bQ4dkvHc849d6L3ISXaqnhu%2BPBdo%2BLPM1c%2FllXaqaOB2Ci58g2LmS81umqxXM6Dw9sY8NSwMlwi8eeQpmo5UfhFxJj%2BuVsAKef9yG3%2BIwdLq2QosTtf0puqbcgNbPFU%2B0ndMSkHSHX9RTQawBLuGhkD4IhA1EB2Yyl3zjk2fbodn9Rrh%2BBwGp3NVc%2F1ChCrvZA1gU2UxU0PoVS6Fn0Z4jEsWTy3GgnyRhVx2HMZjl%2Fjc%2F88By2uY0hrlvzt3JPKYpwvpPJI553DuanN6GdDK6nOFZJ6Au%2F3Sm7FpXR34Sg8xLMyygMUaren1UxNlCb7zOuboqcQOb%2FyVfuY2RPh0gBTf%2BNcNTRKlO1wgKk98FyMd%2BXVsM%2FHBmfprLKhAcjFyYJjnOyzreCZvPPla5LGpULlKfO851De9Eu%2BAvpyk0ZQCMCh3kaks3T0fAHKeX52YuNLIwM80Gy%2F5%2BWUji2mj0QvEU9cIdk9hv5zKKFS7%2Bwds1A%2BASuS9ZllHQB%2FUk2vgAQHdaxL1oS%2F4sRfSC4ZM3DEjaGsY3uEEiMagKKzbSVjzDUQYP%2BffL3%2FboYe3WTD26J%2FOBjqkAcq2fADEiqCk%2Bxm0v1KgQJw8T2dW1E8LPjJo4WrZezQUWkONmA5uK7Kk%2FYdL2fjyI9f4OMOg9nmrtJQjkMsGi6KVK%2FsVkR7dfEJRjGf33w6QsuFKd1ldLQPyonM6fWHZ1UwXbXm%2FVKK1oaqdV3618lIj2h9J2iK%2F70BteAA2TlGjv2wn8Sr%2BpNbQMxe99FiB%2Fgsovvwutd%2F8DhRrKkexnZsiZ8oT&X-Amz-Signature=f2a386f253289bb35c7d2eb146b93b9f318990f908bd2a9bef96dde632c163c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QXUZVZM%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDEH1WjrTjlCGIRv20y2N8wJhFmFQ%2FwTVtYbkVn%2FW9jRQIgCOox6SjZw9FsErBMSoQJiyFw4%2FK9VB9gnxLXNjXckC0qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGgxRfPePuDxabqV%2ByrcAxO%2BLzDlVpm42TKWldIX2Ieap1puellUL6kE2vG%2BUKDlbNeNaQLAvXfSDo2C52A8QXzIe1iq8nxd9WqbpsShBwPZf%2FLc7T30aMJqUa5U3tUcyynnY3sxCAHhHQPfTsSOu9D7Tj5i1ijg%2BFiQWaXxc0%2FQV%2BIGydQtw4PaQYRaxAELEZ6p12gTYCVJ%2BolCgFIvwWCz8k2y1v7I6OEy66svFqgRv8zuuQsMoAL6YBIl7YEAswwQuYtTaA2HYpFyGyoIqbURDPZUPuDRV2yPoMCdfibjlvPSIi8752x4%2BWp51zump8qlqgvzKUcFoNnGhYVpPJxTWwCTMYMVNQunvNly38jUtzV%2FTO81P4Savl8zv%2BB9QgcpIuQAb0kuTu%2FgH0NdLxTIz6huZK1DYKiG%2B1dC9OeDCJeMAklscjcl5VZlOeSmScuKZymuBjSLnN5dyTqIEJw1UAXxOlzVwLai3NY9lKlK1LLexSeNpBKTp9EFjeMrS37sZAIaAo2et3tUh9tnXKHRV%2F74mxsthuDj9ppqGJS6dA%2BF9ZCbrmb3Ea0FX6XWXyW1X3dQJnA%2FeTfXF212RCk3HEcO9Op0yq%2Fx%2BcfD4GFv7%2FPxmGLb%2FkXS5QSw5RWRnUL0%2BI5o0usPfFIKMKS8n84GOqUBaSfI0D0aah53v95e9IQj3Gp5jcEorFBpIwp2b%2BlqTK%2Fk5k1HSczqF6GIqCe99u7n7NxnOVEWHrfaERzYkNZvduA%2FpaBzoAPaU2lHThOQtEZvF3GVXmTLnHUi7Acu9uJf0Gfss%2FvSGIeZBXr4YrFr78IU7w5iuGw3FJUNjARTG0bL3sc2Bb4WM5G8oAIofjUSu28fS3BjuKeIzFxhQpI4s6L3o%2FTm&X-Amz-Signature=748f1110bfca6162f3170dc75ac28a83eae0fe3622c15c5975a575ffa19c68ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXIHDYKL%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIDQH99Sg3GQmg0J%2BMlbZWt4M0EuXtwG3qUv023NTxTG%2FAiEA3n0qqea1m6qfx%2BHQvCCGuFMtv9acOr2ZBFoWaUg7j%2FEqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBlFxShsUOj9FsEk%2BircA2PllpNE9bqIuvZt33WccdO9XcmWfKFFJv4kGYe%2BkEc%2FQeQpWCTVhLvemcxmKSN3jzk6yTY%2FmfJMg3dg6xaJa9em0yUp%2BJrdS6wWsczIaGjK%2FMZd%2BN9glN6CtOh5HmxGWSV6OFUxIXJixzIIMMCSrwUNtezgJwp3VPGlQEx9MNeeClloLsiroJNKHzGBc41BvsbifDyp%2Fsarh1EX0ThITndYohF620Mxiy3Ej%2FrrLHhA2DcTISdQImONH4ZKTA6tiOPU5fbYAZcUzT2C%2F1Yu7xHoI5LPAfeH%2FuWjbw9UD3PAhF5Ds49Qcr8A9xLYc41%2BOqIzV3xXDHebIez6cXAUwsSEFq1cMNnQ13tEscTZ6mVrMCqTcKplWAybgQIi7GANci1%2F92WzyLwg49L20yx8Cz4Aen%2BNvuZJyWXTE5XgbO9MwjLjqqcOX4n0KGqHvpfmiPXBgvedQII02QijJwjP6%2BW93pRDxuN2Y0al19Us0U25E1bL9Mn0rLYUI%2F2ERraGEIOD3jihZsD3XFnni%2BUb8LDrak%2Bt0Z%2FUvzhTEEv%2BDxXaEZmfY2I%2BjF2cW1j0Xryb9WLDtZhuCTP6evj1KmeN6ImkEUPuwvFuyZciA5%2BsDLoiUxy0jDh7IxGHubaFMJW9n84GOqUBniDVEpLGIyBToMt82H3WFv4jgMmP5GAwdA%2FEpzkARKWF9E80yYWYMhha3w%2B2n360f5UXwBAuI6nhF7HUbouD91gVTuJ6d7kRWnAFXU6ihXSrr10NZgg1i1mfOm734w9Byqx1lVdE530FntZiv00IP6dTfLcE77UOOC6%2BJ6tEyJ81D%2FmkR4PQdXMfphz28pwUegT1aSPJftBXJki09W08FOqigP6V&X-Amz-Signature=5ba49d09839d10683e702a5cfda4baf4c65481b0097b56646937eee123e129f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXIHDYKL%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIDQH99Sg3GQmg0J%2BMlbZWt4M0EuXtwG3qUv023NTxTG%2FAiEA3n0qqea1m6qfx%2BHQvCCGuFMtv9acOr2ZBFoWaUg7j%2FEqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBlFxShsUOj9FsEk%2BircA2PllpNE9bqIuvZt33WccdO9XcmWfKFFJv4kGYe%2BkEc%2FQeQpWCTVhLvemcxmKSN3jzk6yTY%2FmfJMg3dg6xaJa9em0yUp%2BJrdS6wWsczIaGjK%2FMZd%2BN9glN6CtOh5HmxGWSV6OFUxIXJixzIIMMCSrwUNtezgJwp3VPGlQEx9MNeeClloLsiroJNKHzGBc41BvsbifDyp%2Fsarh1EX0ThITndYohF620Mxiy3Ej%2FrrLHhA2DcTISdQImONH4ZKTA6tiOPU5fbYAZcUzT2C%2F1Yu7xHoI5LPAfeH%2FuWjbw9UD3PAhF5Ds49Qcr8A9xLYc41%2BOqIzV3xXDHebIez6cXAUwsSEFq1cMNnQ13tEscTZ6mVrMCqTcKplWAybgQIi7GANci1%2F92WzyLwg49L20yx8Cz4Aen%2BNvuZJyWXTE5XgbO9MwjLjqqcOX4n0KGqHvpfmiPXBgvedQII02QijJwjP6%2BW93pRDxuN2Y0al19Us0U25E1bL9Mn0rLYUI%2F2ERraGEIOD3jihZsD3XFnni%2BUb8LDrak%2Bt0Z%2FUvzhTEEv%2BDxXaEZmfY2I%2BjF2cW1j0Xryb9WLDtZhuCTP6evj1KmeN6ImkEUPuwvFuyZciA5%2BsDLoiUxy0jDh7IxGHubaFMJW9n84GOqUBniDVEpLGIyBToMt82H3WFv4jgMmP5GAwdA%2FEpzkARKWF9E80yYWYMhha3w%2B2n360f5UXwBAuI6nhF7HUbouD91gVTuJ6d7kRWnAFXU6ihXSrr10NZgg1i1mfOm734w9Byqx1lVdE530FntZiv00IP6dTfLcE77UOOC6%2BJ6tEyJ81D%2FmkR4PQdXMfphz28pwUegT1aSPJftBXJki09W08FOqigP6V&X-Amz-Signature=c23c188f60a214aad600dbf28389ef04090623111b6e9298fe87d24153f6ce0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNUCZNUX%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDOjyjRR4AQuNSqf97Gm64vheea%2Fv9PJeyef0BXLKLF3QIgKpjX02a7XVZ056nAl9Ozq5uQ2%2FSzJW0QqFcmflU03G8qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE02hGpFkO4o72MBgCrcA5PDq2JP8DtCK0%2BeojtXQ1wgn5K5NnB2daoh9wnlRgTaVlACXJ0Y5P7wjsRypfaj0y%2Fxr0DSOXYe9x7n2Qfuuphkb9Sr%2BX1Du%2BpXwWWZC6iDgBSJVujePelOCKEsjToZBjGzvNPX2XHN96gjaq9%2Ftp%2BfEjmJueW3sHTUuOBOop9nMkxR8sdkLuc3IlBxsUXSzlzco1%2FjpWekd1ShaTmjr8marNQ%2BTqmWF%2F7XBUd9VISFgqh3ZknSABJdaUOEePJ89o8pB2sjcuaZEeQqJsjZCsM0RjHpiDtrbVq%2BPQXWkKDr8BDOTzW0TjYuC8GHV71CCVse%2Fjju9ZTM75b2QXk3uWv3dTjOdyLKdHBobO2MH2KO%2FfqIi95AVj9Ox6lX7Vbatw%2FSzSNEy2ueTNRZHNuJyX%2Bu5eBUucFXEUN3u92%2BWXblGOTpGmvZXAWHkQfB6lwD9Am6xMDt4RFuday7OHzMARWqPgbT87qdeG0BCPAgNbTcq9fWm4pX%2F0l0%2BV1NBezB6l4sT3ZPeqUaOiZOzqgwBjjVk5cK2GTPJ5Puse1fyyqCdPiEB4TeMItjcDrMtB%2BAA48nXB%2F3MSZtnlR0G4FvbXXBYZ%2FnslivyVXZ5J%2FA3GN6y1R88vBZdkm90m8MMPC8n84GOqUB6RFDkqZEtxhPxeSRdlEEA91S5rxAgQglT8DAJEvWwlE7Fk4C1%2B1RPCap1g19NniUzc7zjQ4IlA%2BKwZNGFcmtFYRBiaxCGgjOuGOs19LIC3qLgCfDYgnPHdp%2Fre1D5czOa%2FIj5ZP7pfp31byOPNzCUeJoYNRXatC4hpEwPsQFVp1NLTfLmIF%2BwUP7EGZVW4b7KTXgMjQubyOL5iCCbejeHwssBhA6&X-Amz-Signature=f82eef18cd7f8f52af51d28c264857ab1628d11853fc14a01f3a12071d7ca91f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KB3BT3B%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQD4eHF6RveiiA8r4zkYLHCcSXhwDa3WhVWjrPbRbEHPxQIgTOQNYzM2oRxNXgLTs%2FMkfIFhyL1flCwIGLbK%2Bww%2FRksqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAMEof6F74EAfvAHxyrcA%2Faf7Svgm%2F3i7sXpbCoBmTVoL7utNJiFSp7wNE2xJWETln7p1JN1hCD67CMadK4oTif9TelK1lCnT9%2Fl6cWe%2BrAZdzdfInvubZZeNPv17vM1LUVKwisQFCiD7GFt8MtuQCQNGbnmYZlAaVqPiW30P7Cp1ZdHde0aDZVXNeb44JjQkTjDFV50OaGTohhrx%2BT2Lh2xLubCbeIeuXdYw%2BTwZbmEAXWu8LoQ9vBfnzWc78Fj2b2NYW3u1M7RfUKOEKuHoMa%2BbkO7wJ9Qw%2FO9g5DvM1Lau2nrDW%2FInJC7OhZlcqTtVT78ntKGr0IyQML%2FgBfhfzXTgTdJQUEYdLQJzAcsfZBXrDr5pRL6ySRxwIQsDVHklyr5bajmg%2BhvnE%2FvOEChT0OehDtgIphRG6%2BEVYPqU0nyO61QiHn1kH6HCeMzQYT1M%2F4YCDmAyG8OqkrtAzuKkpTfkTHbSXB6uvCOSF0kmu%2Ftq3t2VIWP63xmxs3wmp7I0xgPMgmp%2BmhLGxoN%2Bhi%2BX0SF5xobJhQaJX1z0qTDlvnx1qMN7myMrnL5xbbCO3RhSF3%2B1bZQ1XtxKqYQQLvnapWNz2rNnQil1TF05N0dsgXEIWoyKfsczgKFZDZdqNqhlYgFqmVI6XyeJYk8MKC8n84GOqUBJxib5%2B4RtNRpYxYHgBVs9wKT%2BBO9aup%2FvpEO3YIUoe2t3xxEj4pPU5wHXoF3%2BY9cIEsqwbcA6BjMfVepnLDpML4RRDGEN8c%2Fm2CH15pL33TFozIZogmDcl8usIDPClvzX2av2vmMh698kYJUxMtI2auI%2BFwtH24BQjjoFRek9NnY%2F8fU0GRRcU4B4ithLFyXpwdptXiWtW%2FOPl5uKCmw49XarxJa&X-Amz-Signature=0d3acdb85b302d5adeba5dfe320bee4d3e0934d3967aa72cc3a81e4742981dc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KB3BT3B%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQD4eHF6RveiiA8r4zkYLHCcSXhwDa3WhVWjrPbRbEHPxQIgTOQNYzM2oRxNXgLTs%2FMkfIFhyL1flCwIGLbK%2Bww%2FRksqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAMEof6F74EAfvAHxyrcA%2Faf7Svgm%2F3i7sXpbCoBmTVoL7utNJiFSp7wNE2xJWETln7p1JN1hCD67CMadK4oTif9TelK1lCnT9%2Fl6cWe%2BrAZdzdfInvubZZeNPv17vM1LUVKwisQFCiD7GFt8MtuQCQNGbnmYZlAaVqPiW30P7Cp1ZdHde0aDZVXNeb44JjQkTjDFV50OaGTohhrx%2BT2Lh2xLubCbeIeuXdYw%2BTwZbmEAXWu8LoQ9vBfnzWc78Fj2b2NYW3u1M7RfUKOEKuHoMa%2BbkO7wJ9Qw%2FO9g5DvM1Lau2nrDW%2FInJC7OhZlcqTtVT78ntKGr0IyQML%2FgBfhfzXTgTdJQUEYdLQJzAcsfZBXrDr5pRL6ySRxwIQsDVHklyr5bajmg%2BhvnE%2FvOEChT0OehDtgIphRG6%2BEVYPqU0nyO61QiHn1kH6HCeMzQYT1M%2F4YCDmAyG8OqkrtAzuKkpTfkTHbSXB6uvCOSF0kmu%2Ftq3t2VIWP63xmxs3wmp7I0xgPMgmp%2BmhLGxoN%2Bhi%2BX0SF5xobJhQaJX1z0qTDlvnx1qMN7myMrnL5xbbCO3RhSF3%2B1bZQ1XtxKqYQQLvnapWNz2rNnQil1TF05N0dsgXEIWoyKfsczgKFZDZdqNqhlYgFqmVI6XyeJYk8MKC8n84GOqUBJxib5%2B4RtNRpYxYHgBVs9wKT%2BBO9aup%2FvpEO3YIUoe2t3xxEj4pPU5wHXoF3%2BY9cIEsqwbcA6BjMfVepnLDpML4RRDGEN8c%2Fm2CH15pL33TFozIZogmDcl8usIDPClvzX2av2vmMh698kYJUxMtI2auI%2BFwtH24BQjjoFRek9NnY%2F8fU0GRRcU4B4ithLFyXpwdptXiWtW%2FOPl5uKCmw49XarxJa&X-Amz-Signature=0d3acdb85b302d5adeba5dfe320bee4d3e0934d3967aa72cc3a81e4742981dc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VVT6XOR%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T182101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIBzHaLaJ1%2FgTcBCnXbcJrpZyQ6tPn4ieGNsf1fqnP19ZAiBuW6EnpF4TPy1jga6eAcJ2oGQeYm1c3Rxj1%2F2EM27EJyqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVIlPmsut%2BIq4UoLpKtwD%2BEM5cdYUcprXkRagGF9D%2BwofrPHwP9cuYhtWZL6ARmKnqxXwyYyut1ClV4y00YBVL9dS0YhOrc%2BJWcBcT3imbjse8GuLjH%2BwiGwRq8E9J3%2FMtdyWRgB2EpM1Aw9ooCMULBfGDEQUFuoUs1CYS8OIuVFrKSqnRG7bptED0vqvJYk90o5nyAG8aNzRxymo8pAKaXNbjAQ3S1lhVFCCG5LTgWoyvXc%2FRs8swanq0UL3mqFKAWxF6Vb3HN1F0QnX4E2xgRAoOHhM0E3%2F6PtEgEk85d%2BY1IW0lf8HATu8C9b9tiDENYtF5dyR%2F7011IR7pregBQKSpOLrm7nOFF%2BEEXWRsoGvE3VhPyn0jbpkQPT4BfbdBrmTkXyYHPwyB6E%2F3NSBuEQFN43wRRMcK21w7imtHok9l6yoEzdVgXCZkA0PQ3fDanCaAyd8Ci49qtfUt8Uh2%2BocXEupFN17typdkCV5n2NG1%2FQAPJqXvQ1pMjbz1x%2FcRW3xHw4EJ%2BibN2oSNQDJFRbJMX7lR4avCXHfQ2JIWekda6Zh7v%2BRJjox0u6c6lorJXlV0vN0tBqmDtXza48iRDwqzM%2BGG1FZs0imUDrb4KNHSzlZq6sJGdiny0E3Ejxkv6WBX9QEwn2G3A0wuryfzgY6pgGR%2FtdVKwCVvcJq5OfzAuU69nVeTzp9z5BdoHLZeWI0MwwbX7zdSFMQXd5WTR6fmLK4bSao4oQhGd0t9XjRWoEH1qMiCfiQD0v4kx3anUEv%2B0bumehnsiW42f9MzrvNqzCjpmvi6%2BAIKf3C2RB%2BfsdxNUod1CWbe31umhpdh6PvkdRVIsibcSN1MqX97MCEhOSPAkbAKMot0NNYB15KFVtswbgohYeD&X-Amz-Signature=100ef0089098aa51c1dd703ff36063953223aa2ff405d220d8cb27a5f94de021&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

