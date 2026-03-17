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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YR7O6TEG%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIG7Q24gWCJZT85AFLo%2Fsq7hn4lVA2jA7Ah8BeSK34a7UAiA7Fdk3Mt%2BlWNlYIyUeRBpOjRgVBwCIfV3hCwdCj6VeUiqIBAjp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM2kyGkSe%2B2hfSBf7MKtwDhhQq4J1VxjJboxlVllyg%2BIuVvkueky2OfeU0dK9DD20GKxOkcpYgCr3lSBTZCNvFbY2WUQaJQ8d7a2qKT6K433pJigNNlHm7UqDDg7WzXMJIfQedCmtxWRS40xWOXAWQuJd%2FTAS01jRclpO71Yrnlpwo63WjkU5iClAHSjNGL1RuwRmN%2FvTtuDCF6lxfpkewMMSRasf7r9jszJZDd1v55Oo4tw4fkPnQGdGh30JZGVqsvhs%2BNu6v3hC5Y1HHiclJnTwMrTPdUNGXqJXscA7oZpenWtic%2BfJSXwnv%2BkTKCXO1sWoSR7YZmj11cdj9vdZJK6VfDK2O041Sjy%2FVRlHMLCyqsToRxl7VttmPkq%2FHJwR6ljF83BXxxL59q3Vyf%2FNcaRnn1%2FIcEv1wmnFBCF%2BWhw5dKf21U6I7090pz5YnVcPjpZFdKnEp%2FGWyCk3kxGjIIfW1bggJ6%2FyjfpqqwN5GEBGq%2BXGfLbGOf8EYtpDoFsjDH0hk52rvQqPyWvROQP7YFHIMjbwIeJqX6C1Ku%2FPn2oJ5q2EZI8IiwWpf24uH3FPWwdynUxycyvQRCMfXKJXHOknbkR%2BFU4lqaEvs5gU4X7jUUggGyiOTPFo%2BjJ1fB%2BtxWUlOjeh1IGdjN3owx4PkzQY6pgG9aPjRASRLNdaytcC%2FulAJIwtHaDkhOtutvOzCYqka5kkDsWFA5ncW5MmetTjuAqexwSJcXetOLV8RPsYMoi4dXSfF6zKcXPGdpppDHkWyX%2BF7jN%2BquUQG91Q1ot3VGugAGmAooG29BFvDJklCAUSf69lhDVDJLnkVdz1xqWBSp1IZKRUDiyYzdVEMvNjmfFk41kKVWIb4fWELVNrWuW6Fohu9o%2BXi&X-Amz-Signature=c1c5dcf3f505361e4d3482920ac3078316c35478791fcef8d62628868f90c92e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YR7O6TEG%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIG7Q24gWCJZT85AFLo%2Fsq7hn4lVA2jA7Ah8BeSK34a7UAiA7Fdk3Mt%2BlWNlYIyUeRBpOjRgVBwCIfV3hCwdCj6VeUiqIBAjp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM2kyGkSe%2B2hfSBf7MKtwDhhQq4J1VxjJboxlVllyg%2BIuVvkueky2OfeU0dK9DD20GKxOkcpYgCr3lSBTZCNvFbY2WUQaJQ8d7a2qKT6K433pJigNNlHm7UqDDg7WzXMJIfQedCmtxWRS40xWOXAWQuJd%2FTAS01jRclpO71Yrnlpwo63WjkU5iClAHSjNGL1RuwRmN%2FvTtuDCF6lxfpkewMMSRasf7r9jszJZDd1v55Oo4tw4fkPnQGdGh30JZGVqsvhs%2BNu6v3hC5Y1HHiclJnTwMrTPdUNGXqJXscA7oZpenWtic%2BfJSXwnv%2BkTKCXO1sWoSR7YZmj11cdj9vdZJK6VfDK2O041Sjy%2FVRlHMLCyqsToRxl7VttmPkq%2FHJwR6ljF83BXxxL59q3Vyf%2FNcaRnn1%2FIcEv1wmnFBCF%2BWhw5dKf21U6I7090pz5YnVcPjpZFdKnEp%2FGWyCk3kxGjIIfW1bggJ6%2FyjfpqqwN5GEBGq%2BXGfLbGOf8EYtpDoFsjDH0hk52rvQqPyWvROQP7YFHIMjbwIeJqX6C1Ku%2FPn2oJ5q2EZI8IiwWpf24uH3FPWwdynUxycyvQRCMfXKJXHOknbkR%2BFU4lqaEvs5gU4X7jUUggGyiOTPFo%2BjJ1fB%2BtxWUlOjeh1IGdjN3owx4PkzQY6pgG9aPjRASRLNdaytcC%2FulAJIwtHaDkhOtutvOzCYqka5kkDsWFA5ncW5MmetTjuAqexwSJcXetOLV8RPsYMoi4dXSfF6zKcXPGdpppDHkWyX%2BF7jN%2BquUQG91Q1ot3VGugAGmAooG29BFvDJklCAUSf69lhDVDJLnkVdz1xqWBSp1IZKRUDiyYzdVEMvNjmfFk41kKVWIb4fWELVNrWuW6Fohu9o%2BXi&X-Amz-Signature=c1c5dcf3f505361e4d3482920ac3078316c35478791fcef8d62628868f90c92e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3KIVNFG%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074352Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQCPQ66v7ZijU2%2BUhSBfmVDld9YnvcGBs5gGYfs0YmZk8QIgE%2FHN0pkVenEwQXIUSU7V3OaJz15RmqSDPgFP5L2b2MsqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDMjDJcowJxJnA2jaircA8%2BZAMu4Enmshu4bVtq%2BEbukzPRMpRetuTYFek3xKsODLsNhvbX%2FKuNtPClhrblqfWdhQ3rKA8%2FKtSPaLPIRKwG3f9klRaug1%2FQMGYvpNdkpiI0KTaKF8naH%2F9SnPI62tBVjUjkzz%2FO5Mt1U2MArcMAEHiq6EJuZxROPIAXU27ckFuE33HVoX%2FqamUlTSG7PlQatFC6v%2FobJV8Db%2FYHzcGF%2FgT854N4LOifPjbqVkmalmlTplb4ialueGMxzneIiMDkRaKaYY2hObgIbW2KNxmNmw%2F%2BneusB5lQQnVp7BkCgyHH0cViIy%2Bswvqjx4LHvzHOkbk9QR8%2F70tybnZf0DWaK%2B56zkFSIRXQE3kUVF%2BuLaljRZ%2ByQ53JVJSn7Hka9phzYP798ggYntd%2F1eyE6U3r7DMOzocVVjejsvlrW68Sm6qspErho%2FSVMKh7jWjvomQPE%2BW5BwHbHUO9TLwny2jIuem3QN8WRg1gKcJR95FQ0W7P2q13Qe8QrQ50lIJUTZ8R466EzUnu7BY09zLrT7Yfg0lu1hin8fWYGwLEWBeTZoFhbU28L38K9bG92DeQNZky%2FUyq%2BjSwCrYvH49grNweUbXmHx%2FuPesqRsAMiA84AmugpLUDUX64lDLycMLqD5M0GOqUBOggpfcFi6WKyVkhb7QIZC9%2BjWtV6w%2BC%2FHzDhgzYZHFyz1qD6FSLXyLICLjiEG%2FFcFZwdwT%2B8KPqxCGevyLVwKGWg0aZz25%2FT49W8b6Gis4GcD%2BMc5j%2BolpSl522ewdzpSvxYX16M7Rq%2BDT%2BUPZQWSfEjVgLe8jB2MHkA4ipJJzRrrueaWBprgi0SFOTfjjiCYlxwyP8PGMBXkLtgBATZqrXJv12%2B&X-Amz-Signature=832fdd533d44b17cac185e327fe4af3cb80a2909d09e4bbc18d216701292acdc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLBFXOB5%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIEcK5qUIZB1fbWqnqz%2FI%2BUvp8c34Vfwce148kFmBAUVjAiEAhS9%2FQwM%2FkDGL0kFwTWbz0xpW33qPgfFJRibfblQrQWMqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD%2FMDesxixV0FBqN2ircA6%2BHijfKu6S4UPyBfMOe6yb34eUj8SHCqxfcUtVGC5GwMMtIbnb0YSPR1byRrYC0l0JQFczBZCnStCRdqDqrHLqtCh474tHBSdEWy4twdnLZJIYqXPWDHEpgRzUIJ7GKszsNE7mSjzcawV%2BnU%2BSUHspF%2FhS%2FcElz4k5mcqBp1X%2BAmK%2F05uRmx6Ya3pfuBB%2Fx4QJQiO5h4%2F%2B%2FyRdGIJMf%2B9aXqFdJFNAhwYgENSFGw8ZHeyfF%2FCiqvVRdlYhKFPad8Y7oVqQs%2FiXCNdKGZY65aWN4vSotUQXYMsy2QWOIdz%2B3W%2FoCdiNbjHN%2BpvK3QhXTNYPl6MrGlHJrGxOgFO7qIV9skDgdyIAx4n6DejLozHpCXuVHtW46vJOAkFaVLUoAG1sDNUvuLp0WlNkrnN87dHAWGineq%2FBAQwQTYC5emqRHI9UTMb%2FzcEProBiysyC0cJWPEgM6nRNghs4hywXesaug5wn5zucZPn91ujYI9OThySpXo91YMqzb7FfS7%2B%2BJSHxrcK%2Fc12VTwgVDEy1JtgUcXvbsmpmJbkJq7uLs7A2tTkxm1IrFybVoYlxUbmQbe0YIGQhBPzp55zcq9W%2FoKB79UZqf0v1%2Bij%2B9X%2Bb%2BfZc5CV0jHFzPFHNo22QyMMWB5M0GOqUBHNt1h1WJs1JMe0Q9cVZKpNLqqkf5CygNPTaK5538Wy33j4RpwITftk8JD6Tv25N7dgLhqc%2FmQ6KBFN8Uvfpf5oitMRXhmb3PrQMNxLFgFThhE5JOVasPhrAS4cANWYvqoQ%2FiNMSo0%2FP40DzuGz9VI7eJpWmtJ%2FrSHQxJUvYzTRPcAHivwVcTWAfB2zkuY%2B3rMAkueIRYulJDIpMAmQU394apyMFL&X-Amz-Signature=940b8725648b826050690fca3a3d46a1b0506181ff207ce63e8555371c14a36b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLBFXOB5%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIEcK5qUIZB1fbWqnqz%2FI%2BUvp8c34Vfwce148kFmBAUVjAiEAhS9%2FQwM%2FkDGL0kFwTWbz0xpW33qPgfFJRibfblQrQWMqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD%2FMDesxixV0FBqN2ircA6%2BHijfKu6S4UPyBfMOe6yb34eUj8SHCqxfcUtVGC5GwMMtIbnb0YSPR1byRrYC0l0JQFczBZCnStCRdqDqrHLqtCh474tHBSdEWy4twdnLZJIYqXPWDHEpgRzUIJ7GKszsNE7mSjzcawV%2BnU%2BSUHspF%2FhS%2FcElz4k5mcqBp1X%2BAmK%2F05uRmx6Ya3pfuBB%2Fx4QJQiO5h4%2F%2B%2FyRdGIJMf%2B9aXqFdJFNAhwYgENSFGw8ZHeyfF%2FCiqvVRdlYhKFPad8Y7oVqQs%2FiXCNdKGZY65aWN4vSotUQXYMsy2QWOIdz%2B3W%2FoCdiNbjHN%2BpvK3QhXTNYPl6MrGlHJrGxOgFO7qIV9skDgdyIAx4n6DejLozHpCXuVHtW46vJOAkFaVLUoAG1sDNUvuLp0WlNkrnN87dHAWGineq%2FBAQwQTYC5emqRHI9UTMb%2FzcEProBiysyC0cJWPEgM6nRNghs4hywXesaug5wn5zucZPn91ujYI9OThySpXo91YMqzb7FfS7%2B%2BJSHxrcK%2Fc12VTwgVDEy1JtgUcXvbsmpmJbkJq7uLs7A2tTkxm1IrFybVoYlxUbmQbe0YIGQhBPzp55zcq9W%2FoKB79UZqf0v1%2Bij%2B9X%2Bb%2BfZc5CV0jHFzPFHNo22QyMMWB5M0GOqUBHNt1h1WJs1JMe0Q9cVZKpNLqqkf5CygNPTaK5538Wy33j4RpwITftk8JD6Tv25N7dgLhqc%2FmQ6KBFN8Uvfpf5oitMRXhmb3PrQMNxLFgFThhE5JOVasPhrAS4cANWYvqoQ%2FiNMSo0%2FP40DzuGz9VI7eJpWmtJ%2FrSHQxJUvYzTRPcAHivwVcTWAfB2zkuY%2B3rMAkueIRYulJDIpMAmQU394apyMFL&X-Amz-Signature=d354df44555bdd5acfe6f208b4923c5ebaf6965ddb10e3f12b07560c9b402182&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VWEIPVJ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQCs9OsNX9M08c2Q657kVzYFbTmZV%2FZuL6naGCc3LfvqwAIhAI4WnU3UlRS8L9YGx468tyr1TAhaIq6XrqPlRaCtoPckKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwyMt%2FaiV3%2BVLMmRXkq3AMppvad9lt%2Fn3SZ1bUT%2FGLgfPun%2BxbTBhAsoiZBvnZkI9LSvI88gHl%2FGKjSoKGLgHn%2BEJDLcrKT%2Bin3hqe3FsHqFW%2F1UZXKynFRNYydoZcX14waDPqMDWCs7iWSu65bxmkbGMg2%2FlWpAjVfdxZtR%2FHAYmt4pbL0ZcdejREvVr%2F35F1OdxKLKtGuR0iQ5GLxCY7srJNcjCHZxCoagfs4DdOtEIGLadZBwNBPu0IjZT%2FdXMAncvYvJh6eAXoj06zO32AVGQGanqt3Qz7KcdexDFq0iINaLNFGjCWHnlH8iLYhyfwATTDs1SuzlKl8Cmicg5Vs4nXpon2r9NB9fbMp8t%2FIjsFWW985vj9wR2noeeuyL%2B6FP1ibgtV43VmCH86A1oBkP9%2BsapMb47Fztf0GmPvPzgLJfXyoDYgqhnPysM%2BAQ9XvSPamo%2BrzZmy0SgtrxVMl7m0vMaJEx4HKOg4RdLG1o%2FpJ8bz7oKxcNQg9KeniS68sKeARL%2FTpvwaeYfFedGlNlUefCyOdQUblsLFxVTH8ds%2FMTIMZ2lgPPXti0GPZPP9n1xhwJ8KCOWngf0PxY86ORzJnBZsQCOubf6eZQYWXRyZyYZeF7DmVTxdYvfJtWCjRHWr2FFs4YgWJYDD4geTNBjqkAenlEuPyRMqTwNddnGp423KDy9xaFzTPAjNm9LIhsuwaPlhw3TrX3pL6tliVf%2BoQZ3Jt%2FiZzojw1QOt0YUGDFqyHV6WnCbikx0NCHKF4eDyQAaekg6rUjL%2F4pGw%2BEEyfWPNG3LxlHu3gHWS%2Fq4AbBeN6e3b9AAIH62Gk9sjyvO8Ms3Fz2Ft%2FRLoW9Iv5%2BCDS4H4pivFI7hNTUAq8%2BQjObfQ1W8fa&X-Amz-Signature=e5881944e8ffaddd4483eceb2566fbce59bc22aa96e13fc3dfa282921c175b70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKYZDOFE%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIFzNp9uFrsub6IcyJmi7cqmeUVj%2BhusDkHxuELxo1jaFAiEA2vxG6%2FHlTo4Z7AqcZazHYwNQsLRlzfrkuJxf8WFfDO8qiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBiat1EKZ9Hh3xQX6ircA%2FjGAPtG4t7%2Fqy7NNBCh98a7KU4zT6oU3xNryCpj%2Bbm0pB5dBFGuTduQm9%2FRfcyI%2BvNU5zcGx7IjhjHInn5AEe%2BN9bkoznSDVGR040U6kke1Xc%2Fyq4vtcP4EBJ3g4fLR%2FhB9C0mGg9fz%2BbQqG68VUW%2Fc9yjvrg3dL3rdaaH3%2Ff1%2BAxqMvszEu3%2Bb3gHrDtrOsdq3VMOW7jeYqpwmShwK%2FNmjEoXPcOVTREDFz6qSv%2BltOAi%2FBA5H4bO7JXNjb7UdbxHy34e4I%2B3BaL3OvrETEWyrs%2F9BbXRILXC4xo4M%2FXcNKDXBWEmvvq7x4C6mFre3hef0V7Fsf09sEYCim0tqk%2BqF6P6ufU3lkmayIPaFONA4iMGdcst2ZzTyw0gA7Qg81bJSNBedwrtWQyp7ah2alTy7WM2v5PE%2Bof30dBRKPH%2BoVM4xHpR%2FLhbKL6FKYNCTYQlcy0AWWy99Zb6Zk5Di6xNaA42EmigojXa0cHxdQe3CCfCbTj0iELZ12Jn0ou9SS5IDXzXCuejsbHJ%2BzTFN%2Bo9QYbZcSzY4iDH9ldaJ1wcZKJJHwX%2BmW4kuQ%2BgWf%2BeyP2d2eURxoaYsKgaLdPhVhAjuzWm5FXqLlQLGETWybjZHcLPXzMkLz4UPz8fTMKWD5M0GOqUB15QScdkZL6Ooqf7Wo31yz6ACgvoXvu2wn6DQEBl4RwUajOWFOm6IoFcka4LXr5Dxpf0YOjSfHHQMVc9hajoL4QqGjUBWojXVnXnaH2H08%2BLR7M0qrBBScpqb8oUHiOhhJBb0IRLcQKYe0eq0z2Dntqh5t7w2ACuo%2BFgpphe%2Bbym301NmMniaA6cUjjbd2R%2BXzx2cSpVThRxkXStXDnNhBfPmN2yi&X-Amz-Signature=ad12356aa5e8a617acce7e0c0c373a96cd1207fb562c5be587c96fbbb53433a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZYCQ7FN%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQD9au6qDWX4bCt6VoFDfpGCteuZg0oQjy5K0yPejfD5KgIhALSycio0fuG15isFNCVloKRNz0Gy0U2mvlMN4%2BpWejDDKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzuEXrUO2n2QvtEHC4q3AOgwXY81FQ2UzUepf%2B9ztr7Um5aLR0Bmxy5I0XS0SlTOxEoOWZd5ONfi%2BYQOo9JRdj3482fRedJzSDMtO9HpL9ML3n%2FedpH5RlgJKY22p%2BmtPMi%2FpKkzdU8Ws0UjU7A3eg3eQyMtPdy%2FSwrJTR6l2De9p7T2lT0y8BdlNNIhtQsSm2mkCaGELU%2FIafrv95wZW67n5RnmQV9PVqQCxoxXiG%2FQ6gNI6dblOu%2BCBx1M%2FmcL7SvWhpDtHPCL65nwQWV2udxPJIgL26IzBNIO487EhahhFNkUjlKDpdl8yHJTIeR4jQwdFGmoYtfxdiE8z%2BJhamuZ2eYmX3NwFcZUkCnjVG8S%2FPVl1RCh0qCIFR6evrRPusC7ZNOEQjIqu7gEC8H1w9kJaWWjrxIr%2F1PDRxnzIBUJ8fDdNynlYe3AidYwVkrjP0pnkmpoFQ%2FIg1mpYsHKyLGamO%2FUlAY21Uv9r9R%2BYsdULhDDJGh4RjCM%2BbkiRAC3lEG9RB06lWSjxuaHmTFtL3wwKOb1g%2B0xrysyu3%2B3ycM5skWJ5igAj%2FYqoFRK5mbD%2F34QJPjNd3nCYSNo4Wr6CryOh5HY0dZL9mYlzIUVGGhDSQDPI5iFOf7yggRplrhuKFMRqBPL0mmIIgVPjC2g%2BTNBjqkAXOKWd2tlq3EMOFiv6DdkXM3OqQkx3I7Mihrw6fHRIM77n%2BJV8iLxXyf8qk2DcqgnvOq6mKVOiCnVW0cyEaUbM7TmzB7ix2FsUZvvPsS6Q%2FqaGNCj9d5bI0UEH%2BJvB3J2vony%2B6SohQ9yfD3m77d49q4WMHjZT2d%2F%2F9Pk8znVUTtOyYNvCZAfn2MKRF7nwMiLgvzKKzfXR%2BKyHXADKORBvtS5NdJ&X-Amz-Signature=8d7c43311d259093f320e039d2014caca6b14f64bade3c96838c4abae1d36d1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S43YIGUH%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIBXbZEly2ZsByN8KMlbHUizgCuLoH66tX9o2HquGwpD7AiAGYhRNk8kj0mqMEK3AMG6vMR3mldBJ4yJ%2B7tf1u4xS%2FCqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMldfMa9e%2F8eaH45auKtwD7Bh0CzyYLKJ0jh%2BXWwunIP0h0vy88K8y4nkBeETxoSySmY2xQWjTI1WjRVB63%2F8Wa%2FsO6qoDQ86LMgZroeuIyv2rVLmdFfGVa5WHjlZHf5faVhqwGAm3CEtGp%2B52yOVWXyVh0XcAgfddAOii4OOFvgUpe7P8iUEs7MEmN2i8WhjuH38wVfkT8Lyfz%2BUpsYTCe3JEUCqQU4n7VG%2F8%2BuyHhP5W2hxEDXNlQ1QF0gK8M%2FK%2B1OfhURd2HPv9auWEOKFOG9xUYKxkHY6DkSUPsyR8QhixsEyFVd7FaN%2FFrjR5%2FvrJ8hSbSv0qswEZ6n09E%2B85QUCbv3xDOzIPaxT%2B5tBd%2BO9Mr9bHOucqpefL281bjbwr5BZQXJK0mGdbiif5cNYXOYgXnQOoenYsFOz8y8L4LNpJOY510%2BzowE0EQZDtAFYwAsfKMWMdxLbmUPAHC1yLYIlKWZ206YFMDzHAEQHoLfmfgMLr9E4snRhvpNi%2FfVcXt2PmMywjlcQ8St9bErnOf3c4J7IIk8Yth0PV3Cx2a4L84rzBm22LZmIIiuudtPejlp8Upcsbwmf8dfr8hK2FGmkVe6afZajcVuB19Z3IL56SbOtigXDUQS767Ok8lDK36DfiM8vtWr%2BALQYwmoLkzQY6pgHx2rklKr9UWHR5Cg6A19XfVLnCcfbjUVbkVKY6Vb5U%2FHYvWgF6ccswyXRl43S4k9EzHc2L78fAgBW%2Fap2gVuJFDRFqB8erRh9VCNLLuOzUNzIY59fu5Kgfw2e1bC16JXNdwRAfPlHCVWIfvW0WLc3verogJqvmu87nj7zSfEMTJaHgFH6BjY6fwlwpkVyFN5S9cJC%2BCVbst60SBjWcPXZu1WFuJJHr&X-Amz-Signature=39abd7ba98eede194d584ceb6bb5af5e29880cd33b2a7f7473a81481f2d9c7e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S43YIGUH%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIBXbZEly2ZsByN8KMlbHUizgCuLoH66tX9o2HquGwpD7AiAGYhRNk8kj0mqMEK3AMG6vMR3mldBJ4yJ%2B7tf1u4xS%2FCqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMldfMa9e%2F8eaH45auKtwD7Bh0CzyYLKJ0jh%2BXWwunIP0h0vy88K8y4nkBeETxoSySmY2xQWjTI1WjRVB63%2F8Wa%2FsO6qoDQ86LMgZroeuIyv2rVLmdFfGVa5WHjlZHf5faVhqwGAm3CEtGp%2B52yOVWXyVh0XcAgfddAOii4OOFvgUpe7P8iUEs7MEmN2i8WhjuH38wVfkT8Lyfz%2BUpsYTCe3JEUCqQU4n7VG%2F8%2BuyHhP5W2hxEDXNlQ1QF0gK8M%2FK%2B1OfhURd2HPv9auWEOKFOG9xUYKxkHY6DkSUPsyR8QhixsEyFVd7FaN%2FFrjR5%2FvrJ8hSbSv0qswEZ6n09E%2B85QUCbv3xDOzIPaxT%2B5tBd%2BO9Mr9bHOucqpefL281bjbwr5BZQXJK0mGdbiif5cNYXOYgXnQOoenYsFOz8y8L4LNpJOY510%2BzowE0EQZDtAFYwAsfKMWMdxLbmUPAHC1yLYIlKWZ206YFMDzHAEQHoLfmfgMLr9E4snRhvpNi%2FfVcXt2PmMywjlcQ8St9bErnOf3c4J7IIk8Yth0PV3Cx2a4L84rzBm22LZmIIiuudtPejlp8Upcsbwmf8dfr8hK2FGmkVe6afZajcVuB19Z3IL56SbOtigXDUQS767Ok8lDK36DfiM8vtWr%2BALQYwmoLkzQY6pgHx2rklKr9UWHR5Cg6A19XfVLnCcfbjUVbkVKY6Vb5U%2FHYvWgF6ccswyXRl43S4k9EzHc2L78fAgBW%2Fap2gVuJFDRFqB8erRh9VCNLLuOzUNzIY59fu5Kgfw2e1bC16JXNdwRAfPlHCVWIfvW0WLc3verogJqvmu87nj7zSfEMTJaHgFH6BjY6fwlwpkVyFN5S9cJC%2BCVbst60SBjWcPXZu1WFuJJHr&X-Amz-Signature=1d01d683bc8490efc954aec345167771e7abdd49942c9392c2c40e791ca8392b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SDXLF62%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIENQzH6ZV77aQK0BFuWKnvNxavt53UDytGf5mCrm%2B5IRAiEAx%2FbQlWuPde4g78TzVV6FCS08U5z4YBdMXOcQ5s08m64qiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCkJDWN5oAoumZ6cZSrcA%2Fqrxa%2Fv9fIIEvVG0HoHXepExaXP71oolIRilkk498FLSF6WgQsTOzkWbPavP1xZYGUri7PAs9bcxvZoc2kNFoNudUybK5Gk9UKK23StTCgpt7ncLPPcbF6l0PLbsyd51hIRZ0gD5jdgiebhtBF1Q1wNTtHh%2BT7I4laClPxC9t9SmQj7tRMQqT6lTwc2he6HUeaWUWYeW%2F48AdQ%2BN8AFY2JzHqcDKGCs2yyTht5eRLI0cj%2FrK9FC29aI32Z0CQzy3x5Mmr0pqGy%2Bs6AP3i4Zo%2F3adc7KbVvlfBLxuNsat3tjbEK%2F1dUQo5Kr69W5b7ELyvWDWNO9CxMALg2wSnhbmTCGeeU66tHbhH2Ma1TAw9XeZwmR376l%2BlwRtmhINzH5PylzoGrKGmA0SVJ3b8SvhMHiO4o0r9XnkoWCa7gwFXqESaebNigu2I3Pi2yZF%2FaDZimi0hGEMOQJIAboYFKQOI0LQGe%2FQZqm3F1X7u8TF%2F8J8zLjNmFI2YUjMckjDbU5I3%2FzPVeA4iAol%2Frq5e0U4HnV6dONmk%2BGP%2BDqM1ETivaGNhhO1tC5%2FC2NFMlrawRHS%2BtluM9wsNLVLPC39NQ8lx4jCx5t8tZ7xE3P8ql2r8Y1746Lx3NKAwq9y3vEMLyC5M0GOqUBscNbPAAqSM2SPRnubgpSmxmlFYbcD4wFFnQAZ2N%2BJS7RzDZfWi7Xv4DTZXiHxUWLjPVxTgo2cSUury92pk8YRIGQUupzAxBf0H0KXiHK9BfM%2F5OEzkpxKCnXCUqjJUGpm8o6Y2M16uWvAdeHS8WF0r70MXRrXjFB%2BRAiBUqQTfr6sImVJfLNjCmcgE2Uw18y168O67cOKG7kfITegPy90pp%2Bo%2Bu3&X-Amz-Signature=337170dbf9021b61215e1ddaf2b3263ba6d9d7a05fdc076e8179b11c3944968f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3RWG4WM%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCID2KWW%2Fz09hbuepT3u466bw%2B4NNbW6dQmu5N%2FlVDOoQrAiA0bjvkgDVeaGVVdRCde9QwMO2MxgSCGSIXn66EZeLxMyqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIYWp6Qg%2FyHMSPuhvKtwD8eqHljiwylXKQeeaK0J8L6kIo8D23%2FR%2BNdfoyQuuU6deKSrxj86b4kVhYBVD%2BnUTw1fsENV0cc46hyGi%2Bw1ZsDwfxCeM7AjKvpxMKTU%2BXib5J7fyenQpEvllYblarG1VaOMP%2FLtaC%2Fu2pCou81afDT5Jb9nk3WKzEAwgyLY3ePp4olYBUCKB0KP8JscHh3966%2BQAf%2Fryqw6xtV1hjZtPhbDeUagUz%2BNqP%2FBz1Cz%2FO6YkNNoBFTKVIZWJWC6p1kwESYeqQh9ziWZn7KwaKPPFQbD2RQ%2BOsp8PC4%2BdyNBPURcn2VXP4is41jkrDcDp0KYyAZ6IhmnCBt%2FFVKKCRrxpEWP2KWRVLoO6ORBLCe%2BZCmf9Xepj021oKgzVQuh%2BWMEciKjZdfwJEx%2F5WCN6TpSn3AAIhe%2FgCzWrajq7VdoyVfO%2BD%2FIAQ9CeJg4%2Fgjl4VrjsUlpWFEN3LYTjoHmok6Dkzc6KCM70X2FZWqPxypqu7iOWecDg7ME8ktTtR55EdGY9LOphfW7PHvjtwloAtyTXYwt8JYT%2FGnFKStKgGtbnjXx888yQfFg%2BJvlxu3e2Mo%2BdRPS22GrOF2GFwwlVnbIeiyugBR%2BOSh8Z2hRuOjkNQbJXX1obTU0D8weIBPowp4LkzQY6pgF1HQAYai3NyyTwyCWrkoQTiQpZ%2FcCHVlPAGzTq4E4YcLOrCHfGoVw7IGeRxcnJHjkJ%2BhRVI%2B9SsNAoTD3KSg0joa690ASRWjHPPAV5SmWyJek02T4V%2FVuVq%2BhZ8frqpZk%2BRpRljOSrt2O7tx39mZS8A0PxGbChjqcaPJRBzO8znvz4OEXX%2BzpW2lcRGPTgd28SqdW72gfNuOXLO62HkxEMP5xZ9E%2F%2F&X-Amz-Signature=254d63df93e6eca93757469fa7422027b72e8dc5211a524162cf7c974b7da9a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3RWG4WM%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCID2KWW%2Fz09hbuepT3u466bw%2B4NNbW6dQmu5N%2FlVDOoQrAiA0bjvkgDVeaGVVdRCde9QwMO2MxgSCGSIXn66EZeLxMyqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIYWp6Qg%2FyHMSPuhvKtwD8eqHljiwylXKQeeaK0J8L6kIo8D23%2FR%2BNdfoyQuuU6deKSrxj86b4kVhYBVD%2BnUTw1fsENV0cc46hyGi%2Bw1ZsDwfxCeM7AjKvpxMKTU%2BXib5J7fyenQpEvllYblarG1VaOMP%2FLtaC%2Fu2pCou81afDT5Jb9nk3WKzEAwgyLY3ePp4olYBUCKB0KP8JscHh3966%2BQAf%2Fryqw6xtV1hjZtPhbDeUagUz%2BNqP%2FBz1Cz%2FO6YkNNoBFTKVIZWJWC6p1kwESYeqQh9ziWZn7KwaKPPFQbD2RQ%2BOsp8PC4%2BdyNBPURcn2VXP4is41jkrDcDp0KYyAZ6IhmnCBt%2FFVKKCRrxpEWP2KWRVLoO6ORBLCe%2BZCmf9Xepj021oKgzVQuh%2BWMEciKjZdfwJEx%2F5WCN6TpSn3AAIhe%2FgCzWrajq7VdoyVfO%2BD%2FIAQ9CeJg4%2Fgjl4VrjsUlpWFEN3LYTjoHmok6Dkzc6KCM70X2FZWqPxypqu7iOWecDg7ME8ktTtR55EdGY9LOphfW7PHvjtwloAtyTXYwt8JYT%2FGnFKStKgGtbnjXx888yQfFg%2BJvlxu3e2Mo%2BdRPS22GrOF2GFwwlVnbIeiyugBR%2BOSh8Z2hRuOjkNQbJXX1obTU0D8weIBPowp4LkzQY6pgF1HQAYai3NyyTwyCWrkoQTiQpZ%2FcCHVlPAGzTq4E4YcLOrCHfGoVw7IGeRxcnJHjkJ%2BhRVI%2B9SsNAoTD3KSg0joa690ASRWjHPPAV5SmWyJek02T4V%2FVuVq%2BhZ8frqpZk%2BRpRljOSrt2O7tx39mZS8A0PxGbChjqcaPJRBzO8znvz4OEXX%2BzpW2lcRGPTgd28SqdW72gfNuOXLO62HkxEMP5xZ9E%2F%2F&X-Amz-Signature=254d63df93e6eca93757469fa7422027b72e8dc5211a524162cf7c974b7da9a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEP4DZCU%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T074405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDOLZjCwnKrHNmcTXhlV85WhQp2H1AZZSBz7%2BnhOS7RegIgcz4iqN8nGSiWQ5d4T98eC1xCVTtHk11c8av8wy9F6GwqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKaDlV9wtG1Q09NHACrcAw4bmh%2BNNoCmCVYy8tT%2Fo8qV15qSbX%2FxWIyu2IqyKD9um1YSFQhSMu5PfAp%2Fhq96qnHkO0rudrGTI%2FybAN5rVeVCCBRVk9GDCsJi1mv85sRYwWiQ4wZxafXvNGuiL2bCkotNq%2FAKADT6nAT0WFvtQyZZBlQQHzj9B5Kx9T35DC4xuwIdvG4%2FnS45YtVhDVs8CgAxRhHm0KvlYJuHHfkQJ3IpYPONwVJjuYAHDSti3nnjWp8JVMZYZGg4ZNUs5lFNMw5e8X2oGTPDbCxgAmKCIrrvYOhNI1DsB5W0jZQrW%2Fv7R1VoUn3q90XbwcB1u013uDkWzrhMUWtPgJh9ci6R2kTRyWbgb5Dxd3n0w0QbhL30j8fqT%2BrRneI26V7yhm51aAOH0TgarwsM4cSdMrhXKiWbad6Qy1xdKI710irx1BQnm2UDZmFTFirVL9b9aO9n4JTUpajWNJ9nc7cuH8AU0s8elRgRCCvBYn9NeMex388IrUq8JH7M6fLOGqxH6Zq9Qnisfg3AJizEsZB95tByTqm1XpyND2mvaHB1ItZ7pWkGJ79ZXEiZY54x1e55BWcvwFcurbCjBOa774wpcSChj8Gd%2BMdPqVOUOKt4xo1Aav1Gco9fxt4fmlGsptLSMIyC5M0GOqUB%2BB8uM%2BIICdwDLYX9M%2FFV9ZjoOMWxclnBq3TeOhHNFL9tpssSBKmZJxZmLFDj1mxXUb%2BD1AdP934sQKwpiJVBWgUGaLpaCjsCjFRpOnuVK2mf8alYzGWXRUS8URFA%2Fdb6pd9901M7dblafuaaKFIt2aQ4YSO4OtVMMgl4oXUA6UZyTAJcqxOytSAl%2BIJ%2B5Q7mPnTqlooVHLO%2BKkGZyWAZXPxlbsjZ&X-Amz-Signature=89676dbfdaf2847bce47bd06c372a53affb36db859e5cf0d4928e010693852a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

