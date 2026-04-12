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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CPMUWSV%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICNW2XOJlm9YLqhugBV8lOvnM6COqDJAfnwZnB9HD68FAiBi9IUXYGS7718Y%2B%2FgX4ne1NSkcyU2p52IIXQaUegPLiir%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMg80tCxd4gNc3vuJyKtwDkZelQIwjUGnW8wnlArdVlmz%2BflRnbQbq%2BwFE%2Fy0PSswkvnCozcENeYbNvx9g%2BNZs4EGLtu1iBx1m9IQOJCANIwhf%2FzzCOy3fu%2F5ot1L5fuCYu2dM935v1X04hMvvBo0kDtqpVHvVV6szU3K6ejQI6gXd2Pf96T1NAnfgz1hCn%2F6qWo7U%2F%2Fr1aHtQ1qTEM77KrUA60muhDwiBoANzd20ETyxM2NaWzWchhfCJopmdMgmE5ilYdAFJJTVLkdEsHJxE1z1XrgzCKBQHo5u5OiNTuHrvgGZ31lEA9M6N%2BNTQNlrq8KWtg1Kqe7b03ECQlUb0h%2BZLZftzdnmRshEqdHthN75rQFT5WgqFN0vg10uEtzPjcJDm0yWD1DkxYwUK23BYkkIMpRDd%2FqkvcRDCs4P7rRDF3li%2F5cahU4OEkcHCMdcKmK9LkuE7Onnm7KcYuVIvLcqI8czzJDMwXUuZKbJuyW%2Bq8tyAcqckhg8uJm0GQXHdecSGTlVlIU4yOiZ%2FQXZEGqq974TVDm9jr7MNXw8RVC6jUIptF%2F0sY9YYj8VHCC8RwP4fEheV1NTSXKDYrQIVtGb9yRByyFjRsBczYLpdfDnzpgbHJ4qaEjiQdd18uaVhy7Tc9uhFvezakdIwlYHuzgY6pgHL%2FCuFXntxPe2BlAMSoTWP4nc5DmEoSo6n2XwaCEfYhj4N%2BY%2FBVvkz58tEeb0R7mPRv7vX4oh4cI1JRy%2BAnN%2Bgknzm0JYydJXOlqM%2FHFE9kEZkENkvwMjWRxtgr6OqtC%2FhyTWC7sXfSepOAmuPEVj34IdyskXotaxCpCdRx8%2B5GTdBnjr%2FJIlhvDiWOcL8MME6bvEgR4fDytZXYoTKrGdY6cSJOruF&X-Amz-Signature=a2bd0157c4227f8c1be7d38c76fb73bb6930904eef763d2b032175607d8319dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CPMUWSV%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICNW2XOJlm9YLqhugBV8lOvnM6COqDJAfnwZnB9HD68FAiBi9IUXYGS7718Y%2B%2FgX4ne1NSkcyU2p52IIXQaUegPLiir%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMg80tCxd4gNc3vuJyKtwDkZelQIwjUGnW8wnlArdVlmz%2BflRnbQbq%2BwFE%2Fy0PSswkvnCozcENeYbNvx9g%2BNZs4EGLtu1iBx1m9IQOJCANIwhf%2FzzCOy3fu%2F5ot1L5fuCYu2dM935v1X04hMvvBo0kDtqpVHvVV6szU3K6ejQI6gXd2Pf96T1NAnfgz1hCn%2F6qWo7U%2F%2Fr1aHtQ1qTEM77KrUA60muhDwiBoANzd20ETyxM2NaWzWchhfCJopmdMgmE5ilYdAFJJTVLkdEsHJxE1z1XrgzCKBQHo5u5OiNTuHrvgGZ31lEA9M6N%2BNTQNlrq8KWtg1Kqe7b03ECQlUb0h%2BZLZftzdnmRshEqdHthN75rQFT5WgqFN0vg10uEtzPjcJDm0yWD1DkxYwUK23BYkkIMpRDd%2FqkvcRDCs4P7rRDF3li%2F5cahU4OEkcHCMdcKmK9LkuE7Onnm7KcYuVIvLcqI8czzJDMwXUuZKbJuyW%2Bq8tyAcqckhg8uJm0GQXHdecSGTlVlIU4yOiZ%2FQXZEGqq974TVDm9jr7MNXw8RVC6jUIptF%2F0sY9YYj8VHCC8RwP4fEheV1NTSXKDYrQIVtGb9yRByyFjRsBczYLpdfDnzpgbHJ4qaEjiQdd18uaVhy7Tc9uhFvezakdIwlYHuzgY6pgHL%2FCuFXntxPe2BlAMSoTWP4nc5DmEoSo6n2XwaCEfYhj4N%2BY%2FBVvkz58tEeb0R7mPRv7vX4oh4cI1JRy%2BAnN%2Bgknzm0JYydJXOlqM%2FHFE9kEZkENkvwMjWRxtgr6OqtC%2FhyTWC7sXfSepOAmuPEVj34IdyskXotaxCpCdRx8%2B5GTdBnjr%2FJIlhvDiWOcL8MME6bvEgR4fDytZXYoTKrGdY6cSJOruF&X-Amz-Signature=a2bd0157c4227f8c1be7d38c76fb73bb6930904eef763d2b032175607d8319dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GGLJBMN%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFLm7LXH2FomgWoFbcV78FVXmjJFg312PpOBel26tBcyAiAHRxavvKtDn1DgkuVR6PhBMQyL%2BapA6FDpApZGkIPKDSr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIMnoKaEIhXztgPg3fHKtwDdyuVMNVttH3UCdTbhltf%2FwPGzAZV%2FaN6P%2FqwMALZmvr%2BkjAYyBSRZJ2R20iPn0yOENj%2BmJSfe5t6V2I3YfOgHV3k9pXsFS8c5lG2vwZIOenbSFdHCwUwfufXEPLECZTBM%2BkUgSiYzVTDeOgIPxhgZeay%2FNH2Ho4jeXddumOTB40Tkk%2BfdhoMr4Q32W22Y8qudUYBhc%2FbNlZj2E3jfBk30t3XwjQY4RH2TphPJ34ithhDb5rwbPfJ%2BMEyME9eufzRFnMx8TsokkzYyk5b602vlrJpaE7V%2FZNKOeLDJhTWS8YQ17qrzj2nDLLSw0BrmqgNUxDfKT5FOlqn6gTZVaHJizWY7ldL6uNJTGa5SIZOlbDIwIII5vMA34RYN%2Bbxb8%2BxSZDGJD27Kg4cAShlg4jVRzb9G8l7x6ng5b7DuRGI79KLClZRM80gu3RnGr%2BnFgugE1dO6JAVgzPX2mf2lE0F%2B5SajP18HIuO3UsXLZnTvVzD%2FlUXqVxk82Gm2PQ0UijftL4RdqSQIgVC2fZrS5Ap%2Fc0Jsxuj1RrS322Cbvijtar%2FNfzMR9cZtI2Ss8zCa1QBCjeYhStqEGAtlxTaWnQ41dYi7x2YBfVX1VmhsLs7weP%2Fy8dlxdAxxVR0NVUwqfbtzgY6pgGSxfn7n17kQrcJZ2LSaLWJsHlJbZbB0pVUv5jk8NLo484S0Eev05anYG3oB3tZkVgLuY4g7s0uDixkAtmGgJqE5Vow0993W%2Bf3aVqIJFLV9X%2F19yKfJ9CgB%2Bmu69mRJJGBu1nu2bQzer1t3akIQHwXth4KeNDU8%2BvCcoKd%2BudxtcLywbz7M9OogbxgVB%2FZIVu26IARoxsZB7%2FwHCQNSXMEJh5ZuZXm&X-Amz-Signature=02001c4394e6a50b578ac01f3c7d33339f3b898b03a3cbc8e965997004724746&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJIBRHWN%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGU9APfCeVqsvGjeDQQ9ZsDHVTVcje2qVkirLssimGqqAiEA5mANFT2YwMo9Hw74MXBBJkXYqy2HqQ1unCWE%2BuE9PE8q%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDDqBEI2AnrqtQCKWbSrcA15tEInBE23MM9buq7izq1bIIwOdJ0fvS70L3LUK%2BzVuGjGTbiHicbxX5YR07X19QB8gmwksgYh4i1icIHlILJh6yxy1%2BJD83iduiJ7G9dzy1J36Tt%2BYw2pMedmtA8AfMg8lIObHTWk2GpCz68kSXDRaYnTV9TRfSL7yTiKfYBWAW5u9uyfe5yCEAh9%2BcqFLNnh%2FooJBWkfKiECcOsm6LZ%2Fu3if3ptoT7Neee73cqqz0Lx2jJ%2FzDnhYnHlTER2arDE2q7Ol4G7%2FxywLrMLRVImqCG3pobNBEJB4P2mDz81uyD%2FwFCMLvAEM7%2FpqTGnlud1uVz1KOw%2B6ofNXYZ8L8InraUdyeu1lBd3k4qzaETgt4QrzNlvaB6xBqaMOxeLF79XnjIpDYY5J52nIe6lAdyNbr9Jym3JmeXy9XOLUJUMkIlstOB9%2Ff4TRd9MB1goUZTNdYlbmpPrcWOopA63Tk1XVqEx%2BctMTyJSR8W15OR9awMkTUSJdu6Jew0%2BaLm5CXCZ1vyUos9vPW3ygwWkgD40TrmEiAGCmn5Qjt4Sa5XbkSEL6m1KfdCr5bV2njyKjrJcOEg6v9bGcpjWpwFN864WWUeRasTLV0HInxAaq5rNVHiDMA7tYHb85y5rERMNaA7s4GOqUBrRhxz5k0%2BbueCm%2Bh0JVIow%2BOxrlYDNP42Le4wXIozq4eW8qa%2BNfdgo6vLwfxBqs2BAGIS9maHTnEmXWKNTW%2FELSlzscew75GFfTktpb5PBmtrhGoMqFMpa%2By9qT2HLUAXpiQ5ydYn6YkFAt0ExQgF1kEkerpin1iIoGZMVfFV8iRNtt9yI4Jf466kjARHDEGuXoRlBho5MT1AMXeIqwOtbYfw5ac&X-Amz-Signature=69f5f8998b49503c5e45956692cf45bf9891861612eb54aea3aee2b0880b6371&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJIBRHWN%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGU9APfCeVqsvGjeDQQ9ZsDHVTVcje2qVkirLssimGqqAiEA5mANFT2YwMo9Hw74MXBBJkXYqy2HqQ1unCWE%2BuE9PE8q%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDDqBEI2AnrqtQCKWbSrcA15tEInBE23MM9buq7izq1bIIwOdJ0fvS70L3LUK%2BzVuGjGTbiHicbxX5YR07X19QB8gmwksgYh4i1icIHlILJh6yxy1%2BJD83iduiJ7G9dzy1J36Tt%2BYw2pMedmtA8AfMg8lIObHTWk2GpCz68kSXDRaYnTV9TRfSL7yTiKfYBWAW5u9uyfe5yCEAh9%2BcqFLNnh%2FooJBWkfKiECcOsm6LZ%2Fu3if3ptoT7Neee73cqqz0Lx2jJ%2FzDnhYnHlTER2arDE2q7Ol4G7%2FxywLrMLRVImqCG3pobNBEJB4P2mDz81uyD%2FwFCMLvAEM7%2FpqTGnlud1uVz1KOw%2B6ofNXYZ8L8InraUdyeu1lBd3k4qzaETgt4QrzNlvaB6xBqaMOxeLF79XnjIpDYY5J52nIe6lAdyNbr9Jym3JmeXy9XOLUJUMkIlstOB9%2Ff4TRd9MB1goUZTNdYlbmpPrcWOopA63Tk1XVqEx%2BctMTyJSR8W15OR9awMkTUSJdu6Jew0%2BaLm5CXCZ1vyUos9vPW3ygwWkgD40TrmEiAGCmn5Qjt4Sa5XbkSEL6m1KfdCr5bV2njyKjrJcOEg6v9bGcpjWpwFN864WWUeRasTLV0HInxAaq5rNVHiDMA7tYHb85y5rERMNaA7s4GOqUBrRhxz5k0%2BbueCm%2Bh0JVIow%2BOxrlYDNP42Le4wXIozq4eW8qa%2BNfdgo6vLwfxBqs2BAGIS9maHTnEmXWKNTW%2FELSlzscew75GFfTktpb5PBmtrhGoMqFMpa%2By9qT2HLUAXpiQ5ydYn6YkFAt0ExQgF1kEkerpin1iIoGZMVfFV8iRNtt9yI4Jf466kjARHDEGuXoRlBho5MT1AMXeIqwOtbYfw5ac&X-Amz-Signature=50fafd70f4d4da077d443466e6fc591d98c9debf5c5eeb8eff66fd23b9674b4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667R3OVTMU%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8juE4ZdoFUaZ0%2BPPnLamBctkdOsfUHd87232W%2FmICnAIgNn8Y%2BbhNk14t7JZjGsvlYY97jmSBt1ms5G6MMWCPV6Uq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDDPqAFjcsqn0%2BgSbMircA%2BjUEpOASWN%2Fj8TnnDXZ%2BSB9h411AhAn%2F997PF16d%2BDMUmut%2Bias7ket2hrZgwWJEkf1xXERPhdCEmyz20hgVCsu5rVZtY9V%2FpGwK2qy6MeWCrVnAIFZAJxpUhCn7VmnaolY6xWrivmk%2BZPR1uwMMrqEo6hH8xSMp3YgN%2FQ21RQEAH6w29u13QlDFHul0rPmz7sn560VBmGsW4GA6X2Qde%2F%2FBeu6rbfkLvaV9KSnXpiNUjDCfs4Tyaz8sDBHlEoeHVcobfITFh11GYj6mvrNYZYUooxqTaEpkUQjSc2UaVNhJRVy8CDieDda8KQNHlc2IQGyCDBmxVrR%2B3b5d4gXPwj5UvFkqgEfPj5hYIy3AuubvFVj4JSc%2BWxCSYW9wyqMdk9Ovh588WDdyQBUinAvR5yiVqZDt8AwAHWFaOaBMAO0qbL71xeXeuFuHBuhZTxig5I23oiDSq9qVrTyOyjHj%2BFA%2FxEXaCxfFIgj1izHw%2FruEJbCVzYAiEFawwx7DXai4NwhXulzXhM4k3w4WVRiaerGmGMU70eIHpNXPx8VjW94qD17b%2FhA1KXZdKH%2FB%2FUa2Q9Inr%2FJzsUXweiIEDkgwLMtOJOrFtFLr4V%2BuAGlONPdF1kkkhsVIRoQhigyMIX97c4GOqUBUH3b%2FTCID1H5iN1rCxTucCwG5jLUeIPmEi3jf8p5MnsyU8xGEroTiguGMG9GmidzKG3HOy7XQQCTgq8YNHKWCuYqxjaEJEj31qujAs5wZGc%2BoB1IrOfTqCSmobSOlUJETLItVn9pV%2BLpfpnbAv7dEBOmxJP6BHRfrNzZ11eDNMAzjHA6cMdG8xfdiCboizoiRwloKWbaO%2BdLBbXL0bkr7amSCogs&X-Amz-Signature=5027faad1c929fecf72fc2f53af2122bc1114b6b2f37f309fb604ced1b99df09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4HDMEDE%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCEZzwGIDSfYUuXfBNrP4lFspkXHzp1joRG3YmJdrHRyAIhANa7y7FWX4RoesbllznNkT9TxA1iq9irXG0yxFQRXShIKv8DCFwQABoMNjM3NDIzMTgzODA1IgyCgz%2F9ioyUVj%2FOh7oq3AMndAO%2BYD1%2BVII3uDQ5GtO1pPiYXrdCvkSnkTfzbjO1PxGYMHCnWBXJJ24VnlU37h5TwoJHKrlGXG8a%2Fm%2BMfUvgNCKmH4INWUfQ5b%2B3rtlMGVmHEx9ryL%2F1a6hpJn2pI%2FP%2BwujODTcuxHzWeN3SWIClDjsJPPR9jPZVUa%2FxptJh3sh6nlpQDgO1DviRL%2BElL9Bt0b9KIVh5qFit0S1NOHzxwqil1q2doSMV%2B03lhbT%2FTr0S0UIOiDW60lnmlTszu1SQVvz%2BlWaYKzwGXyxtx0PFSLOATPbgChN54SbpRbGO1Uc41cVqmygbSYQgODSyfouegTonjsY8OCAcdOMXybQipV0eEFkfNgP2y1dUaDD%2Fj7Td75bqUcuyLBceYOw%2B8dWcIrob3XU0hcQq9coC4lhaGSz8fWU3yxR1UzkxD1TuCuZMuOCo280%2Bqm027DaNs%2F0O7XteFYW9Dmsi6mowwr0UyMfLmfmSXNtwgdgVrQItc%2BTo8lxdpcJUGqr0zr2eY5OFUwW5%2FuDqsZVYuXKNWLqlfs3%2FCpRU%2ByMmzPeTB3Qvp7Hm9EqEZXuAUPJUz6oPthmGASYj2PbMPQVBhbKHdx76UdTWp4jtA0j7dylKxBmJba%2FsUciioWaL71k76DDY%2B%2B3OBjqkAUMUgnnK08WIv9IT1MwA7H3daw4pulVL3ApnVrbW0qHAtEYlllNveuhL9o9JJ5pNmIMqBH0O00UwPgHvb44hnds3i9%2FvrhO2bElqLKYzudJBdDpGAXMZ3s9y8ut8z1IbhEIsBB5DfLiE%2FkZ97SRN6GCdK3JRf81pmXKnffltkGOjpqZR4BfUH2Ef5EJxBmLRETc3ewjjq18NdIJTy2jAu5nhWfpk&X-Amz-Signature=609e7a9a5bb13eea83127b6613996103f01ea16429a22bd0b96caad7a05cf92d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHMVVHLO%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBhpA6OIc%2Fn5a8SRB8ohOPqff%2FdwNq4bGsM73%2BnS27wCAiEApSroVLjqSFeZy7r649X7vYJrAyVFFpUwTyApJWfgz0Yq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDEHNBrWTtbL6H7uwHircA6LmcOF3bLO3Wc2WnBMjksAxmz03idNKjTsOzPkZIQKZJ1oUkOmZ9gwip3wb4KAX3xc8dnVF9KkZbyjF1gOnA4sRXg4LDGVywEHccN8mJ3hxMp49ndNzHGDl6K1seFHDOlPHuu549DcMk0y7tF5sinsf5w0e34mCh2xQPlnOI9qEm9XHr8K6BeCjVHFuoBd3dbR3Rzvh70qhOTNloEUfHwWpaWwDK9YucGCVy64ZjP%2FtE8lOq5zS44OpGoCVbsg0E2dgNEibM0sj0vOW5XzzUJmr7iH6aMz6OFj8HW1%2FxdlWURu9FvRTTpDX3dQMJ3xS56JmRzO6fxONFZjv9FZMdcsbNZVJTkJzw9EnRIxqTjWe9MQLRXCcy6cC26fnmSU9P%2FGUR777HiaR1VWDeFU4WdbBgEJ32H7O7DsbpiWmBRv6m0lBOl0DQKowHQQmEtZox53Mk8ClSY8cNSSg%2B6xK8BRhrwXDEeVEazjOteSALpvfALYzDlsKlt84gQf5TjSKuWh6syEForqIv9a2YoqInSpGaN8wmaej3tMzJpjdmIYQrm8iWhtTQChuAqEMwg8HLpeAIe6EiGeqsCrq0voNQgc68%2BHXJX3N3bpI8rThRargj2ySoodrTMTLrGu9MPiA7s4GOqUBRAkeOAaWpotlXHdsmCT29xus8SdNC%2FL9GSgC1Dso%2Bx11iDfdRf9iQO8eqbs1VBYKxpIh8oUeYr3xPP6T8g5EQNraN%2BZUyCkkdFDa8fppvqon4NRWzST6EG%2B2W2qEPnblMZ0tSrliokn%2FEYDf9479aqmChvdBCyNNbfutIJY5Q7L4wXePgxDqbtLeFG2KBAPpzOnOywDn32hKsnzhBdpGVP5y%2BbTu&X-Amz-Signature=adcc52b79c4e6fc7102d55da569043f4563cbfd9025f5752b3e56cdfc2f7b103&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKIJ4STZ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHPe7YPfo5NP9xBeXYU3pkIiX8otKBPNsilh5JBGFVJFAiB%2Bzx2qXkf%2FRIF%2BQr59%2FKmIOfcjoBx1C0x1Xl%2BpFnO3OCr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIME0xLJA1cvPI%2FPzqAKtwDm9cykJBk9Il%2BsnuZyrrNuIAfqgzro1LffjtOWSg6DQnak6dUEzSHs98c3sE5sQThlgV0tLJXsdeH8vzcF%2BTSf14FWo2JVBooW%2FUHT5H2N0igOLW0ybcybErx7MedrzEfJQCaIpzQfKPL%2FZid6NnpkXWfSr2e%2B1rL7zpSk0mitBt2npdFHdBz%2FYa2o2zPFllNpX1KLE219eLOP4an2bH6L4qbh%2FaDaLbjKUSdFc%2BzmUUEYpOWYQLTrIl2iT2amggwOaWcED%2F2NbgFXgtcTJtJkVbOcevsmoybEkr%2FCHmxeTDZ2rb%2BYmNed%2B8FEUAtWP%2BlMU%2BOonUhSUpnZ07i7hxbTi9Pl6PCt5vy%2FLor%2B3chHbs5aNh4G26eMVaXR5d1opAVCfUCPX84iYYoYg%2B2N3ezJoqM8LDxJOGN2ImFOmgSEpOtOaNHAj8xHRkfag8xUeEWyIW0z45lOThqDOYbjpCK2arB89jKQrsHx%2BGhjwOBtdmS92Xxb96cl2uzWgXOZb3w7gq0O6WwRQYZGRo8B3rmdSScqoKFoDIhHEZUF99aAHOaJHewK0Sle4Wbtnb236K35SABNAV3Al6pGAeGlyIO3G2qZd%2B6DbnON5wFOzwNUCJeUsRSK18YhyWNqMww3%2FTtzgY6pgFM%2F1nNVKXBfxumS3SJJwo7gVjKKldV86oXxf0q2Itc6LuBLf5nB%2F%2Fmi2iQRYDaGeDheEQNk5unGoLkDIgXBLaquPU%2FAjWHMAkL1DfICQ%2BX2eYfRm7GBXmCRgoE6MOPZrkAL9o02tCrvM8k8fCE4INDZSLy40cuMH2XvSKUcwUBgqIoyzYfZlyHq0M7svHLRyckmuvlB3f9o3YPCl%2Fl7BhYgCQM2CqL&X-Amz-Signature=6a70f70eb34492e7a46f957fd75825d4ec8f639fd88fabb2c32ae3858f7985d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKIJ4STZ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHPe7YPfo5NP9xBeXYU3pkIiX8otKBPNsilh5JBGFVJFAiB%2Bzx2qXkf%2FRIF%2BQr59%2FKmIOfcjoBx1C0x1Xl%2BpFnO3OCr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIME0xLJA1cvPI%2FPzqAKtwDm9cykJBk9Il%2BsnuZyrrNuIAfqgzro1LffjtOWSg6DQnak6dUEzSHs98c3sE5sQThlgV0tLJXsdeH8vzcF%2BTSf14FWo2JVBooW%2FUHT5H2N0igOLW0ybcybErx7MedrzEfJQCaIpzQfKPL%2FZid6NnpkXWfSr2e%2B1rL7zpSk0mitBt2npdFHdBz%2FYa2o2zPFllNpX1KLE219eLOP4an2bH6L4qbh%2FaDaLbjKUSdFc%2BzmUUEYpOWYQLTrIl2iT2amggwOaWcED%2F2NbgFXgtcTJtJkVbOcevsmoybEkr%2FCHmxeTDZ2rb%2BYmNed%2B8FEUAtWP%2BlMU%2BOonUhSUpnZ07i7hxbTi9Pl6PCt5vy%2FLor%2B3chHbs5aNh4G26eMVaXR5d1opAVCfUCPX84iYYoYg%2B2N3ezJoqM8LDxJOGN2ImFOmgSEpOtOaNHAj8xHRkfag8xUeEWyIW0z45lOThqDOYbjpCK2arB89jKQrsHx%2BGhjwOBtdmS92Xxb96cl2uzWgXOZb3w7gq0O6WwRQYZGRo8B3rmdSScqoKFoDIhHEZUF99aAHOaJHewK0Sle4Wbtnb236K35SABNAV3Al6pGAeGlyIO3G2qZd%2B6DbnON5wFOzwNUCJeUsRSK18YhyWNqMww3%2FTtzgY6pgFM%2F1nNVKXBfxumS3SJJwo7gVjKKldV86oXxf0q2Itc6LuBLf5nB%2F%2Fmi2iQRYDaGeDheEQNk5unGoLkDIgXBLaquPU%2FAjWHMAkL1DfICQ%2BX2eYfRm7GBXmCRgoE6MOPZrkAL9o02tCrvM8k8fCE4INDZSLy40cuMH2XvSKUcwUBgqIoyzYfZlyHq0M7svHLRyckmuvlB3f9o3YPCl%2Fl7BhYgCQM2CqL&X-Amz-Signature=dcb84a3eb4151762da932f69563cf08187d7c0f525ec2d78ff75b100b6cea127&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VS6RGPHT%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB7OVIYPsAvc85aqcVhc%2BzDEiAyjvVjDG6IvpPQv8nzDAiBmhqnuHVmug1u7kRl%2Bz4zgGAvObeMskeaK66Dag3EWnir%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIMbBaU0Gn6uZ%2BahFLbKtwDtDqKKOJDZBV3rDlVrQx%2B6YRK5CIPHQv7yZG8U%2FbN5600Ui00%2BcTeE54nNkplifSmx4I69mObLhMSTNMmjzJGESgyTVL4IasB8a6NfqNVAxUPfzF4nsRXSdf0NpKhs34GlaJ8G4%2FfAlJhyy8athNB3F9gnlA7jfK9viq81dHjBO9VQR9XF66iaZCiJxKPkZXCH0OFtRvIAyyvlVADmCu2ZENCEZwVOnVKVkuqorKtY6YWLgkXm1Skb4%2Fh8Tt7uvZ%2BLeGr4FbRr097op%2FtrDKTk02G920AQhK2R8yxqL3Yb7tLdiGmsKyGnimRwb4QKMkpza1Se7F2yO7DRzaRSd55PaaQy37RJPO3Cu3a1zS4hApzL3odi%2BNJyedNtMlaqacmeldBTlt5C4kDGaBMyJGP7XotVxHOrQy5PiKcjKpRyomqOpcNO%2BYUjlaUWuGwjG8wSp8DrndaGUd5Oa4ZDE%2FSiqwwqa0Z2deIrFDYlM%2B%2Fqkp8yQVo0gJxF3acYJ9B%2BILBwlf%2BG6ndnf1go73N1Re8wObT0OaSf841CtaK93WrfFnBn4XSNOXkO1bWIsnKVZbE5ZDsDd6mSe6wH4IMQfYb9nkh7ulReCVpfNIp4CqTjB4hONtFf%2BLBX6cGNpcwvP3tzgY6pgHi5wazb%2Fnd1LaUUyy9e34w6r8qRGcevXnQnvA%2Fzc33NDZ5IwkGlTT4jwC4O0hYf4ev98QwKfolELsZCobjDUNTZ0WREFF2DMtU0HPYiTeUhVDezfSHhYNtcPDy4xidI3CPeHUO2n2jAusYFGLovybXh%2BmCQSmz%2BYsrm2jZhl6EMWR0ShZy3zddIoesJcs%2BLIlyRmk9lYSa3cZfW1dLNj272CnRwgCj&X-Amz-Signature=c11e23999798e031b1fb4d718619704764a9bdc82da0cec5b109c0ceb0e9aebd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2VRKEYO%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD0AcqAjPcI9vmYJ3hVl%2FUm2vJCmDr52lbOSYOy47PwiAIgVbg1ZE5qUjy7VNM9EOH7wJlSLzSAeghQb84Mryr7ej0q%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDGjqsB28%2BA4oKHQwvircA4Iz6hGfxlHnnPi9inTuMgKgt0rnF8rM%2Bkgux8nQzTwC7zGYIcC5PmImufKvhnR8ssklXEg7toOLSti0wPAucimACDW6kVpZMlsZUU2sKog%2FxE9U28l9wh%2BRV5vUCgz8Q%2BQgAyTiw6u82FWwy8FjW8NUGFOWa%2BENjAh0UEpkh5VkKNGYlPTxI3Jx9kTOtL3LNzUvkHwZs3efzGgSpXgHOJhcKCESWgmi4ekXy%2BwlXZF9XwqUnY834xoKDgd2NoJNyX%2Beag0Cw%2B44BryZETqIiJXIvU5G%2BB7O5LIFMd%2Bbodm%2BU%2FojhpvI1NZid%2FGe48NzFpoE6OCd0ulVRMw%2FP7TwDhsXFYifvsGjEMP%2F5sIHWZFmRo3WqfT5CKc4eKo6MyRJqYqd3VgD9KRJjJwOr%2BDTRWMKMpEKXPhLt5VIkuq4ct3drFCS8Wzrp0x%2F0qEAfEJhyhn18WDOt0OCqPRx4rHRBeMH4yrV6nrDDA4Fs1crV7WZBhqCc1GhBYzLSiJlMRRsGuEWJZvpTg60FBwluQTCp%2BOisZ8WdkIT4u35pXDPRX4kEKjLXkZ1Z3FQVQOG2PGIJ0uXVtD9s2WSpiFx2uT7Jf2foCKtJxI81OR1ZA%2BBxfEpo%2FgwzgXr%2BkcUJFcRMIXH7s4GOqUBtqbUiPe%2F4yTUEamNIXEvrOE79Gz%2FvnMzdk1Lqt%2BVcdU0y%2FElNBxtqL6xtlEEbK9DhBbvuBlw8mPZewNPqvc2rX%2FgQnrTJkL4KFKrDel6hYbBP9qmGeskd2C4twcdF2Vrpe4ycZJQCm8aEKZIRpSMtCsHNdlgnq40YpF9PKLnPsSh7ubUy%2BjxU%2BykleNOb2cjHt5%2F6A7AZZNcG5gU10hiLgidGedt&X-Amz-Signature=6e7fea28dd878100c710ada1a72ed0b96ae8adb18ae3b3fb774841a61861a5e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2VRKEYO%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD0AcqAjPcI9vmYJ3hVl%2FUm2vJCmDr52lbOSYOy47PwiAIgVbg1ZE5qUjy7VNM9EOH7wJlSLzSAeghQb84Mryr7ej0q%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDGjqsB28%2BA4oKHQwvircA4Iz6hGfxlHnnPi9inTuMgKgt0rnF8rM%2Bkgux8nQzTwC7zGYIcC5PmImufKvhnR8ssklXEg7toOLSti0wPAucimACDW6kVpZMlsZUU2sKog%2FxE9U28l9wh%2BRV5vUCgz8Q%2BQgAyTiw6u82FWwy8FjW8NUGFOWa%2BENjAh0UEpkh5VkKNGYlPTxI3Jx9kTOtL3LNzUvkHwZs3efzGgSpXgHOJhcKCESWgmi4ekXy%2BwlXZF9XwqUnY834xoKDgd2NoJNyX%2Beag0Cw%2B44BryZETqIiJXIvU5G%2BB7O5LIFMd%2Bbodm%2BU%2FojhpvI1NZid%2FGe48NzFpoE6OCd0ulVRMw%2FP7TwDhsXFYifvsGjEMP%2F5sIHWZFmRo3WqfT5CKc4eKo6MyRJqYqd3VgD9KRJjJwOr%2BDTRWMKMpEKXPhLt5VIkuq4ct3drFCS8Wzrp0x%2F0qEAfEJhyhn18WDOt0OCqPRx4rHRBeMH4yrV6nrDDA4Fs1crV7WZBhqCc1GhBYzLSiJlMRRsGuEWJZvpTg60FBwluQTCp%2BOisZ8WdkIT4u35pXDPRX4kEKjLXkZ1Z3FQVQOG2PGIJ0uXVtD9s2WSpiFx2uT7Jf2foCKtJxI81OR1ZA%2BBxfEpo%2FgwzgXr%2BkcUJFcRMIXH7s4GOqUBtqbUiPe%2F4yTUEamNIXEvrOE79Gz%2FvnMzdk1Lqt%2BVcdU0y%2FElNBxtqL6xtlEEbK9DhBbvuBlw8mPZewNPqvc2rX%2FgQnrTJkL4KFKrDel6hYbBP9qmGeskd2C4twcdF2Vrpe4ycZJQCm8aEKZIRpSMtCsHNdlgnq40YpF9PKLnPsSh7ubUy%2BjxU%2BykleNOb2cjHt5%2F6A7AZZNcG5gU10hiLgidGedt&X-Amz-Signature=6e7fea28dd878100c710ada1a72ed0b96ae8adb18ae3b3fb774841a61861a5e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665C5QUCVK%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T143023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4LsRUPbuJeQlBKTRxSLOFWGpvbEjMBdZ4Le0I%2FBJkgwIgUA3J1IbZx8eCUTot0RATb%2FhRoaGb%2BN2ncjO3YUmFwYAq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDE3fv2jgWlsEPw1QISrcA8jQvzqKLmYFFoRqwATvZhl7JDk4mECwc5gMKlo1JFBq1ylTliHFYEM14rhRdjm%2FJD9zmqEfBbX0WnTI34JIrtgc%2FosCpnIOLW0B%2F7crL7MuhucHRfP2xRuNj6HVgbZD%2BZ1U5U9YZnKCYiu0LqrnTz1GV%2B%2FasVhpm5oq9pUTvh474D6WSqSvvi4OGoRenxt76iuvun3aEghfknkXRJSBDQFp%2Fh2zKKeKE%2FYViO4rdl8mw84OMuVuCtpBlwKcVi%2FQ3YsCyXCh7UIAnb%2F%2B6UzjD7mjbiNV9se7UfUyCC2q8T27pZVKQa29spXvwK%2BeB5qWFDKD9P2a8fUf5B4X6WJMUu%2FdJOJZR7SdMslpigBWKzBlKbGzUTr9YcH73beA0wAAPfw4iLNjOS7CXeoNHh2q%2FDl4ewt0btwfRMyTO9fkvY8eR4rDX87WVZwUYPalkToVay3vJmkUjbD6y7131Wol%2BQBnbJhTsZlZEe%2FAzmyFAnJOAqvNKg3%2FbiePJXF6Y5S6doa%2Fnp5HzK8SF72UBMtvpei7%2FceG%2B8G6Un0K4mL8SZXJJCG2y4kv5QIa92DlaqV4mNUBVBnfsqJ3J1U7Nv7fTqsQecmiBx56gvqzfu9b60VrakU6P69M0l3qxjj6MK%2F37c4GOqUB6nuvXSIuiEczJYj7hR0Ll324j37euHuUtlbce85KLQmIkcCMUB9JImZIpnE0DC8UB%2FvRdnw5isow6%2FwiOmbGSL08XmLyyiIsT3LRCsttDv%2BD90oXjCqQ%2FStLZ%2FDdcpnBCF0GPkxwHVXvTudEFVkLtHZ4F8Bv%2FMXVnVZVYB6YIf6p2Qrvwf2x4jvGidRQSIkQix2RUCz0m4naksrkwZV5VEe6xxgG&X-Amz-Signature=87accb939de4328fbbfb2d77e9c717b54bdb324c45ac9d1dbd2f9fb02d76d2cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

