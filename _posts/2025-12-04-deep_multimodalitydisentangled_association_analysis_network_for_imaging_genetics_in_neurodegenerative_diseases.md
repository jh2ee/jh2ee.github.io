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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTS2H2LO%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDPrXU42DMogFJhDwbgENdgtnoR4S1OswJmtemAwVbH4AIhANdYAqM7E%2Bq1yIUrWb7eOmPJpP65wdZCy7xRi0wF%2Fc8KKv8DCDMQABoMNjM3NDIzMTgzODA1IgwYFX0UstmV31adSUkq3APPlt4BXeWeOmUJeMX6ysyn9X1%2B5QKiMjhuKgBau9FedKp%2Fm7rTvm4fFgDYoBBOT9PTWp7y5Eig8feiaNPJgXydh2erB8NHaWvkcqwEhqP6yoMakQNcQgsoDoKw5rwQ8anqJPTXxhRAZEze7MHgV3%2B8AIrV7OXhoP%2BjXHj%2FSIrv%2FfrClPQyrxZgWB8KY00NzxsMdVUI%2Bx0Jyl7x0%2BVK4jQKW2evpra3Q2FGNfVI4VYE28Le0U%2FXMOP1QFKa5vCGIccbk6QYGntGHlvIx1g0ArZZh9Q9DcPEn4heHFR8%2FwppL67P2OMu04COv5rb5FUmPVsus1lRbWQkgRaFIS6IhDigTJmjGj%2BXLcbfbO5Lr%2FaeoOUE1ixXQfNwJTrJiYn3jG02RCiH1YI%2Fz6yX%2F3aLY%2Bc5IMVqjj0BkTNyz440IPFltHrepS44DEr6SYi8T7J2gn5mem7XYz8mQVUcX9Q33DSLRQzwsfHldnn8U34ejFGNbjW4hq9mSSieJ9JfP2kjcaCo6RhlrPbXuvBgAnsLdCkGbF4CFXCEbKC54FR33U%2BJmP3SfAPat4zpjI8%2B0%2F%2BP2Gynb5NQQtHigeUS7RuGaDTdz46jgIL48AOr47Ko%2FhPT97zJqLg1ZTGP7z7lezCkmrzNBjqkAXF2RnAUuioyKlsqh3GRaKe5ODs%2Bo8f0LtXDTh%2BHsY4xsBq6ysK9MP8KxfX2AGH88zbAiIa8L7vXawmmaH3SfmneMBmOsP%2BZpVK7zxGuzLzN%2FBjcDd9Jz7R%2B6WzXiVVOHJlsFKrPyX1mJrTygTuniIDOyrPRiI3Wvx6y2Is9BuyIHiODEPLug2XiBQAM0hJz7uCrTtb7RZLerOrsm06IIVc8vWPa&X-Amz-Signature=4c6a12cc4b816e60d4e9bb81cd346f290b4c12d934ae83892f911f15a5bb4736&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTS2H2LO%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDPrXU42DMogFJhDwbgENdgtnoR4S1OswJmtemAwVbH4AIhANdYAqM7E%2Bq1yIUrWb7eOmPJpP65wdZCy7xRi0wF%2Fc8KKv8DCDMQABoMNjM3NDIzMTgzODA1IgwYFX0UstmV31adSUkq3APPlt4BXeWeOmUJeMX6ysyn9X1%2B5QKiMjhuKgBau9FedKp%2Fm7rTvm4fFgDYoBBOT9PTWp7y5Eig8feiaNPJgXydh2erB8NHaWvkcqwEhqP6yoMakQNcQgsoDoKw5rwQ8anqJPTXxhRAZEze7MHgV3%2B8AIrV7OXhoP%2BjXHj%2FSIrv%2FfrClPQyrxZgWB8KY00NzxsMdVUI%2Bx0Jyl7x0%2BVK4jQKW2evpra3Q2FGNfVI4VYE28Le0U%2FXMOP1QFKa5vCGIccbk6QYGntGHlvIx1g0ArZZh9Q9DcPEn4heHFR8%2FwppL67P2OMu04COv5rb5FUmPVsus1lRbWQkgRaFIS6IhDigTJmjGj%2BXLcbfbO5Lr%2FaeoOUE1ixXQfNwJTrJiYn3jG02RCiH1YI%2Fz6yX%2F3aLY%2Bc5IMVqjj0BkTNyz440IPFltHrepS44DEr6SYi8T7J2gn5mem7XYz8mQVUcX9Q33DSLRQzwsfHldnn8U34ejFGNbjW4hq9mSSieJ9JfP2kjcaCo6RhlrPbXuvBgAnsLdCkGbF4CFXCEbKC54FR33U%2BJmP3SfAPat4zpjI8%2B0%2F%2BP2Gynb5NQQtHigeUS7RuGaDTdz46jgIL48AOr47Ko%2FhPT97zJqLg1ZTGP7z7lezCkmrzNBjqkAXF2RnAUuioyKlsqh3GRaKe5ODs%2Bo8f0LtXDTh%2BHsY4xsBq6ysK9MP8KxfX2AGH88zbAiIa8L7vXawmmaH3SfmneMBmOsP%2BZpVK7zxGuzLzN%2FBjcDd9Jz7R%2B6WzXiVVOHJlsFKrPyX1mJrTygTuniIDOyrPRiI3Wvx6y2Is9BuyIHiODEPLug2XiBQAM0hJz7uCrTtb7RZLerOrsm06IIVc8vWPa&X-Amz-Signature=4c6a12cc4b816e60d4e9bb81cd346f290b4c12d934ae83892f911f15a5bb4736&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNQHBJCE%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDk9rVYMuWJF3uPsEPkkwQIn1IyGIO4Z4aS33PjgXy0NQIgCIYvkfFtE5OQcygwhqjXdiEV2NKUyXdg4sGXH7qx3NEq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDCB3QrkeoNpnToDWqyrcAzfAKeqRm%2FtKsl1kWxMw%2FEfuQ4BASs%2FMRTzT0EgdRfNfAmElJDMut86%2BfSPKKQ%2BN4G7uZprIy0ByEz4N2Arf6%2Ff0fA0dXTnri%2FbTNgBn4bopSrc5E6lQIqEfw2%2FTpwadsIUrh8KUSbw3k2rqp%2BWPj1ia7b%2FBDPNujzJHrhT9P8%2BsK1bsXe91xM%2FzOBTfo4xh3ChbD4kW%2Be8kBgTWMindyGMiQvG%2Bws%2BCxpeqOuoLnH32HzDvVeNHnKHifnAFSfSX%2BqDYNGj0s4LWX5HHcfF94saIyYecNujeHNbygRNxNGQQSbV0esSQDX0T9SHWKHBbfplVSRFYkahTDOl%2BmrB%2BHcwCzXQf7mpmBwExCvd%2F155e0VLh35p1xY6u0tcc8iK3EXId7OCZGRkDYfYSXwvXmOjK7I6R4vNadvLUKprIjUYEcq%2Fd4FXCAxcOjXY5OOvh%2BIea54yAD74Gmw6%2BkDlzrXuVSqtJhjIVSFUjn3jN3Ld7Ci4zm3Ifp0ddL%2Fg%2BLYdF7XuclrsQAKY2f85ME32cjbaCvYRRsdbAiGDotG4cQKA0iokeDiHeMta3jCpRmIe%2FS0HsFjnWSCZzLatw%2B26KDdZF%2BI62e3LEXJU0FYpMkTjno2DkdIu4HPuTTgqoMJGZvM0GOqUB5Rm3WeXNW7QNY6gXD3af6s0iAtzQzJBJdN9vQgGUNWmA3sGz4oEGDY0%2F1iyrRD2HxHm8S29P4i8NDpU5ffq4S3eiwUefgaFarawp0zPPA6vUa3aL%2BzLVmBHTKhSU8uWQlp%2Bm1%2BosE5W1noxJioCzkL6AerLK8CcMDhdAeEPWLCHlLR6pyH%2FnlJ%2B3cbdcIUzBXEzNY4tJTAePIDZlG7n%2Bqr5P3%2BLt&X-Amz-Signature=907b9535f4bc6ce34b627cf20f10af83bcff341e05174c920d0f6a2b814511e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIIFEP4M%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDff0aMDIwcrSiyCOvRMLaJp0cYZY4qICAIuiFtaC5m4AIgIbnsk3qWCuwLjIQ%2BeWNwwkz72K0ZLib7IGxgY12ethYq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDJGLiEgV8CHnqaEpqCrcA7H6GqOUaU6KKEyvVeY6Lf5MC27Sb6qV%2FM9NqOwhdnpRrSHuinZtOxAM4Ttth89xRK31OfgcRJrMn5uWJQB%2Ftfevx8N8vGOlUFlrh3ZQFMenSmnjl4zGER2TjJY3R1%2BOTUnW5JrhHcZzyXn3Oy1lKLvMcosXN3pGbxt1Rgl0YDy4on0K62uyYh7%2BZaIzxrI4vbxZ3BYgysc%2BKQmi05ShwkB2Qvw6faeEN0rAsW9M%2FybrPZjv5FltOQ8peJ0ZP%2F3W%2BcUSJELJplutx%2F2o0HBtPYrCUw%2FdhX63a6%2BeyohCLqq6JBNom81Aql%2FWjgYoB2zrJ4OnFd46uJ3HvDn%2BhvyZZyOSTxKGW7J1kfXJmmHHoCTbgbQsZMNxP8Noqu3f2wdbJ798ms8Egbd5NJMO669e3Q6FvdsymUR7gzUjyqqH5OgrkAj%2B%2F8vurDqszmDRavNWwbb1mb8XtUaQVeCmHp1erv3BB%2Bphz2HtX1x7a0MmHMJTsKSdX60H7RcNF2zsuRaTlBMGNpyZkH7X22fxdsbBfuSaWW0bGBID1X7zO1fxBO4BPjyfr%2F4wLH48Q%2B%2BU4y9Gn7p9xdJDgxyrFeZ4pJlAQA8MvjOzXf0sMEFKHl0MK5iTSFBET29kJ%2FPvZRnKMI2bvM0GOqUBuKp9xe2xZCeJx1wYxmLMLBWngaudSdNIqW67mLcAzvaVsJLhP3xWcg5baOdUVDdMN6dQHGFuT6BJEpWllLkWUWRZ0uhAzI%2F6qmAgOi59MWS4POUYA6YoaQwIbpfHyrGKOx%2BmssncahaPgeFxsBSk1ksf3Aeni9dHKwZ1ub0MowsnWQqUYDdUg6y6iwEBUNraG50idMyhe4hCfCb9mcKnn922HfNR&X-Amz-Signature=01e9a0730b6c8aa1f9aeba346df28d103f6e3e7e94aac031ff3cb6953f6f27d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIIFEP4M%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDff0aMDIwcrSiyCOvRMLaJp0cYZY4qICAIuiFtaC5m4AIgIbnsk3qWCuwLjIQ%2BeWNwwkz72K0ZLib7IGxgY12ethYq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDJGLiEgV8CHnqaEpqCrcA7H6GqOUaU6KKEyvVeY6Lf5MC27Sb6qV%2FM9NqOwhdnpRrSHuinZtOxAM4Ttth89xRK31OfgcRJrMn5uWJQB%2Ftfevx8N8vGOlUFlrh3ZQFMenSmnjl4zGER2TjJY3R1%2BOTUnW5JrhHcZzyXn3Oy1lKLvMcosXN3pGbxt1Rgl0YDy4on0K62uyYh7%2BZaIzxrI4vbxZ3BYgysc%2BKQmi05ShwkB2Qvw6faeEN0rAsW9M%2FybrPZjv5FltOQ8peJ0ZP%2F3W%2BcUSJELJplutx%2F2o0HBtPYrCUw%2FdhX63a6%2BeyohCLqq6JBNom81Aql%2FWjgYoB2zrJ4OnFd46uJ3HvDn%2BhvyZZyOSTxKGW7J1kfXJmmHHoCTbgbQsZMNxP8Noqu3f2wdbJ798ms8Egbd5NJMO669e3Q6FvdsymUR7gzUjyqqH5OgrkAj%2B%2F8vurDqszmDRavNWwbb1mb8XtUaQVeCmHp1erv3BB%2Bphz2HtX1x7a0MmHMJTsKSdX60H7RcNF2zsuRaTlBMGNpyZkH7X22fxdsbBfuSaWW0bGBID1X7zO1fxBO4BPjyfr%2F4wLH48Q%2B%2BU4y9Gn7p9xdJDgxyrFeZ4pJlAQA8MvjOzXf0sMEFKHl0MK5iTSFBET29kJ%2FPvZRnKMI2bvM0GOqUBuKp9xe2xZCeJx1wYxmLMLBWngaudSdNIqW67mLcAzvaVsJLhP3xWcg5baOdUVDdMN6dQHGFuT6BJEpWllLkWUWRZ0uhAzI%2F6qmAgOi59MWS4POUYA6YoaQwIbpfHyrGKOx%2BmssncahaPgeFxsBSk1ksf3Aeni9dHKwZ1ub0MowsnWQqUYDdUg6y6iwEBUNraG50idMyhe4hCfCb9mcKnn922HfNR&X-Amz-Signature=16acf7e608f3cf2416b8b142cc618478922f1a8f9fabc0956b5ad66d5b32f542&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSUXI2J4%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIF%2FA%2BuFElDu8gCGZK1VZ2G9hZXULuvh1lUb65xDDCBmkAiBvvQuQ5buxMPCALvN8U28attWLCPe3Ew3yT8%2Fkn9QeBSr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIM4iKDJjOCT4n6rPFKKtwD8jYSrKsLv0tA3Z8KH01kFAcPfdDrHp9LLrVdZPs9uOuX1L9lF6a0nIg64yp7S%2FvmabijO%2FwTm6aa8%2FIW%2BxqycWVQiO5eOM6t%2BGB3j11R9QS5wbm%2F9UVO3%2FHpp9Z8eFEI90n6PxW4twoZ9T85f9l4ZHRdy0kXGX8UA27bZpXOu6BrvzepCZue0zaEBvsut4MqLLYw52vnmzWqvhJSUnBqqvnkWMKNI1Q89aAddfC60FGBDSmtL7zhdvfd%2FX0bn3amidsmc5ZP6q1kxo6yKyo9VBzSXXB61uAyiiM0jYFvcF6%2FlEs%2Bn0SjI4NfHLNdGw8Aqxegh9EmJqA4b7eBzNIETqE4qUMEYgEuy4N5w%2FCsL9xZw7KpLYu9VFbUbY%2FHGecHXEkshntBaNWn857NUgae0YNeUBfXN8puXHq7qUXeZvQsovNl1ucSVR7zyrIdKf3o7tgQdcNox9gsFPRM72oKK37HSSX1EiizRJ6V3nsAWYynOsq%2BBYlFvoS3Z3gySeB1Pw6jGzB5xb%2BF0Wd75VlZTq7bULkdYW8MyGmlKQgJ8zEJGbt22uHyU%2F6T2jnFCG%2Bob2D6bZ1eJTEou%2Bk0ebqGyzF5xLv9TEvNp2%2Fu4CfWpxN4PPLUsDV1POavwtMw55m8zQY6pgGaCcwtxuvsK%2Fh2zw0%2BxAnHzZjDBk4%2BfAGYy2ke7Jnl9tWb9gY1DQ%2BxX2kMnTpVbpih9m3rdQgBoAxyYqudpq6jZgIdevK2V%2BhWPvfUAJcsnvuYZL9NhDups4GJTZGtCnGvEgmsiFeQfOoUtToVB6neOpuxpLj%2FKNBY8HEeXlsup%2Beh2ufB1SODH7a%2BeGUs8GP1bSMHUq1sou7XWlDVZdvPM2AC4qkN&X-Amz-Signature=361ced38ffe97b85167d1f084c8ac5ac29dee7a015b0e5cacab2d7aa3900797c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YENPP332%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQClXjXJHuCUEmo6Mog8RUphp4a5H1L4EX%2BuL2c1P03WRAIgCWpCkQQtKvzCtRHDckOkOHKa0WwSYfgCExGTo6Qe35cq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDBF6cwtB9gSGFOlJASrcA%2B8I46b1FuLxzrCl1ekDd9FrH2UGP9goVIrcUdQPqIOJllZz67dXfESg%2F7ahXWKo%2FQeljtc3jbyHbg%2FffZUwnmNk5lY8DWsq4vci87OboKcpKNMVozguSS6%2BFltmH0fzpfINcxVAfPuEcEW5bfILL4Fd5xJyQtrXDRyAXEdG0UIjMy1hvOhqVtz6Lr3Adunkcbg%2BVVXwF9mRRWIsqA1C44528k%2BNH0X2excBIuCRBG30AWX6c4R29kTc%2BfE%2BparYqBLlvwi4A2Z91567xYnTLe3aSuukTa65wYkEOuqm%2Fpc0%2FxGZ5lkGC2tXz9AsdcF86SiKkZxilWGD2ZTYoe0CbhTcnSZdd4v3aDT2Cx5D2lT53uTqppJVGMSJrUgoSrpbDQEX%2B4fyTwdfU4GuRn9Dv9fstVt8wxS04tj70tf6HKrqe9sPtmooIvbuRMXWtTsncUAoOR2H49ggAaC%2FDXciojSnN4dDKLaNBHgGkryawcS9kqeuiKlFpQvt8h9y1EVLdhWqhb0CohqF%2Fm1aOLbAfhSxK1y4pn5jg6IisYBrnDRgdySL80C1BGw4A1DBOqbuZqqq3EvoSp%2FDUKNxL7zFr%2Fe%2BUIQJ0vtUo0RT7RxWrOea%2BL58DeeeCNpb4AL7MMqavM0GOqUBx%2FBBn5h5j5Ni5tUKBv3nGdE8lodVVJyGcE1jiuDDGpl35Q0nL51jen3w9H8K4hvKbwzmdMx7ZY6FIh7nAyd2vbZUAqGN9dm%2BWEb6jxEsidHY4ovC21GRDsJ1EEH2e2RT%2FjnzIQwHudhwLo7u2FvEI0qm19U8pq7Z7qnG692SV%2FjbAqT7Om02j3E2n7A6mgpERCtZGta9TAiseJMRcKa1Ro4%2F%2Ba8A&X-Amz-Signature=45b4f42ad0786a50e895fdd17a5508b155398973a22b335a0b9d383609baa7ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R635RGJW%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIDa7vb6pHMHb3NW94RIN2FLA4n9tYuD8XunuVxoFwGdJAiEA%2B8XGOiKPZHLxFGyYwCoGf0dektd7X97H1ZoCbOES%2FYYq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDLT%2FjFr15bABLPFrSyrcA73jWy%2FVLugWr7ZLpLPxZMDhN%2FYmjdYhqVHvTDveh0xJjp84UYfFabTxOQ8zfn83o8XrS4Q4OZ%2BOj8l9nS4iy5Wo3xjhxemeV%2FX8V0vb364%2FhfQjhjQ37P72hVRPXNgkNIIRfi9CPThVNFBQeLNrgV4DJmNanP%2Fq7WcLmnO8330nXylKnB4aGTqL%2FYVlnQpWLmjgkgwW9112FunuHw5BCQ9JdhwCkmU3Zr6t5ATrUFPkG4ASYx4ObxCi88BnkWEwTW1FtlufHPfvcDzO5qKRlPljL%2F59GUbULjMJtRTwoPcRQ5Rmvwh0FOD%2B%2BOef8RtngvhQmPIUdPe7ANgKqj0PMuzB3I69Tk%2Fhqc%2F7U25StaYip1gU4AbqqS0EKg%2FZB12vsmsAHe1gxHQ5lfPOHwe00xv09MO0WwxTAecYdjV2h0B2EJ3Y2bSbICEYkQgYbsvU1zEFCO%2FXa6ZdLkO%2Bhf3VbvRVVbrD%2FW%2Bi4oDHdH2CzXfHPEaH2nTcgWlf%2BVGoEONCejkt%2BthFfr%2F5oEWRPRNKgH5fvMvSXVKSkOrdHyZ65%2FoxyP%2BU7Dt3ZICWQrfy1vO7mqAzvEj92jkoyeViIXRv2MqsiECIZPWYPGQaFZFrDdGtVAFqRsjpSpJGGBbdMIyavM0GOqUBKd9ROIU8JLqDpwtZM19mczJ1SlGOmCaeC7OjyzxkJMbQQov6HedyppALhATmKU0IxKMpTXJgxZc7nskM0Jvb75HvynbLekMtBEr5yC086WmCYLJ5hjZ0Tg7%2Fg4ux1N8caXd%2BgD5Aj5cub5YzGDYG%2Fl9F6RJtvuva1XyxhczKUPMBK63YtwzpXhVlP%2BW9oOMHJDFLF1TObjS4r2DKtoDDcbwRaP9w&X-Amz-Signature=6a52d39c95eeee4b5aa2ccb65f3b9aaea7b26586bdeb28051539cdc82b607400&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLKH3K2X%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDRCmwbOXZUK2yhithXI3raII%2B9nIWCZEd%2FJ69GPMPmZwIgPqhOPZnwaWJslVmQ73FZSMxH440PQ%2F5REFeVeQc8e3gq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDCFQ8CJwhz%2BzW9t23CrcA%2FRC%2BccXhtrXWdv0VZHnbH3V9fXFogf1aFvqiiRup%2BmCPacAm8KcpCrDl8jwAZ0Gd3iVOAU4zxd1BP03edBhKlPpKj8zbRpVkZivLNjWfVGyIUEc1ZR7T8hYLjDBFSF2BdObuiN%2FCgbpVJjaqDMJdLQ4fuoPYPgWTf5gnPkV%2FGkd7%2Ft%2FVplt9jLE79%2FjrtBT67qftqhpOisAY3uPwM%2FbSmdNeeYNsuS4aUuRFBw2EleW99Q%2BCFAm3muBzJyZaUNIjSsFr08l644dI%2FauRAW0Jg8oziOiXf%2BnMO3UjzUMabGnjc4A%2FCm8y3suSrkIegrPzute1Dm4GBaBLELLo1Ytbe0BsKhvqgbQH20RbbbMXglXawPrdz0ajOrjH70Ct9wnhgJbpqDLBqWzO0vUjHSx3OSw7NDcfMnpztMmmoE%2FnemraDQRyJVQhyjYgxLM5Bug6ItSy%2Fc1ZwmZh9PeXR1CcwQkHZpLQM6nR694GmR1ZwOHF%2FxKdhfeDUCr%2BlX0L3ShyMtKrFXIV0aKD%2FrsQfS6g5kcMYkwxI33RTgLxcp%2BgTmR3qB0lRmZLSKdO6W6foqoTfjeXBa648GUqfhhh%2BSJCNWKkxOCN3FoQ6RZUo%2BZuykgQQYjpzSULagVBdNTMNSYvM0GOqUBs54uzMZ%2FmZ9Z8WkfyNZSxhNqiZK8o9MNdqO36HDP6KUgkbko0kVAVFczSWGcydtXey%2BY311t5jvFfeQoarPJI1QNvlM22z9yOxAQh%2FnYBQTINpHh824VokMEZLkthAE7etynWDJ2X3ibOmyrdiTzOgUJ475vZ2WK4xNXggSi6n4b%2BEFqZmDI3PvLPEJGpWTCwgSRT2ZV3AzUkr0bpalbKyCLyQd0&X-Amz-Signature=f13a2a87cd88e9b9f3d42d2e211c8fbed50f00b815a9b36ce4bbc532cd2b6691&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLKH3K2X%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDRCmwbOXZUK2yhithXI3raII%2B9nIWCZEd%2FJ69GPMPmZwIgPqhOPZnwaWJslVmQ73FZSMxH440PQ%2F5REFeVeQc8e3gq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDCFQ8CJwhz%2BzW9t23CrcA%2FRC%2BccXhtrXWdv0VZHnbH3V9fXFogf1aFvqiiRup%2BmCPacAm8KcpCrDl8jwAZ0Gd3iVOAU4zxd1BP03edBhKlPpKj8zbRpVkZivLNjWfVGyIUEc1ZR7T8hYLjDBFSF2BdObuiN%2FCgbpVJjaqDMJdLQ4fuoPYPgWTf5gnPkV%2FGkd7%2Ft%2FVplt9jLE79%2FjrtBT67qftqhpOisAY3uPwM%2FbSmdNeeYNsuS4aUuRFBw2EleW99Q%2BCFAm3muBzJyZaUNIjSsFr08l644dI%2FauRAW0Jg8oziOiXf%2BnMO3UjzUMabGnjc4A%2FCm8y3suSrkIegrPzute1Dm4GBaBLELLo1Ytbe0BsKhvqgbQH20RbbbMXglXawPrdz0ajOrjH70Ct9wnhgJbpqDLBqWzO0vUjHSx3OSw7NDcfMnpztMmmoE%2FnemraDQRyJVQhyjYgxLM5Bug6ItSy%2Fc1ZwmZh9PeXR1CcwQkHZpLQM6nR694GmR1ZwOHF%2FxKdhfeDUCr%2BlX0L3ShyMtKrFXIV0aKD%2FrsQfS6g5kcMYkwxI33RTgLxcp%2BgTmR3qB0lRmZLSKdO6W6foqoTfjeXBa648GUqfhhh%2BSJCNWKkxOCN3FoQ6RZUo%2BZuykgQQYjpzSULagVBdNTMNSYvM0GOqUBs54uzMZ%2FmZ9Z8WkfyNZSxhNqiZK8o9MNdqO36HDP6KUgkbko0kVAVFczSWGcydtXey%2BY311t5jvFfeQoarPJI1QNvlM22z9yOxAQh%2FnYBQTINpHh824VokMEZLkthAE7etynWDJ2X3ibOmyrdiTzOgUJ475vZ2WK4xNXggSi6n4b%2BEFqZmDI3PvLPEJGpWTCwgSRT2ZV3AzUkr0bpalbKyCLyQd0&X-Amz-Signature=62e7f0c7843600e078ed95d5bba9c622aab1c4ff25a0adf197884db60809c1cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTDT4QCL%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIHaMGqLvaB8Kikkatv%2Fc%2BsmRLJCfJdhP6fH4yp9R6EpEAiB7i46iYftdhBDaTuJH2yaCq6qW%2Fl2xDWabUxrm6y0zvSr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMb2gT5apxeIIos99BKtwDsGKGdXwg4%2B%2B9MrGmXmcTt%2FUSsrMA%2BrgV%2FhOqKNmIURMgZ8nBrx7I0UU%2B2Jp3bf4Gb0KCXGowbk5kN%2F9kMQNDZI8aC3DTMv3%2Fs57M1xPLJWwCb02OkCLZuDLZthgM%2BTFb2EUTdaBD7k8uY90S8bC2hkHZR%2F%2Fv2mDvmZB35rFsjt52RuXDTh7Cmki6NxveqEVp1r6gilbNSVf8BALrvdTo5WnFVdftqqz35eEGWTzP2yhyexdvUYbwXlzoiIruBJo7uI1Dvt61u9FC%2BH1reYW7RJ2w1Vd18j9AcV8aPSrgFqZZdmAFdS06dTyYt90jtz2dFuUwWU5ipilLh5CdbaYXnSz%2FlwvlP0N7xOB7VriNy6b7NTrB6dD1a2Ar3RLHZVpvurD%2Bqn27Fqpq8aaJQt86AJd9QeibzQavJhGqnzpLgh8FUBfT7dr0h2vaPUBsMhqySYtkZqUG4j2LeYXBYBiqDPG3LPsFIhTapX1jdFzxPD%2BUOqxXfELSUZXG53V%2FY9b3IyDNIlJGsF7zodZc19JWKxxR634Xma0Fw%2F0ioqWWEe%2Fy7aqJna9sNPbI8re1XRV7wEa1x54HJB%2BJVeo5TTnyxvaajI3ST6YnO%2FAU%2FrTPBYo6TBHIZWiRjflHKkow2Ji8zQY6pgEK3wJ0GWTLNKOJqKVwp0WoaswcmHAI3H0ipkJIGXKQnZ4wCjkvWVwSFOB7qKbMXQNodEbK5IB8tT04ZX2WBRRTkIZQSOoAjFp%2BYHvWHIKMy3wTazjKRXftABLET1yV9j8XLddWXNnacij4nBGxbjZFaNKpRWsZhVI7dlRmXj8vaD9nPj%2BW7TuGH50grqCNAnQgGVzO17DqfZp2Rmf0AmEMVFH3KCi8&X-Amz-Signature=0e03db606b6016947bf2dc8860b913ddeb9c763b0f48b2b10bec00114e801f99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QF5ZEQ5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDc6g9dBljR9WVz5ylg7JI%2BmyvrEbtjqb%2BQDVYfrHcF%2FgIhAJF4TdKmSca5NWnTTn8IoceXNW4DqECo7Le5KjcSl7RxKv8DCDMQABoMNjM3NDIzMTgzODA1IgxZzW5SCBKBWn1j3ikq3ANpUAJpSKG5FoA1bl7tuIhYjCPVwkzqo52asAb7BLLS8JD027vFj2t9wkhDbMRLQt0dsLbWYbYSMphLd%2BYTXTY91zne36BCCys9LR5A%2F4AUZLakyEsA7V7DZxSpuYZsmSrOlvhvbPjS2UhH%2FqzqY3f4aYATbyttdlUzabXsv0J8EG6cO8745lKEah5lgCxwFxdXA71T45kchHUj6pCXlSoqiWvgHTkmZeFKLp5dGbVf3AzSjoTycUmH1BPvf7LEdeRGaW3Kv8HsEGkA2di9oSOZ4E9WJuV%2BP3s9OtmJWo%2FG7ue2YsR67RpIrnchD7ufPbRreYKoBSaEGRfi5MYtAVTWZHY7ch8nqbKrYBiuYra1LOJu%2FSQ3flSIHFj1U6RvYy3IehRm7f1%2BzbLMg9hvINXXUBivGsPb%2FxjoglUji95MCbOV8vBWFpZ2qjwKolM70UHi2KFhFfb44Hw1ZlhZLUJ3rc1wEPKv9aThqy6iaVF3zoOYsh7dxd1thF9FM5Aj33kQhwB0IhbHul1NY8ko4lpUm61PgiHrCbMArENGrR2XQua5nyP1xy0%2BNHGjSzdqzFn2j4fLHrPI6uT1Tjg5YKRk%2Fg37SHxLlHSr84SCgEwRTHbja5OrbEoSpNT%2FUzDVmrzNBjqkAXyqPWODOYw7owZdr2MvxHp6AjjPQ0XuZDLizVmnLk7bXqHCZfULNufXOGpUlWZblkpxDLrYFYzCDtZUJfMODEBHwQQ30WqIfhNds7CjOY9ZZkVwOD%2F2C97BCZ9T18rFyRE2YL5OAzwZUKP74wO%2Bag4V61aqfR0BDLmg7t12dMygrp0OjZsHl2OBTXXrpej4FFdbBrzJmUE7L1b8vQyU6M6vzpOb&X-Amz-Signature=fd3464c0a92bcd808d5aa5dc6dcf7cf37ba9b79a4b33cbfe15ac324ee7736bdc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QF5ZEQ5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDc6g9dBljR9WVz5ylg7JI%2BmyvrEbtjqb%2BQDVYfrHcF%2FgIhAJF4TdKmSca5NWnTTn8IoceXNW4DqECo7Le5KjcSl7RxKv8DCDMQABoMNjM3NDIzMTgzODA1IgxZzW5SCBKBWn1j3ikq3ANpUAJpSKG5FoA1bl7tuIhYjCPVwkzqo52asAb7BLLS8JD027vFj2t9wkhDbMRLQt0dsLbWYbYSMphLd%2BYTXTY91zne36BCCys9LR5A%2F4AUZLakyEsA7V7DZxSpuYZsmSrOlvhvbPjS2UhH%2FqzqY3f4aYATbyttdlUzabXsv0J8EG6cO8745lKEah5lgCxwFxdXA71T45kchHUj6pCXlSoqiWvgHTkmZeFKLp5dGbVf3AzSjoTycUmH1BPvf7LEdeRGaW3Kv8HsEGkA2di9oSOZ4E9WJuV%2BP3s9OtmJWo%2FG7ue2YsR67RpIrnchD7ufPbRreYKoBSaEGRfi5MYtAVTWZHY7ch8nqbKrYBiuYra1LOJu%2FSQ3flSIHFj1U6RvYy3IehRm7f1%2BzbLMg9hvINXXUBivGsPb%2FxjoglUji95MCbOV8vBWFpZ2qjwKolM70UHi2KFhFfb44Hw1ZlhZLUJ3rc1wEPKv9aThqy6iaVF3zoOYsh7dxd1thF9FM5Aj33kQhwB0IhbHul1NY8ko4lpUm61PgiHrCbMArENGrR2XQua5nyP1xy0%2BNHGjSzdqzFn2j4fLHrPI6uT1Tjg5YKRk%2Fg37SHxLlHSr84SCgEwRTHbja5OrbEoSpNT%2FUzDVmrzNBjqkAXyqPWODOYw7owZdr2MvxHp6AjjPQ0XuZDLizVmnLk7bXqHCZfULNufXOGpUlWZblkpxDLrYFYzCDtZUJfMODEBHwQQ30WqIfhNds7CjOY9ZZkVwOD%2F2C97BCZ9T18rFyRE2YL5OAzwZUKP74wO%2Bag4V61aqfR0BDLmg7t12dMygrp0OjZsHl2OBTXXrpej4FFdbBrzJmUE7L1b8vQyU6M6vzpOb&X-Amz-Signature=fd3464c0a92bcd808d5aa5dc6dcf7cf37ba9b79a4b33cbfe15ac324ee7736bdc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYXSUWIN%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T183342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDZ2mwmisMtEB5JYRM2eOxhlmPe1mcreU6Y99FSF6G71wIhAJSn2PNreOT4SMyCUboxvwiXj88kyP9VyQx3hT53RVDxKv8DCDMQABoMNjM3NDIzMTgzODA1IgwU6aj4BtmUexRC6Jgq3ANq2huhD1reVM9QQaEyw3IChDfozcFtfiQbF6nerFJ6%2BKilWOjPO0b8P78EhTb36YgK3h0t4uL1e1pEGSsCRPv0nFwhC%2FE0KwqesOFCHhKvhi6oVBezmHyqsXhTcrwDy1gCibHeB%2B5NU5%2BFWj1SCoyBBvzpx7ONE3j4gcWYOOsghO92xSjocK9EoCyTYxkhYFxY97DmMZCggLnMb%2Bzf%2Feq%2FlaWhXgV5VrI10xjRmC7kBCbd4OX5%2Fvr9NfeqEbf7kGmu7QTLuzxqU82HHG%2BKOy03LFHciGNRXCse8hcCiNp5qEfcjFawtE084pDZOeanCVqasD7J0iOnjzmuAzeIg%2Fz1YwSm5yC3nbDQE0MahsHIVExXktLEOsfMjfUQm7kBwFyZY%2B%2B1rxjUYpgQP9Zn3nbZqexOUMle5okZS%2Bg%2FRcMUrAWMKkPYenxNJbKeY3v4G1eTdtbf%2B3AUFSdzB2FcyPFfLCJv9UW06saRElD6CDQACrXFm0LE3WIJzh%2FV0yQDABkesVmlRfzYLVEB6oqpG1gsCyBwtrQqxdvHQJlYPW%2BZ2aqaFArqtprMRNkQV6Y6KaKqg2eB0m5GDHEdASnoQQOQglkC2nNtkvY%2F3u%2FfxjPhhJfzPj%2F9N7KybRN7CDCgmrzNBjqkAagyk%2FNTId4PGue4XAMtBDCc2WnWQlqvEinuH7zFEqSL7T7IS6dx0H%2F8hC%2BWr9bceDQTQ9N5Ot%2F1KfHFCxMMDj3%2FeZbeEe4HLPIFVD80z8bNTutH2ZlpFSeGZPKt6wffWeRxxq9261YkW6xtuBfzeqRGCWzLcUwU6x0Ij5oqXERZLiFIFttX0ktvzOyK8T%2FpYCZ961IyzAGJcwGZdi5ZbwQqCuJv&X-Amz-Signature=ebf8c2b02f750cb705b9a091108ed6e511dacbe34e9976b8a2b63a99b68733ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

