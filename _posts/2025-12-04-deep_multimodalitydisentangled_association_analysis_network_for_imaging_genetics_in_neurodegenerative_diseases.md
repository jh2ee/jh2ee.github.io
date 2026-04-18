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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NGRQWQE%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJIMEYCIQDTmdi0NKU9blcHk62k39bEswSlFpur5kwIV2g0VqKUBgIhAM2XzUq4vVr25dz9R8LUJZz6SqcpMOt6XyVJWnAUv%2BzlKogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzTqPNyJ2%2BS%2BOUiQxUq3APlwjNNfsOKMIJc5mgvOC%2FFBjGynmpbJZSTgHZo3ShMOXZl7lEbZlNwmEt7sXAvL81WlEkL0BkBsUZgwFuauUxdQgFWtu4f2EE9FZx%2BjdN0Gi8dp0AQ09ft3%2BDiAm9a%2F%2BSYHHopgDn4t7NGWQnvPCMjGZ8FN3pU1TNo62cdJQnKnMteze1pskkr9o1vAL2azxe3vw1lkq9bktTo3ddLHobfoxBMACMR85crAXIRJL5U0RcL5%2FPq4pZ1PyR8OslLth4qMnRm%2FB3L9o2Ix1vQiAFt9yDMEXuO64yc9a31%2FYlaTMJgnWVVW5u4G1Rgsa4drTCBZNJDEi658x4DInzZsM8oosyJBhsRo9dsl%2B4JzW7Eo4iWZtlMlAXK5bJ6WB14GocO0yV2Z22XNQjF9dPumu1rmuiQGSn6UFn2IByvkncctd9XrCmZyBiQr0szju7aCH%2BaWbgtHG2Ce9jibER0ImKOz%2BN0voFUH1OixzfzTQK%2BMhmoFgxWi5twMy4nELQ5ar121ToZychgxtArGw%2FppDnabyp96HUYP2pES%2BPRs8qa1aZhHHvaJxJRm2xw2V%2BQN8I9TUUQmYDXrYt2x5IJizCti2dK8jL2m35D98ob015YAMAbjZNbZqE2HQfs%2FTDtq43PBjqkAWLN1VUNwjNMevu1Zq2NBTsHppH8LbTd8oCc0xABFy6U6T0fFKXUlO9ofFxAObcRbAuaI30XJu3qFbrB5Ubwt20lxP1f5LxIIPkB5iRvxWBQtsf2J%2B%2BwwosfA%2FuZxGAh3o7oRr6yTcbQXtA7urY5yRbghpku8ogupbTmQMk1snJMzUVVdazS0goN%2B7QYV3MnGE2ucU%2BuUt3ZvBuOUCbd9ScWrQrZ&X-Amz-Signature=6a27f4fac2052ce986fb6108816bdd9e0f13693b9021a2677c53e30c902e5353&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NGRQWQE%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJIMEYCIQDTmdi0NKU9blcHk62k39bEswSlFpur5kwIV2g0VqKUBgIhAM2XzUq4vVr25dz9R8LUJZz6SqcpMOt6XyVJWnAUv%2BzlKogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzTqPNyJ2%2BS%2BOUiQxUq3APlwjNNfsOKMIJc5mgvOC%2FFBjGynmpbJZSTgHZo3ShMOXZl7lEbZlNwmEt7sXAvL81WlEkL0BkBsUZgwFuauUxdQgFWtu4f2EE9FZx%2BjdN0Gi8dp0AQ09ft3%2BDiAm9a%2F%2BSYHHopgDn4t7NGWQnvPCMjGZ8FN3pU1TNo62cdJQnKnMteze1pskkr9o1vAL2azxe3vw1lkq9bktTo3ddLHobfoxBMACMR85crAXIRJL5U0RcL5%2FPq4pZ1PyR8OslLth4qMnRm%2FB3L9o2Ix1vQiAFt9yDMEXuO64yc9a31%2FYlaTMJgnWVVW5u4G1Rgsa4drTCBZNJDEi658x4DInzZsM8oosyJBhsRo9dsl%2B4JzW7Eo4iWZtlMlAXK5bJ6WB14GocO0yV2Z22XNQjF9dPumu1rmuiQGSn6UFn2IByvkncctd9XrCmZyBiQr0szju7aCH%2BaWbgtHG2Ce9jibER0ImKOz%2BN0voFUH1OixzfzTQK%2BMhmoFgxWi5twMy4nELQ5ar121ToZychgxtArGw%2FppDnabyp96HUYP2pES%2BPRs8qa1aZhHHvaJxJRm2xw2V%2BQN8I9TUUQmYDXrYt2x5IJizCti2dK8jL2m35D98ob015YAMAbjZNbZqE2HQfs%2FTDtq43PBjqkAWLN1VUNwjNMevu1Zq2NBTsHppH8LbTd8oCc0xABFy6U6T0fFKXUlO9ofFxAObcRbAuaI30XJu3qFbrB5Ubwt20lxP1f5LxIIPkB5iRvxWBQtsf2J%2B%2BwwosfA%2FuZxGAh3o7oRr6yTcbQXtA7urY5yRbghpku8ogupbTmQMk1snJMzUVVdazS0goN%2B7QYV3MnGE2ucU%2BuUt3ZvBuOUCbd9ScWrQrZ&X-Amz-Signature=6a27f4fac2052ce986fb6108816bdd9e0f13693b9021a2677c53e30c902e5353&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBJFEKZ7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJIMEYCIQD1bTugF%2F3%2BgD6oqxyD7mVXbLO85jE9PhmonHMnA%2FMQjgIhAOm6mjNkNzwc7YNp1FOygyH8%2B%2B%2F1bpKF15bbWH6IyXeaKogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw6cWHBiWODX94QNjgq3ANIG%2Fvh%2BBIEvXAPvWQ3N3U0wyz5L8V72Boxtg3LyQRKfCPXd7mb%2Bu7Jsh3PuHJOjooGxiOaGiAVQe1CNfjtV%2FgLiaU5DOMnivo6wTGSp1a02EmyIK95vMq4%2FiwKgpMA66NX5qZnmW5pxyaKr5KbMoXTOJVEU%2FRLg2pQpq3MPYcMMQbJ%2Fc6AtyDBIRE3tEeLcP6Z9k9Th7SikMQRsBwkTkIcbK0JpbLHfra9kROU03jeooDpjEWFvcGPwnSJXZOcB1iAwSbcJWpKiMTAzheP6ln0oBsQxuKrTbBM2V08PYrJD%2FBudCtP9GRx3KmymYYFO9QpGhEspWOkoDOk0yUYTFP6mIXPWECzKcE0N10BGyhQq10IyaGCwex0fcP6fYXjcXnZudWyXEskQjHNo3S8T6qw%2BlQ3hJmQn3URg6U89frUVHmpPwmAHnYgMU9VOzqHg0JtB5ob%2BDRixsRa3DiJyYMbxPYTsnHfn0ab%2BTeUTCW%2BnPwASnSAqaEkHuDwdji13fTtKcCyxl3v2L65dFIMETFwTp7YJMCY3eq1AyDiyZy%2Bn50HWso28ZX3OaD60R1Q%2Be%2FsGr0IkDXZsymtg4qjlr9xPkBMWnJ7%2B7%2FPuEinseyiFaIa%2FLn%2F0c0eAlJ8kTD6rI3PBjqkAfSiP3tQMu6Vce8pG1MFQOmZ6FXOC4VmP6mparJVjwykUr6xoUoTYpp7eFL8DB2TxLBXiP5u9rBIExaji4C1APXe69XwJJQqERztz7B%2FBVgVK1xOkYiBIVrWVafov%2FmnUcfWgsaD9ByB8YGj5N7%2Fy6cniR%2BtmyfKrIzkrpliXSVkWFIXpZCeoYWHxJ%2Btx5yFBqPclPCWyoSO7gDkWEs8f%2Fr2xB18&X-Amz-Signature=42599b111fb232ef187ab8feb427df09ba8a2c4c04bedb00922cf2c92f4b69b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647F6PEY7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJIMEYCIQDIH0mKPTtouPEJhKhmDwHjVjjttlQ8Qra4jrkToy3u0AIhAIlm7N1ncafCuagxZx2GeKZ%2FmbEkRFMXLbWaRUsiNaLPKogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwsGRovlVubE4sz58sq3AOFm%2FMk3ItJt5Mh5%2F12n7R1s7Uvf2d0oZWDmMiI08hjpv5Fqgc16RchZC2%2BwanhCkDy175YdbQkRqlk9jYI5OZaenYVmvdmTYpYofqw2hwJOhmDeAw8oLyZSb9p3BNgBMn3WCvldAdbkJn8pqufSlJFYndsvJXdCzEmrWjI5xinVR3%2FEM%2Bvsge9TncOz8vE8q3QOkn4EindWBsoxPiIITtYHmlWHbI9Ccgh0YlAjSxQ%2BHC66cZMWhGo8GCLXW0Ns4Lfkq9B4Twsezcne0d9lOah43kmLwVVa%2BpM4bIV94%2F7iVKePsjM3FV3FdMWgZUu5tE6Kk0t8QFTxi%2F4Pe4PN9OhtLT8qBtjuhjtJrZAcAYbz16ni%2BvdrnKEJiPlluAcizVwZMWJJhfGNs4qLhLw0KTQBmH7pp4eiBik3IgIA4OoqnLi8LuEMrGVuyT8IlQTce9NcLo5PPGi%2Ft1C3A8aNkDfJCLsqJ10PKrucpEKE6z6sVnTNV6FnmqhygtJK37Zc9Od3Rjs5fJiVrsDsZYq5RKTa0vWoyrM%2Fm7K5KV435ETMwXykHbNNOZc%2BH%2FnGorbvWu35O%2FXPZ3kUKXqWhEd1C3G4xRlhTvmyDDwzDDwMQ32fIWZDHMUVpqmVtYs7jCurI3PBjqkAcLGHLLQV08BqEd5VT9TGuFGRR55Ll%2FvxMoxZBvDgGPAN1nta%2B2HvZfxTG5A9AVryISPbPxe5LwiXzouqSwEw9MHDqCuqMwi1tHBQJm9Sq6LZKNlOJkhticQdqcRtjQUwWKogDhihl9JlvZLV5bCzDot6i0HNhMBRDtdEfo%2BTZFFVeV7nWdb8R%2BlLNkXR9povS2G7eGxX3jbCIqtVUgkMa09fLCD&X-Amz-Signature=fee4d6308d2abfcb88c13964838fed0e42e9561e9d2604afec6bfb65876eeb64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647F6PEY7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJIMEYCIQDIH0mKPTtouPEJhKhmDwHjVjjttlQ8Qra4jrkToy3u0AIhAIlm7N1ncafCuagxZx2GeKZ%2FmbEkRFMXLbWaRUsiNaLPKogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwsGRovlVubE4sz58sq3AOFm%2FMk3ItJt5Mh5%2F12n7R1s7Uvf2d0oZWDmMiI08hjpv5Fqgc16RchZC2%2BwanhCkDy175YdbQkRqlk9jYI5OZaenYVmvdmTYpYofqw2hwJOhmDeAw8oLyZSb9p3BNgBMn3WCvldAdbkJn8pqufSlJFYndsvJXdCzEmrWjI5xinVR3%2FEM%2Bvsge9TncOz8vE8q3QOkn4EindWBsoxPiIITtYHmlWHbI9Ccgh0YlAjSxQ%2BHC66cZMWhGo8GCLXW0Ns4Lfkq9B4Twsezcne0d9lOah43kmLwVVa%2BpM4bIV94%2F7iVKePsjM3FV3FdMWgZUu5tE6Kk0t8QFTxi%2F4Pe4PN9OhtLT8qBtjuhjtJrZAcAYbz16ni%2BvdrnKEJiPlluAcizVwZMWJJhfGNs4qLhLw0KTQBmH7pp4eiBik3IgIA4OoqnLi8LuEMrGVuyT8IlQTce9NcLo5PPGi%2Ft1C3A8aNkDfJCLsqJ10PKrucpEKE6z6sVnTNV6FnmqhygtJK37Zc9Od3Rjs5fJiVrsDsZYq5RKTa0vWoyrM%2Fm7K5KV435ETMwXykHbNNOZc%2BH%2FnGorbvWu35O%2FXPZ3kUKXqWhEd1C3G4xRlhTvmyDDwzDDwMQ32fIWZDHMUVpqmVtYs7jCurI3PBjqkAcLGHLLQV08BqEd5VT9TGuFGRR55Ll%2FvxMoxZBvDgGPAN1nta%2B2HvZfxTG5A9AVryISPbPxe5LwiXzouqSwEw9MHDqCuqMwi1tHBQJm9Sq6LZKNlOJkhticQdqcRtjQUwWKogDhihl9JlvZLV5bCzDot6i0HNhMBRDtdEfo%2BTZFFVeV7nWdb8R%2BlLNkXR9povS2G7eGxX3jbCIqtVUgkMa09fLCD&X-Amz-Signature=acc1dbce53c2f78a0c583fd2c4bf1a8cc71c63871253988e1d9fa2a134a067ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665X52DWBP%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIQC4ZvcetQ6679MsofheLXlpENbIkGEi4O2iZX8iK1yXaQIgVREQsdFFGTteS66H5KkDnE2sQdCKowvsjHXZKJQu5kIqiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMVg1PZlNj9%2B592PfSrcAx6b5XmKm6X%2FjYtSCLvjv14uPnSy706aZ5Aa9bEQCR%2FFhNic%2BUZ2wchXI49JNHCZBfKH%2Fr4957QpjohEdRs6L5SLicQszuV0YNYep1mnvLQsiWlQN52F0w5cyg%2BzHxh6T707J%2FQUtp%2B6iT%2BT2EKvHtPrbSPuvXTAuks%2FANWTW%2B4kh9s%2BpDLtvPYyjuSxGtJUZgGu2LUk0159ICfHEoTA4XPBZtN6SJeBHMqYWPhlG2%2Bkqkp8GNWctPPhvCDKw1p9YEqXYKOlQVqfymAtNdWK5LHQPSueBsqHe4lfOAk3zYtjML1hZAGDp7An3OzdtAVDYxCcZmo2pI5EyThgng7y5wg6ySg%2BWbXNenN2EbunPbX97jcyM5uDi2KsBiTAw07GhfrUpA1KjbJEZJrxCnNcsexWFJiZKpcJra1tRQ1FEDAHA9W6u%2Fg%2BCzbNswozoY8Bz6%2FTpjCAuFGTbldhwK5woNzA7jOVRrOeXywttC0YYunfrBP4OYGTwP6f253UNvN4F4H9Pq16mg4c0RcbO3EcF0otKwLI0zyzeJfr3pc%2BlKsUrGnrO7QYB%2Fm3RGVrZEibpcbGlvmdvY2%2FFTr5Vvx7CEg6DkIhDBYORL9xE3GWAj3tlVISQyNu4l2HrRq4MNOsjc8GOqUB6l7ru4aWgM9UsjbemZejWA5F52Di3YaVsJO2nEShzXKoXTTpaVZW7D1KtBxWlfrk6kCz7weN8cbQUpfTMEWGJo4Sqqu3w30XTeYhDCH4DX6Nvqqb3yrXd88b7yBHyWyJjktPf42CanD9RUvDURu0mkYijmSPzxKIwpw0ByVaZhRgWfjchacncGpqHEuKq8jX6Jr2wpWRrOUZ9KH2Nw6TU0ell3gY&X-Amz-Signature=96f9d553a95790e97c128d07c9c524e91b19d1590eb84323eedf1bc75cf37d72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666W2J27X7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIQDD2noXmkXWsHChokjzyHVVA0lJRGVQTo1iDsKvu04JCAIgJGxL3GJoDj58nT4NL5U8L8akK9jQLLHgK%2BYZ0UTyS%2BEqiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDfy9xN8hhAIh1h3%2BCrcA%2BC4z%2Ft4CY9Xn8%2Bv5NMMuz6xhyfV0ivxwzawyiL8M84Bv%2BghQDqG%2F6DDU4pE325xHhstrIL4WL74qXru1kHemjGuQwA67JsdVX4d7pNc1WJvGJwD1zkY8v0%2FXzVeisTUuT9kDy%2BxvW9dvNpwwfs0XUWaSVAc9hGzt1ZCCkXRfMcQ2F%2F0UWQRZw9rVsD0DJ75judUIhJtDBV8MtEGTSV9vZCnTgltzCOJofTLXwzJws8gVC4Xg480m1DzNFzIcJ88k666PlWCUf5kVfYRdkLaOPuUJTTIG8OmLg8kvawugafeAonTjywI1RKdhJ6CKBSiVbJADNng6X42IUpAk955yTQJwIiOD%2BsSLaSyINh1SRg5ocZPur406RfkSGM%2F5w9sYDQSWRvARCCYJ33LOFqhZj1V6plLM7Ic1DpJO0HV9aESEBpvl4cfpTCzLYzbsojFcUsDueYByEePQ6zvddjQaddUSpD%2F%2BN730f2O6SwMfeuDG2zPIrQ5fJ1YdF3rHwgpqIsbG1rCKt8qieSKNy0lHhZYTBRh5O1HhmJc4w0%2BPO2jYT2s0O5E2FTOgdU%2B1f3Xw9BbG%2FCzq4ZrxkpG7YrcXSjZvniyT6G5tQryaGuQA3l1V4NuKuIpzTtr4IclMKeujc8GOqUB882LS4S5sqB6JJtf9YneShT63kUc87UNVPoPULJRGc32zl6RHd1AWpleNUANnP6G0zBjdwIJoUBAnSV8wjhapOjT0kWF%2F0ctI5pbhuNs8%2B80Y26nss9IOysRG5fM72ZrLrJlYQU%2BsoC85cugGV2VC6EXellY8kgNDzNVeVZ8g7w%2BGEZx%2F19PIMn2ezQ9z88zLmqUTi09i2v9u73e%2BCPIqHHXJeVa&X-Amz-Signature=407bd6c05687441080fe0cfd425485b34316b499ab0d71a2ef8e5e00c7802359&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AOQBOO5%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIQDkw43Ugm1PHhOYFqWXD8rKu1jHMWBni9qa%2BqwdnqjO%2FgIgJrNJ54FzL5pZh8b1F0TdkAel3nh3E6h5fwwYxjMxLe4qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH26qAF3ycXnmnPVByrcA1AuR%2BIuhG6KkkoYGoMdo33m5mV6VadBlqlMcfrYHJ4K9jkZCXx5hZUnDbnET%2BMta7fitnbKM3uVwA36rpf9nQcWWvEyc%2BgKtQuNPjgiSq%2Fh19kxeKBRn%2Fgqdao0MOaX2P4ds8bOETkLwhbEomUN3lBCiP%2F7Ht1FGA5OJu8Cl07mEUPOO6t%2BDTEmWTQgv61KLyL8aXhBgPO3vCUayOUe1gd4HHG7EbTVfS%2BrK9Xcyqk3WwEqEvbDyg7J2cnJp1ZMqT%2Bxw4rvRfmKS6oweE0G1IVyIFzOeBpEC2Iq3AApIDKFDFsIQGYihlame3s0VhHFs%2FIrSR%2BJzWkg7NSfq6bbN8Z555K%2Fs3f2xAyfG56NGmmXe7cNEpqfVWSvJOqJf1KB15Xuz4j48NRbleibBDYawduWDVX%2FFn4V9FdNodUVurtQ3u9YSAMzovlfFuOBXkbKrQrmT%2BCRIXBS8Ce72TzEUIMJnw8ESJg3u2auvEL5wTSKjOy3lKveLOq6F61Ur4WGuuBJgYfQUd2KUq0aaMKmvYewa%2FF%2BC9yJDSKLhI30E8SgThrLdJYXN7qjR7Ek064sqYusF4gc6UlkT%2BDUuI3mv8qS4tPH2i%2FfLUboRGNjBfNKUvgdimJrlXXPVRX5MMGujc8GOqUBflQKqkgTCYAa%2BxWsCLh0eqlVBSJowigFaQR81shL%2FcKYI2eKZaNUM27wtGkR86m8mKKEmhFfuHqQq70cdW7DWVuPc%2B49vU2mZnxu3Bd6oRwoS%2B10OTgaWPV203S1FKdFBgXtqJYprEfszOjANozCi2%2FmzXp%2F0IijjuwjZYPuRR2Lq01q5dVDbgYUV3zyqFuhKm3hPx%2Bc1kevWOjc6RQPi4FiNQKM&X-Amz-Signature=de24b154ca0bfb5969d355b802054f5930f5c9f7645939fe4079c7ce997702c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAZ3AINB%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102833Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJGMEQCIHURph1H8qDMJqRp2ScYxDqLUbe59vecn7tX32Xd8CU3AiB5d6QVQEkM4dWV%2F9BStXyeu75bFcn4Er1z9Tyif27ySSqIBAjr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMK2ybAPOLPwyrwTmQKtwDDAaMCcg8hjPHA2bCWzbdzoBjO%2FRI9c8WFiZywtjyNm8Gy%2B3SExQYOd4KdeWccrq1sYx0Pp190a4IB6TXOeeZOxdWPXDAZP5lCN9mOw8ecS7z5Mvd7c3qqgvNDPMDJ%2FMsqPdsCeEQT6IAaIi5uTEr5p%2FWdyzoEYrVReGpsJ%2FpHJpgdJYcO1GX6vxxyR%2FtOVzRlld7xQr43UIVT5IGN9hrRnV%2BbvGuO3QSp4kpB%2BIrpwVqSgXXhC3dH3i%2F7zBBgNCqdi2Lr2RngqgDMiOm54B24LtT4jtCaPgVgtfI7XKsZfAjB8UzrJHKInRwM3cUpR0FhFQHf8kAd013EUX%2FFRX5%2FdGfQhdgzwm7y2oZyzpxsrWq0OubrwhCY4%2FlFDtD5UzNJz3Ch%2B0H27iCWnqDKRMJGjjKJ27uhCRbiMurvWzPE%2FLsh0vH0L91TPU5YFSkdajMFkkZGaU6fUeqCm7NksXU5eFeTFq4Fqp4eUJ8EJypcWLyGha5kiKS2opslIVhCVbEh9K32uPSKXO7rVRdbajN92EOC70Rh9xWmWHhXH10fSOR2ZvaJo%2FaEhvZjMwkeqCzzuw0jEUYqpOG%2FrZp3DRCi5IFthfmjynFklQ9BV47hzx6F3%2FqCv2R5iZmMmww3K2NzwY6pgEZD8h5tcXr70dzrFOLtHOSEMOXxPVGivQi6zDJ6mBOhiInY9sZryDcY24XNYhSKjV2YEbP%2BVaFt0bhS1nu7XwrMAjpOVzZCAkUz6ZA%2BwpJ2ucZMZxnfow%2BwK%2BAF9EYNWZNqsCqwdjRStQXTP%2FW60JbRkXVIMevBRIJmfz5AV83vjW7Y1vivF5gNztmH6zR7BhL%2B5rl1TZZVRz7PRgWJ3qfuOPhf362&X-Amz-Signature=3cbd0bdeba6c32ecd926097c60d9bcc75b6ab458c300d91b8b5756506920ccf0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAZ3AINB%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102833Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJGMEQCIHURph1H8qDMJqRp2ScYxDqLUbe59vecn7tX32Xd8CU3AiB5d6QVQEkM4dWV%2F9BStXyeu75bFcn4Er1z9Tyif27ySSqIBAjr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMK2ybAPOLPwyrwTmQKtwDDAaMCcg8hjPHA2bCWzbdzoBjO%2FRI9c8WFiZywtjyNm8Gy%2B3SExQYOd4KdeWccrq1sYx0Pp190a4IB6TXOeeZOxdWPXDAZP5lCN9mOw8ecS7z5Mvd7c3qqgvNDPMDJ%2FMsqPdsCeEQT6IAaIi5uTEr5p%2FWdyzoEYrVReGpsJ%2FpHJpgdJYcO1GX6vxxyR%2FtOVzRlld7xQr43UIVT5IGN9hrRnV%2BbvGuO3QSp4kpB%2BIrpwVqSgXXhC3dH3i%2F7zBBgNCqdi2Lr2RngqgDMiOm54B24LtT4jtCaPgVgtfI7XKsZfAjB8UzrJHKInRwM3cUpR0FhFQHf8kAd013EUX%2FFRX5%2FdGfQhdgzwm7y2oZyzpxsrWq0OubrwhCY4%2FlFDtD5UzNJz3Ch%2B0H27iCWnqDKRMJGjjKJ27uhCRbiMurvWzPE%2FLsh0vH0L91TPU5YFSkdajMFkkZGaU6fUeqCm7NksXU5eFeTFq4Fqp4eUJ8EJypcWLyGha5kiKS2opslIVhCVbEh9K32uPSKXO7rVRdbajN92EOC70Rh9xWmWHhXH10fSOR2ZvaJo%2FaEhvZjMwkeqCzzuw0jEUYqpOG%2FrZp3DRCi5IFthfmjynFklQ9BV47hzx6F3%2FqCv2R5iZmMmww3K2NzwY6pgEZD8h5tcXr70dzrFOLtHOSEMOXxPVGivQi6zDJ6mBOhiInY9sZryDcY24XNYhSKjV2YEbP%2BVaFt0bhS1nu7XwrMAjpOVzZCAkUz6ZA%2BwpJ2ucZMZxnfow%2BwK%2BAF9EYNWZNqsCqwdjRStQXTP%2FW60JbRkXVIMevBRIJmfz5AV83vjW7Y1vivF5gNztmH6zR7BhL%2B5rl1TZZVRz7PRgWJ3qfuOPhf362&X-Amz-Signature=676e8fd3e0e6c9ee283bf3947f51c8e9fcf638005fb5c44fdfced175df3e6c12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IP7ZG7Y%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIFotJTMJDg2ylLazW2LGWf33I%2B6arGCmoZiMEDVtEXpYAiEAua7cdoq%2FjRN5CQM4Z0G9gR%2FKRIhrxTPHrcU9UI285UAqiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIsUoCiWc5abHpQ3EyrcA04RTqKvbdNY5mZ4RVTnTkkUt3ZDYmJjWrg6pfhlHAtxwi91Qyysz89AuLG9th6IfJzUEKW%2BDm%2B0fR2gWVENGvuYoxIOcTq6o4LyL8dVWAmbRSTslNMn3iKacUair4ZoFxW7lHBlt2S9%2FdMbZQG4b%2B4jOHAyk1oFTa8yDBfD6eJC1KI6krOYlT0BPdlfGchzq6n3pnQb%2FdVfOkXr%2BdI%2Bfe40%2BNZs9ubQLaDQzIXoZGaFnbOJ62Vb2CC211BNO%2BPcnxfd11vVSt4lJ4ldgBg5K3c%2FBLy4iQaxChSoRvWI4lIA4rzKy2CPbm2q%2BxtYC4Qm5lfM2GXCXp5pcyBX%2B%2FhbpN1pGfOq%2FloRMbMj1AwtYy6In1yV3fl8Nf5FMKGDe8gBwKrbtaes%2FtZqiDWcWtpe7mKQMoPpF8O4pC4GNuIpNOSAZe%2BPRGVdWyZ1l%2FiEpOuXCtSAS4zpmvrqOaJw3J5xiUZcX9Y429q%2ByGv1AY6bt9NL%2BT9YGEN1iOp8BBF4ao6eGEqmAIl1iUk5UDfGwhgra64S7xsyS3Y3JTS7bsIQkVw%2FK6Scm8qmZh%2Ff4UqZTPa2aDcSflDRct1ikKnG3sQ8bifAh9gYKYpGLcRuU8KAumCiitXrNoiXB66%2BZLGaMISsjc8GOqUBQTmMf8hh8SVcHhwLhVzbu30Xq6NWuRVTYklYgR8tTwkq5X7Wc43JzJakvmPOYqoYJnykPQfupmXlgYrYmKYyXof4QxHmeNm7RquPSTMZmn152AZOjmX%2BosIlA5WlovXNvXP0%2BMFYpQk7fQBVMBexZhJpDkQA5RXxNcLv%2B47UToeIArtYzwxB%2F17D3TBv8iVlt7s%2Fyfgem8cifywLbxB3V0LlJ1HS&X-Amz-Signature=4346c8e1f283c7449ed888020f1020cee977039770ab6f4a31961664ab01fb7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QENHPMKX%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIQDsSMGFygWxnMAQdNs%2F9ETTnUfcjiwOTwb%2FpntZEhitvwIgffzs7KLWlvXL8OMBw2rOEYvEGxLJpPPFdg9EHFwC5h4qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPrpORxdJFMRHCqDgCrcA2G%2FGNkAJ6di5UdxwyBV1Z5cv0hc02eEOEJ2t%2BsTV8vqumOpV8p9nvetucqQ44p3U4wkvZmQQmC9yb0083fgj28LR1%2BIezNacScjDTtxkGnFglOKtDOUG3rHHVHzpDpFSsOUhIUSgaPuGiw%2Bhc7OXhO3TFHZHHfXlGFQfLmXbYu%2Bfn9GPg9WuL5ommsHmncHvxC3SYSCvmeDHjOOcyeOKV5WG2P2CYG%2B9NthCQWCOzm9c0MJRM9IBc%2ByFLZetDtf4cZJF7X8PHU%2Bvg0NrQQdt%2Bm0mPhVxbPW6hcusIUXNrooi12qmepLlQr%2Banbab%2FH%2FyTDsDQE88ZK8QszFcvjC8pkoKP%2BBne1QHUWajaCJO%2BQLEqSPY414jD%2BqUxHdcMTVVQUb7a4WSf4fKtWoX2HJhH1BfyfPNhAkR357Iv4c%2FDnZIqCRACxc6GGnE6O1Ul3mYIf8Nc9tbbLeaHcke1FFhTC4rDePw%2BAzPq2dUP8sltwHXaXm23jgs3dZaemODge4Oi7JPqsmrUM1neAvBAMRLqh3xTvkOakw8kiHbz3B0fyAEbtN%2Bq482njKOAWmnwcS%2BCPUpZJT19D9XIs42jJtTkwvl%2FxRLY8lmWnp99VuHEmi6%2B7tH%2FluWdU1kQ5WMKKsjc8GOqUBkJH0NOQpZQt8yCbz%2BVxu6tkiEBq%2FB7WqRTKR2KLNrl%2FZTxBc3Eccz4G2CkMHgRDqDstk%2Bf96IZxhp9XAQgVR61lisarWRcPd6w6onJUflmHo1oPf7md4CiSCy5lNabV65No%2BnV5lx%2BnXfu7EtCAEihmNM02V845SBRW%2FTkEhPmlcAnDJygglcIhRLtSdMJxtllFv4NK%2Bzpo5kLYswfGOAW2TOIQ1&X-Amz-Signature=d14862acc639db128ddddd48212add194a20836f3269563e9e350fbad32e13fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QENHPMKX%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIQDsSMGFygWxnMAQdNs%2F9ETTnUfcjiwOTwb%2FpntZEhitvwIgffzs7KLWlvXL8OMBw2rOEYvEGxLJpPPFdg9EHFwC5h4qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPrpORxdJFMRHCqDgCrcA2G%2FGNkAJ6di5UdxwyBV1Z5cv0hc02eEOEJ2t%2BsTV8vqumOpV8p9nvetucqQ44p3U4wkvZmQQmC9yb0083fgj28LR1%2BIezNacScjDTtxkGnFglOKtDOUG3rHHVHzpDpFSsOUhIUSgaPuGiw%2Bhc7OXhO3TFHZHHfXlGFQfLmXbYu%2Bfn9GPg9WuL5ommsHmncHvxC3SYSCvmeDHjOOcyeOKV5WG2P2CYG%2B9NthCQWCOzm9c0MJRM9IBc%2ByFLZetDtf4cZJF7X8PHU%2Bvg0NrQQdt%2Bm0mPhVxbPW6hcusIUXNrooi12qmepLlQr%2Banbab%2FH%2FyTDsDQE88ZK8QszFcvjC8pkoKP%2BBne1QHUWajaCJO%2BQLEqSPY414jD%2BqUxHdcMTVVQUb7a4WSf4fKtWoX2HJhH1BfyfPNhAkR357Iv4c%2FDnZIqCRACxc6GGnE6O1Ul3mYIf8Nc9tbbLeaHcke1FFhTC4rDePw%2BAzPq2dUP8sltwHXaXm23jgs3dZaemODge4Oi7JPqsmrUM1neAvBAMRLqh3xTvkOakw8kiHbz3B0fyAEbtN%2Bq482njKOAWmnwcS%2BCPUpZJT19D9XIs42jJtTkwvl%2FxRLY8lmWnp99VuHEmi6%2B7tH%2FluWdU1kQ5WMKKsjc8GOqUBkJH0NOQpZQt8yCbz%2BVxu6tkiEBq%2FB7WqRTKR2KLNrl%2FZTxBc3Eccz4G2CkMHgRDqDstk%2Bf96IZxhp9XAQgVR61lisarWRcPd6w6onJUflmHo1oPf7md4CiSCy5lNabV65No%2BnV5lx%2BnXfu7EtCAEihmNM02V845SBRW%2FTkEhPmlcAnDJygglcIhRLtSdMJxtllFv4NK%2Bzpo5kLYswfGOAW2TOIQ1&X-Amz-Signature=d14862acc639db128ddddd48212add194a20836f3269563e9e350fbad32e13fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JUCDMMM%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T102834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJGMEQCICczJartO2KchMZor5CMyCOC7LQ8Vfk5boL911xKV9wFAiAIfThXQiqWTTZpGnO7peV%2BV7%2BFsZhX%2BWhOH3R9rL2VviqIBAjr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMH%2Ff5te1hBYWbuyniKtwDWLOenS8iMTVDi3kUiJXt1fkknJqgsD94xGx7XTfvTUGf3D8ZHVfUxn%2FmDiiRNtvcxrODC1%2Bo3SY7PRY1O5mKGPolZbm7RcAw%2FcPmYFSAVkng9rUSvAMGJvI%2BiBk0FvjBn1tM8qNZuBuFKC9yPKHG%2BPy9GcvwHqmIsnV8hJO0xY3LES3tfo5iHRmxHXj5nkv12tfEDlNbRzB%2F9VlxIZlLu9cpVFA5zpKQ1YXlI634zFFxN14dHaiAO7uaGr0W4nzMQtEnoC3ImqALFG4NJ5yE2ZnYXqt3rV%2F1fhWjXaOAJEIBJwQYSNpVc0DkXAPAlIfavnzXcsZ1EQ%2FCis5LJ7EzUqNpxb8N47o8nuLJm9BJlYs%2BTHyCBy9pn%2BLnxWVkobe6XEPpxNFwBvN3XjbiJlURKDUDSzUDvK5qw4hn%2FPRi4YtPg3ST40tT2GpsuvAsirAVHpiUooSRzEJYyO5JGykLMlIjAHwsTFIv3xL7F%2BUPUUti8iAA2QfGIBAwPTiV1s0%2BO7c97JWrlgrEUKRSqxTqDBzvKDPiC8xeKYYw6kXDPzUurgBT9zdxfPHtU%2FSAhkP1zziJxqCmu6yclVI8M1ZCpHXlJFwmnDqDgS3UVxEaz5Ilhafbg4iKGDKBBWkwj6yNzwY6pgHL1KrwpEREYAYqj%2BgU7DT1DF%2FrjnqIyqsxjelnCdmaG7y9U0qhC0mCUYHB54ZeoOAvkibBjGlaKOqk9G4%2B5oD9SHOTcdDAja3bOklnLY1MZPTR6xfAQSrqDbKJe6OYRvHKu1xb0qSs5dvplQj5zcI%2FnNJFP5NrLyxDnwjpgA3wyNhCrfAOE0iD1PbrgvSgW7j6gyN8ftZnjeQ9SeWfq0N91cuzLfZ8&X-Amz-Signature=1998156c6b17fdaf8201bb629d2fda75a81fa0cde5040a417e3990468cd5f61e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

