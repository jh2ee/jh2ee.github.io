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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YLSAJWP%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDDh2oiyjLNFkK26aJTsC3%2F7yJZS02pGsjUB7skl1TQFwIhAMqMtjSWhWwpMmaXnhI%2FnbwmtGCfVobEH5gOQ6FnEmiWKv8DCDcQABoMNjM3NDIzMTgzODA1IgxE9sY5oVTfGEyEhngq3APc4iojQVK%2BwPc60vXiXoksZ29X1VX5UciQwXBqw1nBlNdIR4E9v%2B5Q6qVMe1EJzIbVGO2VwVy06M%2BqikIltUnhp%2BMA6fko30qjLtDV84Rkqunz1rcyvGum%2FuS2VXEb18hVNJKQVxTMGLPSGXvpkTABcdPzB9JEcS5aV9y58sgrvpSfX65hh9lMtkP1ERXYenNfm9WiKYVTszbnNDwBZXkoHXNx2Uw3zVN3d%2BZMEXBmrNti43i7%2BP80DUwyt%2BNe4PMhM%2B%2Buh5ZLsn2xfZJARlIqlFu9YprmB%2BrcoBbA7L2Obu0UmKc%2FzTLr0zO2R9WNBfsu9TVzSvQEDMWRPFA1xobUEsY8nvQtEneSSIO%2FNaA7mAYBP53p7CzztUUQHCHhEx9g58l5Ct6cjqh0lcMDoQOBxRmaSxF1ACRRLadLjJz2Rq0qYgKJu5Nwl%2Fc%2FLGWzJAJfGPX5jfRDumWgJ7%2BOx%2Bv0AEp3VeBJoRVyVUrKlhg9J%2BZD6BWGzzACntXjWXzpx8rs%2BNMlndlaOGxixMR3bONZR6%2FK1UEej9OpjotPFERdAtO7W0C%2FbzXXwz4KTr%2Fnprab8KmR9sOxrdskP689Hh93485TQusJX3lsNRG80cxyQdOtJ0%2BFrpnCxVS9TDCTpvXNBjqkATey5Y%2FnZljECLpCSAsL%2BG1w9AcCZOOL8H4gVw9vKr1t9JFEymoIxDG2Jp6TuL%2FEmyoa8vCItCJ7ohU4AOB5pvYKx%2BCfOL1PVH9knbbi%2FD5XLjunatYovh5yMmRTrymXF1x2dECBuuclyI8c7A3rGn8tX4jZL26vXe%2FvXhoka8fB2E9YJWmtqP4sWTc5YU40cFRlJLOi9aOftWhByBtMNX%2FFI2Ag&X-Amz-Signature=f6c94cf7abe5d5de8c364ac7eb74f2395df46b9344adc1680fbd357565ab9d60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YLSAJWP%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDDh2oiyjLNFkK26aJTsC3%2F7yJZS02pGsjUB7skl1TQFwIhAMqMtjSWhWwpMmaXnhI%2FnbwmtGCfVobEH5gOQ6FnEmiWKv8DCDcQABoMNjM3NDIzMTgzODA1IgxE9sY5oVTfGEyEhngq3APc4iojQVK%2BwPc60vXiXoksZ29X1VX5UciQwXBqw1nBlNdIR4E9v%2B5Q6qVMe1EJzIbVGO2VwVy06M%2BqikIltUnhp%2BMA6fko30qjLtDV84Rkqunz1rcyvGum%2FuS2VXEb18hVNJKQVxTMGLPSGXvpkTABcdPzB9JEcS5aV9y58sgrvpSfX65hh9lMtkP1ERXYenNfm9WiKYVTszbnNDwBZXkoHXNx2Uw3zVN3d%2BZMEXBmrNti43i7%2BP80DUwyt%2BNe4PMhM%2B%2Buh5ZLsn2xfZJARlIqlFu9YprmB%2BrcoBbA7L2Obu0UmKc%2FzTLr0zO2R9WNBfsu9TVzSvQEDMWRPFA1xobUEsY8nvQtEneSSIO%2FNaA7mAYBP53p7CzztUUQHCHhEx9g58l5Ct6cjqh0lcMDoQOBxRmaSxF1ACRRLadLjJz2Rq0qYgKJu5Nwl%2Fc%2FLGWzJAJfGPX5jfRDumWgJ7%2BOx%2Bv0AEp3VeBJoRVyVUrKlhg9J%2BZD6BWGzzACntXjWXzpx8rs%2BNMlndlaOGxixMR3bONZR6%2FK1UEej9OpjotPFERdAtO7W0C%2FbzXXwz4KTr%2Fnprab8KmR9sOxrdskP689Hh93485TQusJX3lsNRG80cxyQdOtJ0%2BFrpnCxVS9TDCTpvXNBjqkATey5Y%2FnZljECLpCSAsL%2BG1w9AcCZOOL8H4gVw9vKr1t9JFEymoIxDG2Jp6TuL%2FEmyoa8vCItCJ7ohU4AOB5pvYKx%2BCfOL1PVH9knbbi%2FD5XLjunatYovh5yMmRTrymXF1x2dECBuuclyI8c7A3rGn8tX4jZL26vXe%2FvXhoka8fB2E9YJWmtqP4sWTc5YU40cFRlJLOi9aOftWhByBtMNX%2FFI2Ag&X-Amz-Signature=f6c94cf7abe5d5de8c364ac7eb74f2395df46b9344adc1680fbd357565ab9d60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YSDKDMB%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIFXR1RVHkywSMH5tF5uTetkJSFV%2FRogVN%2F1%2BHjBZJDg6AiBl%2BT%2Bmn7IcPeXv%2F7B11m4QlisKmGgpc7ck4A1Smf1i9ir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMRZyZen54igYzucjWKtwDNlk%2Fetc6X4cH4uljnNA7qIL1rJXX4gaa7Mbn0KWwysY4Hml%2F3j0IMk7v0LrCZufh6aoI5s6e6yXtrla7iSn8ckc1C5tQ5Ew1huc8%2BZ400TOfSMkmIpM7hdIDPteF1Ksh2kVSrpUyj0%2BfUgHHxjbX5oy8dDrvlyLEQomFSOlYAbKmVfiNf9TEQ4QDi0rRAYQax8MrFlHaJx%2FGK9H2ZdmC5xFJH49hXoeMCXtt7%2F2gyryjA0cXMNfZS9tJPHuwnb43PN78smTlUeWMIXWJ3oNRMp0YJ5s%2BRmyTpDkcgDQKM0pMy%2FCCoz3IDYkKG%2FIQDrGkGJ6s8vTSHDd9iyxtL%2FH5WbI7NrSCEwBdLW2NEndWTVi2XqARLmGAwG43wpPlAe7PZF%2B%2FyTsBTL0c2wlgUjXykuzKipnbCbPmV6bKleAt4SMax%2FBmQWbVHVaXJW9FLkYO3YKGFwUeFbV8z8Ukt4O7Erhb86hN57%2BFvMj6lexZvOSKAZwMMXkuP%2BZsa9pX%2FLVUuF26bvAV5Y55iGWycvPmRcwTszRZ55FTLWwLzR%2BQLyeY0LvWrDg%2FjgBuHA6T1Tf5kt8pIBSKBJ%2FLhFryQUeLWDo0zlcGJRmNdU1%2FqPlnTpfgJwj6r43mVoj4vwoww6X1zQY6pgERNGxoJZcLwk25RlxB%2FGpTl5GdK3iTnsD1iZoQydKV0YSmYD2KNTHc171eEKu7kxafGf4xx1ndcRJeW%2F9Uw60yF0RDTKa1ilhqIxNjQidtotEsGYzbAQtobplkkt73Ocg0oJLKFHYUhnLH%2BYUYC58TZlkdQEvq1P76a87rHpQ0ldW9GiJKyn9EHTvYnjARytZElcul0cynR6nhWiP9%2Fm3F1VjadAbF&X-Amz-Signature=1fea14fc3f19a663ad76aa32654e80bab795175a69f9ebad3aa93d54eae4b90e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466356Q7G5G%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDURO8%2F3lq3UtVwe%2B2vIeFMEDfE%2BRra8KysbKj6WEmQsgIgESb2PARj1MDgMkcsS8oaiJ1tcNdO0%2FYyiLkjS25Oq88q%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDLEV%2Brx9TZiGhge4yyrcA46C5ZIvOZHuA96Hlhob4A0qwQ%2BkTgbHnokUKJB9%2Fwl0y1JxaF2GvFi268ycafToqO5qA%2FiY5APnSrRVSdkN%2F3p1Pc6ZZCYEEXlRPvCfkyl0nl%2FXOosq8zwI8xOwzU17OVJKcGkVEO6Dl%2FMgWGbMTxuBkcsy51Gz7akW49lb4QPUC%2FgDA6VLwscjKiYbHflNV4T%2FxKx9G38rFZP9irGWJNC1iodw8OSdF3EWFZZydUVH15cavmR3y%2B3CxnxTFhHQzX1cUHqYWc%2F1fqUhVNcajqMgqQnKtYs3W6aioZUY1N2XHS3tG59G05me47aYAuZaTJ5mlhBYEPD2lfgQWrNt9uRdCQDw04NKa2xk0E%2BRBlOHkrTTJoaaIRKFZNFZjAXYOclM2ldU0pf6c1ZETpV%2FRPepVR0H20%2BNrjLXI0%2FrSfqGn62Nkhq2hHP59mAu8ruT1fjPPRoYGxHcA5QIhO3v3GDsIqaYyRIwWjDvqss8rqjNe%2BSxUH0dmTzeOrSblM%2FuJzhyhu%2BvTkM8tYGBzsF1XdqeIZG9vLf7%2BcBZr5RbD4cP9HsNI3QaQKpygfB4C%2BgP42LBp%2FWuE%2Bp8Ft3S1qwMCn9myH828OuwnFB61dolLKg0xOswTvWDOYaoGLAqMNul9c0GOqUBi00Vnal9SG87FwflZSa1DBU8kA%2Bg0lhsvSycSFIPYKLpg698okEubSaygLlJjSxbTeVKr4dIGd5L31t0ixc0v%2Bz4U5PB6hVXi%2Bgze4Og1gUJ7kdahCQX9IbrdtyvcuyYq%2FkTdUyTgTHowKQ%2FAH%2FWudAHGQlvy1tWnwtsa%2Bunhji1aJ93zY3K8yEseTBKqcse%2BaYENt8k8uZ9DCnrznBwxpehGYsj&X-Amz-Signature=1436e14d6d83c26e5a2605e27c0d694802fa277dfbecaf70f1554aa4da6fea7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466356Q7G5G%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDURO8%2F3lq3UtVwe%2B2vIeFMEDfE%2BRra8KysbKj6WEmQsgIgESb2PARj1MDgMkcsS8oaiJ1tcNdO0%2FYyiLkjS25Oq88q%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDLEV%2Brx9TZiGhge4yyrcA46C5ZIvOZHuA96Hlhob4A0qwQ%2BkTgbHnokUKJB9%2Fwl0y1JxaF2GvFi268ycafToqO5qA%2FiY5APnSrRVSdkN%2F3p1Pc6ZZCYEEXlRPvCfkyl0nl%2FXOosq8zwI8xOwzU17OVJKcGkVEO6Dl%2FMgWGbMTxuBkcsy51Gz7akW49lb4QPUC%2FgDA6VLwscjKiYbHflNV4T%2FxKx9G38rFZP9irGWJNC1iodw8OSdF3EWFZZydUVH15cavmR3y%2B3CxnxTFhHQzX1cUHqYWc%2F1fqUhVNcajqMgqQnKtYs3W6aioZUY1N2XHS3tG59G05me47aYAuZaTJ5mlhBYEPD2lfgQWrNt9uRdCQDw04NKa2xk0E%2BRBlOHkrTTJoaaIRKFZNFZjAXYOclM2ldU0pf6c1ZETpV%2FRPepVR0H20%2BNrjLXI0%2FrSfqGn62Nkhq2hHP59mAu8ruT1fjPPRoYGxHcA5QIhO3v3GDsIqaYyRIwWjDvqss8rqjNe%2BSxUH0dmTzeOrSblM%2FuJzhyhu%2BvTkM8tYGBzsF1XdqeIZG9vLf7%2BcBZr5RbD4cP9HsNI3QaQKpygfB4C%2BgP42LBp%2FWuE%2Bp8Ft3S1qwMCn9myH828OuwnFB61dolLKg0xOswTvWDOYaoGLAqMNul9c0GOqUBi00Vnal9SG87FwflZSa1DBU8kA%2Bg0lhsvSycSFIPYKLpg698okEubSaygLlJjSxbTeVKr4dIGd5L31t0ixc0v%2Bz4U5PB6hVXi%2Bgze4Og1gUJ7kdahCQX9IbrdtyvcuyYq%2FkTdUyTgTHowKQ%2FAH%2FWudAHGQlvy1tWnwtsa%2Bunhji1aJ93zY3K8yEseTBKqcse%2BaYENt8k8uZ9DCnrznBwxpehGYsj&X-Amz-Signature=9b5ac771f93148bd40f0a0bd1291ec658be600202a4c9b6625e9fbb8165a24a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3KVARWQ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIAdDQeiqvW6P0HpIbi4jlCTPA1N6X8iogwT0tHDTFblhAiAo1OBN0cKR%2FIwC%2Bi5ORv3s8abTqVGTrF82%2F7DgjDrFoSr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMZaVHmjtEhG1URPwLKtwDUCyX6k7VjdgTLqFVxOA4UbW6jGa4TUd0X%2B8KFoqU9IgaqHWMjXJ0bwlK%2BMwKbdfvETl9pB6n2yhvTnzt7TK24s4TooR4WrLZuIctwQTWP7V0Qgt%2BKGTBmNm%2Fkg9vw%2B%2FGiqTeO0cIUOhQ0LvtLaOjn6mLBTI6f6FMJuOU6mjQp%2BnboJWQjUiVixC%2Biat0zw6S9xVT2XuWKLL9xDHA%2BZNWDHNfrTOQ1Fisf6i%2F4yLonuyQScREHRdBm%2BuqkvnRz1apFugbf7mI52QiLcPONFaYG%2B4DghdDbMYGvyb1gP45RiXd5qO6x%2B%2B6qpbCItA9M34lrRufJTGuOLBsIU6E3qVt8VlPFzBQBBYXgHUUgzUQI2PB1N5IIRMzJk1OJJ0I3pOVJIKd%2B3p0ZcqjRfVdSk5CqQEkzsnxCItPx%2Ft1ViT9u43IATXj0ILr3dKAbWLgRl09EWmsI%2Fm1deew%2Fxe8x5iYdaS2DvEhYJiqrlkYzwkZOyAteieuODNbUI7S17ff%2BZTJfns7YPH0qXAAHpbziQ88fxaYHrLCfMDmdq%2Fja%2BZgydjr4ecRlrAfYFIFbsWgel7aSw76Fu3LCEBrbu%2B88Hy%2BG%2BeZRa7pd9cA3zm1FtOKSEyxYcweVtWZSExxHkows6b1zQY6pgEm2CRiaJHym9NMxGP7HHoq4jXk1w2XYGvjCJScvr1JPhzC3CMV2cVvYmCimd%2BjKtnsdVKPg9R0cOvdwCc58dwZU52KO7vTE4Pj1Y6BiCf4PyjLKwYICoQJtARLn9LzrcJVQJqmQtgvsXtVexO%2BhPLwtVp3SRKIPFCqan%2Fz9%2Fic6P57vilxGCuZnQG4C%2BcGHkweZVDCxzEuWHOPBcFF6K18lbOBJ19L&X-Amz-Signature=6588dcc4f074adf5e2e4bd35bc2ca331f3f15f56adf4e537ca2fa21874ec7d10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6FFGYXJ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCRFKubZy2PISV6gO3FgUxKfY%2F3NDp8IiBVutOpGJbQ%2BQIhAIn2EbIjbWjwPE9fbswAO5eWUPKJ2fSPXewjPITLjEQLKv8DCDcQABoMNjM3NDIzMTgzODA1Igye9izX5%2BTPJxlezOAq3ANHdL5fvEwB1rRAXWb3iFMQag%2FX%2FYnBHWxl7X2ObCCkxf3R2w5yv6JmvAWt01uU6XbYMitha3QD%2ByeQaGu3vOVBV66VDAOlg9dwiqu%2Bunk8MRk5g1Jd63Ws0ZwGL6OYi6nECWCap%2BFfLKjiw%2Fei%2Bl7jqg%2FrNSn7jmxcrfLApM7PHZYuYZLZ2lV6UIE8Grjho%2BKb0GpKRjjIj1cYqONG4ZnS8nA3Y7vLycMfYMgJlSWeFG%2BnicDaGOJj8OC4VlgCVTBCclMEeryz7UWZjc3hdtyZ6OaAnobxNYuIFvC6bvjTKfRO7zBURoucH8wQokXqM4yJufj7ccaI9H7VoTnehUrcKE8STSOjrs1Uyf7AaQ3bOA8wtIk3dLVPT2l0TcHcN6Y1xuoL4V8r42TPRU0F50wmjNy1R6bS0UgJOnstfhaz0imBoKjPnL2g2RthKCT9xhZcTo80xtnWqyNweT9Rp9MqdrVJx5QgEvqTLuhqVRtXwkm28KwHjeAnMLwcQ1q3VMPzis9tkT1B58NlS1N3PZJEn9M6TP3%2BKm9sQAfxO5%2FQX069fsVtF5i3TBgbinbtEa4ZIPgPaGUMr5OEk1jraqr%2FPEPpHLK7iTqB1maXJnkUW4ia%2FKOrK8qCnr8c%2BDD4pvXNBjqkAS6s1HQQUXxMelwZUKdLvccoRZczh7ui7%2BUQy%2BTyri4YEzKBLH%2FQ1r23MPNi%2Fi9G%2Bc57uee4GuPalIpCFwT5CpmzjFbNfsDT9uqUe8%2Bf7WLpKN7jzqa4jL07Yit9FBJojelK2lpSBbmbiLMypbm1kLQQ2EX7oBDpBoP%2Bticw0QyqKzNqVFoYZOrzn9LYtLr9r89O%2FOjK68WQcwUHbOA1Xs4O79%2BO&X-Amz-Signature=1168d7ee41c4f8f4af853dc2ef725058a4510ea506c96cc7e1c2e214afa8d097&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ATOLPCY%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIFUsBSaqbt0799WBrwPhatYSBG6qBUi8rILPh%2FPYc7F6AiBNfQ6VQJX6vqLVgsMwwUu0wf%2FximPLe8sdFbRT4sB6VSr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMn8XwQ9pM6wbq9CO8KtwDBiokOEMgEPmKo4m9UvQPU6jYFmmQVSm9P1uS23QuvN%2BsMhCGtIAPkF9nPp%2BnwQBlgvixgSnaMWiHgcu3XGw0ZynxUX7qvQjhUvHBkvUXfocbu9I1YEckhYnbJoSc%2FOjcYEhs1JL%2BbxEEmxGg%2BGHqABPHqAa7Pp66MjwDyWGWlXXJe8LDvSjoeIJzapyDCgG1G4s7NyOpQ%2BQGOSZwVsIW5TWVGeycIc2J9Fij4mKMLF0WuVjXF3dgAswhv9FjvKKC%2Fqj4fkmfQeHFAbM4Ow9Qea6XYmcEFjEv0K0o1dWcvGeCcQGizyWRlU4%2BWbSC1GsJ2vjM5qkIH6T7CL2jBHRg0oYGosGWI9DCnhQVFleqXAoETtDxPOm39CSMwCWiyxcA23JNZ7c7ej%2Bb6R4q2BAfwOr3LameNcp9zO9TpTCOQjcP7CWuwI4x4GDN9N3agvwwnJa8qxJxE9HtJdGsHxb5G7Kxjh7QuZD8EGhrmp5SRUz%2Bd25JgnfaGfz4nu%2FdTAMElv%2FP6WA6twUBJc6hiuK%2FnEJovCKfSiIQG%2FBH401fymCxNqdVjTB7giihyfr%2FHP5Ba4O9HyHNpnZBqUnZJc8qXwdYmkPGMFNe9W56vK%2B8SjY40PMGwvdFts8Cycww4Kb1zQY6pgHDOtqebrp0HhAcy5Ozv8RX1%2BjtZkrr1NdO7Kep%2BrL6WVXtyW4sKPIUg0jK%2FmCOxTUDAwXxhGAjL38JkzF1re6QDpiCKwj2gmuSxuxbyXwoUg2vF0p6oOK%2FAaAfV9bT4fRxFwk2EZpc9DtEDl5DQ1%2BF2xJ%2FU2DLcK0ISl0V2VZx%2FIZUbOiqvejk8jsQwUidO83z6XziiC772EZXBYrtoWIIfiN7mNPT&X-Amz-Signature=ab81f503b0359ea69deaabe82d0e9aeaf7237f0ca1a2774b5c231cd0716f9175&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQ5RD2UL%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDFz0%2B%2FoKfM0fMDaHl1yzyPryr7viWVuHuJTNNm1gNLYAIhAKqIkL7TJ0G56y6g658RWJqOzeiExUSLhZ%2ByrityvRyzKv8DCDcQABoMNjM3NDIzMTgzODA1IgxhlFktxlXl6hFY%2BqMq3AOB96mT4%2FaCEqdhv2U1UYgSEipZw2Fv62CyoTE6aWu9AiUiwVtWPXtMp2J%2BceNK0J%2Bpp3RcP8YDHRUROlzgrvdNX9Ag8NBdBr%2FCkvKZqP%2BWGEbrI9K2orNm8UbNr%2FWGZwv4dVvnVV80bpQTXiBEV27jFhk%2F3GaG1iYTjfbZufCXKYkU0pBquRPwB4oIKCiLHKyNTSyA94PYPl7riwdwNH%2B%2BO8orY0g33hFO3SXXEgWKDjr3cfIYh2lm7f0sw%2FFapegzVxnBidWOPFZJQCbgfpWFaxAO%2BrxvzQhsjBN0DJgMPI%2BhP19T8FvM8jdnAuADH2z7y3rjmHbjmsPr7GUyotfd%2FJW%2Bzq5Dt4rkg8mFnnNqIseEsE5dB41mpZMBjoDDFRI4dyWkoofejmG1SWaYDLgIptDIJ207CWlgREOXbGUYwQddydWjienTy27reqQgOiknB8ww0dShZHhTjAQUmlP9V%2B8eDaYfo9mbj9ES7TRgFr19RUl%2Be7m6FTCyeLu%2Bqt3KYSzyKkXLypIwBjZnRs%2BA3N4PLUpKS%2F0BQgG4Rhxiy%2FN7%2FfgTNCOTP32h9IJ3GGNLegjJYruXq%2FVqMM5v5y6OzRSxhWdVWk%2B2RMekVZR573tOqx3HOTN1yuyhxjDdpvXNBjqkAQWVDCtCCwevxVW%2Bygp69NUCTKGkCZaCzz4L3QscGTOVxWrkWmvSHkwtnug0Z%2FG6HW6fuaRjC0mqK5ROtBstuk4Yhbi8ppXMGdJ84tNQuCGvnk83kz89vy8TqmC%2F1Vs0g%2FUPCaCcfmUiHcolEFwUImXBA4S610jyOaHpHA72N83rFEaFV%2FADKqPu0Vbqc3eMGwEHPgldbo0pmCruiurIt2pP5hxn&X-Amz-Signature=2959b17d7d2f461388261467eb73d238356d441d027a02e3c75c47d07fc084ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQ5RD2UL%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDFz0%2B%2FoKfM0fMDaHl1yzyPryr7viWVuHuJTNNm1gNLYAIhAKqIkL7TJ0G56y6g658RWJqOzeiExUSLhZ%2ByrityvRyzKv8DCDcQABoMNjM3NDIzMTgzODA1IgxhlFktxlXl6hFY%2BqMq3AOB96mT4%2FaCEqdhv2U1UYgSEipZw2Fv62CyoTE6aWu9AiUiwVtWPXtMp2J%2BceNK0J%2Bpp3RcP8YDHRUROlzgrvdNX9Ag8NBdBr%2FCkvKZqP%2BWGEbrI9K2orNm8UbNr%2FWGZwv4dVvnVV80bpQTXiBEV27jFhk%2F3GaG1iYTjfbZufCXKYkU0pBquRPwB4oIKCiLHKyNTSyA94PYPl7riwdwNH%2B%2BO8orY0g33hFO3SXXEgWKDjr3cfIYh2lm7f0sw%2FFapegzVxnBidWOPFZJQCbgfpWFaxAO%2BrxvzQhsjBN0DJgMPI%2BhP19T8FvM8jdnAuADH2z7y3rjmHbjmsPr7GUyotfd%2FJW%2Bzq5Dt4rkg8mFnnNqIseEsE5dB41mpZMBjoDDFRI4dyWkoofejmG1SWaYDLgIptDIJ207CWlgREOXbGUYwQddydWjienTy27reqQgOiknB8ww0dShZHhTjAQUmlP9V%2B8eDaYfo9mbj9ES7TRgFr19RUl%2Be7m6FTCyeLu%2Bqt3KYSzyKkXLypIwBjZnRs%2BA3N4PLUpKS%2F0BQgG4Rhxiy%2FN7%2FfgTNCOTP32h9IJ3GGNLegjJYruXq%2FVqMM5v5y6OzRSxhWdVWk%2B2RMekVZR573tOqx3HOTN1yuyhxjDdpvXNBjqkAQWVDCtCCwevxVW%2Bygp69NUCTKGkCZaCzz4L3QscGTOVxWrkWmvSHkwtnug0Z%2FG6HW6fuaRjC0mqK5ROtBstuk4Yhbi8ppXMGdJ84tNQuCGvnk83kz89vy8TqmC%2F1Vs0g%2FUPCaCcfmUiHcolEFwUImXBA4S610jyOaHpHA72N83rFEaFV%2FADKqPu0Vbqc3eMGwEHPgldbo0pmCruiurIt2pP5hxn&X-Amz-Signature=e2e3f0816b8ebf72db3643cc7c94d1dc3b755b186e8ffed834ec4a8847ef64a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNWC3ONW%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDIEdWGO9cNrhHmqrxUITAc6w1Ecb4aBokS2S9vhPi0uAIgJPL%2FSHUcY%2BfoOt%2Fyyas6TPXSkDYQVlLt83qiJkqlSGoq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDLG5WzXcXfLw4x4KcCrcAza2bJytM8gvpzxSgrHOsqpBMyFpplxwqBCkk9nTybKp2aYe8Rf5xrRwv6QRVQ%2BIkp%2FRoTb%2B2KQxD3nmdax6GACH7835DNpujWu8qjyu0Sv1FLnUi9kasd%2FTvXWrHlTxapwGoBPDGtWmQM19jVregipD12PVXidGPYf434j7z4UVL7dhyp%2BCU7Ol8CKT3AwcPxaEsG93SR%2BYB0JP%2FvjIahal%2Bl7iOg8CdGVln%2FReA9wuAKtQl5lXhQto25c7OcnNiNMpOYtxU%2B2CjIrUjtDpKpV%2BxhRoxENkMOrhf2spyzRM%2B566IEPbxr3t1uRZlmHUAdNIaZROovWzSBnNJn0c0zOxJT63mY3uFms1Odgwy1i3CYYPPgOdKtSamlFzaxWtrTx53JZC8h98jbMj%2Fc5zPIkVFdLEGbqJGCB9QqxmHZNYmY87GDX7t5COVQ7kfBhdAu0fSJ6JloqMksFmnkXon1b%2FSbOWlgceYOGkd6V1R2kfcltk7g1WvKmbyAny496LNmIH4dhRc0XBcNA4FYohV8uYbWEEDKrwH5uBy3aj5thFHTbFGZzuHe8QA12kt1l90SonU6YC36I0fnib0DH4WgFgfqaBvQPS%2Bhi4k%2B8WgAInjh0b3Z7jjEtaWBkIMMKm9c0GOqUBq3VwNw%2BSuDDx9CACf8Jo%2F0PUUaIzkkpCow6qBjMz308M%2FKHyUB8nWt7QcQn%2BXEKEOqxh97gNm1Ur1cpYBxvmKPi%2B1UyYMnX%2B0%2BD8i%2F7TwSFz4un%2Fq39hRktKNzrGo%2FKVCgzMogwL0F16Y6f9Lu6M3S0WxfTXB5%2B%2F1%2Fuhc3zota7jOqmJFCZMrJNlLplDHYGH62XQfGRENrE4nF5Ee%2FLd1OE59%2Bho&X-Amz-Signature=706ca3097746f296b041ee6127ffdb47c1ea84dd54de94adfd0c4b6b4a31bde9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652QO7WLP%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQD89aVrvY6YDBBuOEMTU9kdT89v%2Fx0h8diey%2FMzV%2BeCPgIhAKks0bgSmMCi3zrlWbk%2FxCuGEnd%2FzOZLsJkbt%2F0Hcy2nKv8DCDcQABoMNjM3NDIzMTgzODA1Igzlz1lx0KZ%2BIAaHmzoq3AO4w7Xp866m4ttH93%2BxpfzwSfViGyUOcsJgBV8mwTYbrth4Q2JBOT%2B61iyAxw6%2Fw%2FLhAHjrGLxrGhLwxLQxT2QGhFTOPVvJdW%2BL4XWDEoDFRoTTQvJJ7WfiC45an%2F7BCo6jSCPw7PQH1YYx1pVagu2hbVHSG2uegiXy68fZKWxI3osb5P8DEnaXaJbTuAF%2BWrlIWGWJzN67rs%2FUvVP0abKTbSkRnn1RZptApH1Bm58%2F%2BNnhVkSwy2vS0AYQ0S2I%2BAjKttTVQKMahlJbhkF7%2FUMjDKtiqWnkbWfYI8TByV8nX047qXwuH0of81MS%2F1LH0zsfTg%2BFxhS9Ukr1Ys9VODhTdaY0jRtHsN3A7nXkv1gq5%2BfOb61L5CyQ%2BiPiHWhbo1G2sxl2dYxB5fD1%2F%2F%2BhIKyUabuemzdBKJuJ1F5ZC3RmZtNhdaMipAoF3gczbskj9zo953swYvQ3v7NJ4ET2tyf%2F3j3nvtayqQwriRONhkOgoMfZMk9VpDfnHSKNx2J0jHLfc72C6j9y24XQG9qzVOXG3dPxagZSZdRp3By%2F%2BP%2BT14RN%2FfIu1FG5aP%2Ft3n9ZzGtrqtpM5wb8U26qINu2xBWhFWEJYcBpFAjqPZtTbFoJVs%2F8EzGMWNRIdVnJqTDgpvXNBjqkAQiD%2FFS7J%2Bx5FJj6qbydBkIi12VIy057WexPjXzpBpm%2BqqcendSOCQGdzhFIs%2BAXOeDCuXNOqklLd881U%2BrcUqZRkNnlzw7FXNpqCtt94lK0QYOC21lXfpcN3guWs52mkWPaV%2BMH%2BrQdf9vDZEORg%2B4tKG04xbMMJChiUXp1qJLRGwO0%2FfixmUjKOMUzLZDr94MMODzPAVJ3nDEc4oKOuwaiLcEH&X-Amz-Signature=605d1dc1f1e592bf59bce1079285ab038fc531a55b100f1d4a9c954fef36b4cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652QO7WLP%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQD89aVrvY6YDBBuOEMTU9kdT89v%2Fx0h8diey%2FMzV%2BeCPgIhAKks0bgSmMCi3zrlWbk%2FxCuGEnd%2FzOZLsJkbt%2F0Hcy2nKv8DCDcQABoMNjM3NDIzMTgzODA1Igzlz1lx0KZ%2BIAaHmzoq3AO4w7Xp866m4ttH93%2BxpfzwSfViGyUOcsJgBV8mwTYbrth4Q2JBOT%2B61iyAxw6%2Fw%2FLhAHjrGLxrGhLwxLQxT2QGhFTOPVvJdW%2BL4XWDEoDFRoTTQvJJ7WfiC45an%2F7BCo6jSCPw7PQH1YYx1pVagu2hbVHSG2uegiXy68fZKWxI3osb5P8DEnaXaJbTuAF%2BWrlIWGWJzN67rs%2FUvVP0abKTbSkRnn1RZptApH1Bm58%2F%2BNnhVkSwy2vS0AYQ0S2I%2BAjKttTVQKMahlJbhkF7%2FUMjDKtiqWnkbWfYI8TByV8nX047qXwuH0of81MS%2F1LH0zsfTg%2BFxhS9Ukr1Ys9VODhTdaY0jRtHsN3A7nXkv1gq5%2BfOb61L5CyQ%2BiPiHWhbo1G2sxl2dYxB5fD1%2F%2F%2BhIKyUabuemzdBKJuJ1F5ZC3RmZtNhdaMipAoF3gczbskj9zo953swYvQ3v7NJ4ET2tyf%2F3j3nvtayqQwriRONhkOgoMfZMk9VpDfnHSKNx2J0jHLfc72C6j9y24XQG9qzVOXG3dPxagZSZdRp3By%2F%2BP%2BT14RN%2FfIu1FG5aP%2Ft3n9ZzGtrqtpM5wb8U26qINu2xBWhFWEJYcBpFAjqPZtTbFoJVs%2F8EzGMWNRIdVnJqTDgpvXNBjqkAQiD%2FFS7J%2Bx5FJj6qbydBkIi12VIy057WexPjXzpBpm%2BqqcendSOCQGdzhFIs%2BAXOeDCuXNOqklLd881U%2BrcUqZRkNnlzw7FXNpqCtt94lK0QYOC21lXfpcN3guWs52mkWPaV%2BMH%2BrQdf9vDZEORg%2B4tKG04xbMMJChiUXp1qJLRGwO0%2FfixmUjKOMUzLZDr94MMODzPAVJ3nDEc4oKOuwaiLcEH&X-Amz-Signature=605d1dc1f1e592bf59bce1079285ab038fc531a55b100f1d4a9c954fef36b4cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FNSTSCV%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T143340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIFaTiLYLBX3LSXKgxjGTC0lDFEPYNRTjTA%2F5hgcKtHrmAiEA6z0N%2FqSHdW81CoDC6yHUmqF93t3LVWElRUeSF0YVrQcq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDCoL25dcyHTTQyQTcircA8%2B9c1T7Z1psBH0UJDc8JwNQzgDUKen%2FieqX86uNU0Vi8t%2B%2BI0VubnkGW%2F2brahZ0CroRNKFaBgMXDMjywjq7MVgdSU93D85hb7Gx9F8iLJqhuXT1MEjYYNIE4%2BdFP89GrQ6nrSf2qqDTJJQMKpZkrMRhyzsXNAKsRjfRHhxRGEW%2B9%2FiRExL5%2BooIM5hD1sS28V5BV8W4F4QiG1H%2BX%2FlZpV7Bmph3dXrJZSpDzvcnRN4aUWTc5z%2Bt9jzftJ2Jtz2RhD%2FLFmlTCqEMS9DVRZm2yoD3ZZrwNaWpcl7PCMOFHt5XSvgZhSfVna78nZWah3VDxF6zHE15u4NkA1QL2rqsbm%2FFUR14AuXdKp5%2Fr3pVGLggsJZuXZI7kYstSp5AB8%2FgCYZXuz8eQnLch3GJZAdCJVuEO5dRo4Uynr0kEI9ZEefoTJkK4wGAP7pyKrTsmthsUT0gohNRFbZjleifgshPJL1t9%2ByWHLVuPBPlJRzdb3qwHTGxt57CG4DsVWZ75YNi1nLTI8yuBow7W5EaRdwW0fh%2FmOS%2B%2B2zntxL5lH2DJEZ99%2F5yyy1K7AmkaElr7Kc3jXSfbAJaTZLL%2Bi1xSxt9kA%2BVWtFj3Z9Nj4r5h%2FOAWGOdoYvVsInLKvXGgUeMLql9c0GOqUBBc3xGTGGvrbs0WULZeWIWPLu6w1cRUf9E0R9Y%2FXmOn67wKXGDWphUJ9TrS%2ByFH7%2BD8%2B027pmI1sR29HXMo%2BVO97xi74GdpXHsXKOv1S8OAgZ7WlPzHvsBaK1l%2B0CsRzGR2QCSy8drqP3AUtx2IiIdMyKd0vSTEO5GWRgKwBaCE0%2BrzqLTzOMA3merkwAd%2BZuuUMuzDmD3O6Ywvn18vAxun73pF7z&X-Amz-Signature=7551c61bc1c2b36d6f17724bb1729f4f485e1912e106a56d066478a20d509dc7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

