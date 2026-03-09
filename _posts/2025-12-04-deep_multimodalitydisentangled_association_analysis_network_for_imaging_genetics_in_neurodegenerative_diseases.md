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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIRXHOQK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQDR4gNpmElHABd%2Fiol6EC%2B%2B3ToYrnRzeiF49jQEuEVkQwIgLkDiOeHwpVWYhdqLcPayXD9OhLCVi0Gc%2FJl%2FnEgLtmwq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDKJlYy%2Bo6Ad%2B5YWJzSrcA0vcQovxamGdvojUtNdQJRXovhK8vHEQKhb5cRjFUiUrBPZUf1Gui1yQYXgWpGgs7rhyMB9U8SAOCGmq5BuCfUH8Giw%2BsIWgltQwlkvHAYjJM5mUvhRqkY1VdLFPVKpZpJa8tew5VWgHusQREbovzBDwvdfROPkj%2BqNhh9T0QLPlFAcOCn0be5ejphWv8JIur9EkndwVMHJpndHQugmZnvzFlLzOOmHJh5KeSyvMMZbpdxMW2sWEswv4ONFat8talzAbwiHHlSUWf2Mkg5rtQuUqT6QwWN3fowct7fMHp%2BMMzdp2aLeAtFQnVvGcua9FGZY%2B0nK095HzH0RsTXfkSofQdzCokoUHnRFj5gSp0z4hcymPlUIdCinlPf5A%2BBOOVlGCriW%2Fyw%2Fx2OKCf4P%2B4k%2FrlfyamltFDEWlArWl2DoubaKfm12HjAaKiMNS0RxcVBFGH%2FS7YCv9rKUjg036X82RxbW5aLPhJa0VJN7Co%2BjGFIcRhCqlp0FdWHbnRThnADAUmyXHEVS7XjIBkvIzBNpiai1fBK4gAvv7fn9jwQm1apNDYRa7HADGQaQEySUBrOv0Tp8%2Fvykwz79vtB%2BBXSRS7p%2B2m%2F2e30OsHdqEoORG5Z6ECd482z5Wj0rLMIHlvM0GOqUBg1%2FqeiuGWsyKkUmNoayWlW5yr8b%2Bp9PxBHJ3s0zz65zbZAkILsD5UMdU2QXph076Y%2F%2Fxl%2BmY2SpAfD2AE%2B144kD8%2ByegWrIhLMRfjr40mSqeTwUdu5F9qlxNWaZUCvm1VnwFmFn8%2BI0ywr1O7e8Xj8bsOvC8Efl8rJjBuCp0JSOYpTHO01slgf2vZDSavdOJ1glrjfgyREEl0oA7yH6r68SuNHyK&X-Amz-Signature=5830090f775f9ef0d8458c4b9bab221a0b3ccc2cd5499841afe971d923b2062f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIRXHOQK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQDR4gNpmElHABd%2Fiol6EC%2B%2B3ToYrnRzeiF49jQEuEVkQwIgLkDiOeHwpVWYhdqLcPayXD9OhLCVi0Gc%2FJl%2FnEgLtmwq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDKJlYy%2Bo6Ad%2B5YWJzSrcA0vcQovxamGdvojUtNdQJRXovhK8vHEQKhb5cRjFUiUrBPZUf1Gui1yQYXgWpGgs7rhyMB9U8SAOCGmq5BuCfUH8Giw%2BsIWgltQwlkvHAYjJM5mUvhRqkY1VdLFPVKpZpJa8tew5VWgHusQREbovzBDwvdfROPkj%2BqNhh9T0QLPlFAcOCn0be5ejphWv8JIur9EkndwVMHJpndHQugmZnvzFlLzOOmHJh5KeSyvMMZbpdxMW2sWEswv4ONFat8talzAbwiHHlSUWf2Mkg5rtQuUqT6QwWN3fowct7fMHp%2BMMzdp2aLeAtFQnVvGcua9FGZY%2B0nK095HzH0RsTXfkSofQdzCokoUHnRFj5gSp0z4hcymPlUIdCinlPf5A%2BBOOVlGCriW%2Fyw%2Fx2OKCf4P%2B4k%2FrlfyamltFDEWlArWl2DoubaKfm12HjAaKiMNS0RxcVBFGH%2FS7YCv9rKUjg036X82RxbW5aLPhJa0VJN7Co%2BjGFIcRhCqlp0FdWHbnRThnADAUmyXHEVS7XjIBkvIzBNpiai1fBK4gAvv7fn9jwQm1apNDYRa7HADGQaQEySUBrOv0Tp8%2Fvykwz79vtB%2BBXSRS7p%2B2m%2F2e30OsHdqEoORG5Z6ECd482z5Wj0rLMIHlvM0GOqUBg1%2FqeiuGWsyKkUmNoayWlW5yr8b%2Bp9PxBHJ3s0zz65zbZAkILsD5UMdU2QXph076Y%2F%2Fxl%2BmY2SpAfD2AE%2B144kD8%2ByegWrIhLMRfjr40mSqeTwUdu5F9qlxNWaZUCvm1VnwFmFn8%2BI0ywr1O7e8Xj8bsOvC8Efl8rJjBuCp0JSOYpTHO01slgf2vZDSavdOJ1glrjfgyREEl0oA7yH6r68SuNHyK&X-Amz-Signature=5830090f775f9ef0d8458c4b9bab221a0b3ccc2cd5499841afe971d923b2062f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VAHWBKG%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQD1lqRpjUCrx0biT8iEoyqIeIZu7HIQxDOzsqsByOLgxwIgKvUf2%2F%2F6lzKgnH2AGrVPHtrVvkc%2BagtPCHQ6uyNw%2BTkq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDJdF0eH5Vp4iaYdRPCrcA2MdEK4IJO%2F45lgCd9F7okBL44szqvEGByq9x9LdgwAlacy5hOFMXpQ8cZsBlc4xyFuzs4nNvNPDYmm8PSXZw1SQCqvUM0atcMnD%2BZL4UdR7Nm2%2FkbCXM9LO1Lhg2vR2hf4ja7UphfHoBV2q0nzhYmeYr0UoPHjXlkzZ083HxripcZdARADlm%2FE2RWXCCH%2FsDUtCKisFgLB6FzDmh%2BjwHF3QImwpBuILxO3dZa%2Fod9n3zmrHCf7jK2fFVUekRbWVf5FwRhacDOue7fM9Imb%2Bq7hdbYHZC4%2F5%2BDW4otXvPNgTWEABZT5mMjNX83KoqXUxhTVM59ylc21of9CFdAzQ9TyUhQMRJfOioUHlb0CZbfFDtb4oehEHbrvbpGyivevwh%2BbAZRVaE9Tw%2FppdgKwlVytuuamy3vjZbHIKu4oBigZxAQYHXXGc7hvs7tWwoYAW6RRvgI2Ikhan0r4hru95gJC4KngJRsxU43KnI2x%2BWll%2B0tfy21qY76PVUfj5dP%2F52SlzyYoVFaGQUWr0Rb38Wb%2Bmu1rfxHzyAaEFf3NfpDBgMB%2FZCRSDLs8pNqHLrFGxt8rCYZrNutGv5DDy0ISVVkU0qCS0FqeYo61v2Tpys9JQzpJX1ScPHbxqJx3XMOTlvM0GOqUBZSQB601VSVElvGETW6VUN38RAGuLJnmQjnMic4JZWthLIJOsOG%2Bx1aWE7zVPyVSaa9tyd1HHvZwG%2B9LrGzKY%2Be4o3IlL1dzSxWJEwSLZ1UghG7AVjW%2F0J7%2B%2BtmYGhspA5PQwqSaoPpf%2F1Aevg%2FpCL5fj1nzuFjUgXmvR5U8TjTo7gaZ4dIGdxj1ZQuoV5PlsUZKyMuO9L2zZaco3UnDQg%2B080jDV&X-Amz-Signature=522aab508b7a19978d20e8398eda097c24a13df47781a8d91221d5ea80f2fb6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNUVPZNP%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIA2co9mc1CehQFgCSm%2FOfUBp7g%2Fp%2F%2Bm1IBtEYT0aIIviAiBrogUrJFcOSgVfGdbY4CtKW0sGcJMlHKThgaIsMSduWSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMxM0qt%2FwKHdo7waw4KtwD5%2BipwbUo33mFF1DrB1rSEuL640xtFy8FjfRtBDs0QDS9ln1YhetePAsqbnKYd7%2F3c%2BI1x774%2Fg7%2B3JtypJvASEca44%2BfrlpVa2TNNB3zCTxONniwDPBLUHARq8qpz93x2rDUEoG4rq5VDCQofX2B%2FW8CJgYh%2Fs4lkOrpsNEf6oyK%2Bgw02vKNlKcacPgLfnwubiDjTbpOCZA7e0tnUbL6e2vNxvydxnNMyfnai7SzvjYNm2S%2FfYgVMtRnYLXVhYX7%2BCkl51GUDUmXzk%2FN2DJHl4Dh3iK5Bx%2FOjGNTLPTl4nJ8H8f8UfN8aAA%2FEq4jGGGwZAO%2BYPK0AQXqyFnABqkN8H%2F6CCS8vm152RBSJ6n%2Fts3DaCVYx1KR5XhGp66Zg9mQP19h1aYgXVr%2BDeNIELXxloVGNDorDLWv4RXRVePx4uHIsXI6wZUvvjLwMgjzxCRXg1nbWjwNB%2BRiJjxFF5iC1v4e2P7WynsHN6mlRH4SZ3ZwxZbd8YPkC2cYiWVzep%2BrCQyuv8YfRCOU%2BtIXddQZoVqLj6yy1lJXdyIclM6YesmsZwWxDtSprN%2FBiSekoxko2pMDv5xI%2BwlN1%2FZTWVy2fSVTlIMtpRIL%2F%2FPvGcMLcsJv8fDZ9z7x%2F6vX%2BcwwzOS8zQY6pgFNQ70IS4NLcLPbWQvklGu1iweK66SB159%2FrppdyEUOYLJoWJFrZ6GxaVjfFQ%2BZlimVGEtdvpfgI2hTd55SDi%2FQvhAm8AIDacItnQg8D638vjlOFoAtjEToHrJY4PG%2BYJgLhgr3vFpzTneAHVqC%2Fsl6Kfe9%2FFrYkNDG6RqDIG1mgz3W7Exo0uZB8eF%2BuTS%2FNCBg6w5CiSDbc%2F0liqVe7yQsvM%2Fq23NU&X-Amz-Signature=2bda3e7cc90809921b606061603dd7afce55b42fcc476bae6fa5a00c89fcdff7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNUVPZNP%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIA2co9mc1CehQFgCSm%2FOfUBp7g%2Fp%2F%2Bm1IBtEYT0aIIviAiBrogUrJFcOSgVfGdbY4CtKW0sGcJMlHKThgaIsMSduWSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMxM0qt%2FwKHdo7waw4KtwD5%2BipwbUo33mFF1DrB1rSEuL640xtFy8FjfRtBDs0QDS9ln1YhetePAsqbnKYd7%2F3c%2BI1x774%2Fg7%2B3JtypJvASEca44%2BfrlpVa2TNNB3zCTxONniwDPBLUHARq8qpz93x2rDUEoG4rq5VDCQofX2B%2FW8CJgYh%2Fs4lkOrpsNEf6oyK%2Bgw02vKNlKcacPgLfnwubiDjTbpOCZA7e0tnUbL6e2vNxvydxnNMyfnai7SzvjYNm2S%2FfYgVMtRnYLXVhYX7%2BCkl51GUDUmXzk%2FN2DJHl4Dh3iK5Bx%2FOjGNTLPTl4nJ8H8f8UfN8aAA%2FEq4jGGGwZAO%2BYPK0AQXqyFnABqkN8H%2F6CCS8vm152RBSJ6n%2Fts3DaCVYx1KR5XhGp66Zg9mQP19h1aYgXVr%2BDeNIELXxloVGNDorDLWv4RXRVePx4uHIsXI6wZUvvjLwMgjzxCRXg1nbWjwNB%2BRiJjxFF5iC1v4e2P7WynsHN6mlRH4SZ3ZwxZbd8YPkC2cYiWVzep%2BrCQyuv8YfRCOU%2BtIXddQZoVqLj6yy1lJXdyIclM6YesmsZwWxDtSprN%2FBiSekoxko2pMDv5xI%2BwlN1%2FZTWVy2fSVTlIMtpRIL%2F%2FPvGcMLcsJv8fDZ9z7x%2F6vX%2BcwwzOS8zQY6pgFNQ70IS4NLcLPbWQvklGu1iweK66SB159%2FrppdyEUOYLJoWJFrZ6GxaVjfFQ%2BZlimVGEtdvpfgI2hTd55SDi%2FQvhAm8AIDacItnQg8D638vjlOFoAtjEToHrJY4PG%2BYJgLhgr3vFpzTneAHVqC%2Fsl6Kfe9%2FFrYkNDG6RqDIG1mgz3W7Exo0uZB8eF%2BuTS%2FNCBg6w5CiSDbc%2F0liqVe7yQsvM%2Fq23NU&X-Amz-Signature=0b5cbd68da492152b8c4a9713286c440334d7e845125490ed0127d880b51520a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUEP42X4%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIDjGsw0czQfLfivBxbWzwZ1XZ3C5i%2BbdCCC6TMTBEI%2B3AiEAtgA1DwHMPlokWQF5L97Gdi%2BiEb9Uan%2FNOSrdBoGcX64q%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDEZHYh0C88mAcon4vCrcA%2B72bVUkRy1yDJTm6PHyDthS3Dgurq214%2FVIz6XpF41aF2WuzvKCbxjw4K7PVaCiXp0zWeVsZFtsEWiQ4eT0CoNTZEpBGmsbjBGoaWjKUfVW6BgxHTkaiwqNsaeTEFzLOvH%2BOqaxzjg6FZxKw9eZHbhdJGDbgxVH%2FGyt8Vo0XABLcKLSmU5dUfBkQFc%2Fs%2BZwmzqrw7%2FM%2B%2BmjZ6S1ZNMFLNk7%2B8FtpHKigSuM0%2BB4QgkKYNz4cPTlSN48R%2FSGcwTlbNIeOi9LYfA5MdLCQbOnh5fILd0fib3NLzu2IRWIQY9Q%2FYAZ%2BAk5wLTc%2BJVi5GXY2MtCxr2dRn5pHGzd52%2BsX8M5R43OxFgdNJolsi57%2BKpoJuIp59n92lh49jK8jvUUFOJ9pEsc1LyEBZl7lDnsfrOx0x2YtIui7mlCQX0SI%2Bu8wllfhT5j4yvDIho76ceXDVhY8TEV82npPgKPUbhmiHsAD7bK6JFmhLT1bNfQJ9SX7GeHPmLpHlUuhkQq3QqMx83CnTaO5tIadH%2BI6s98WKFJ3WkqY%2FvYYoxwloOqFmEioPZ%2FeHQZwibApxo%2FxkArUJeRSPWEKXCVXQrwp99uwKjISqniiuyNEwLubAGKOnkITNJSUjDoMJ6cJfxhMLDlvM0GOqUBs8gHbv0G%2BFbdA970%2BaEBPuZtSYMsx%2BxaJ4Nr%2FX2BmQdkl0ePstTuDyEMqBUra14NPzVP0nZdtM%2FEl9%2FuyJVvDWZYfYPtjAoAs2AmpzXG%2BCgiqBT57ruaZD6XI9hccxwDmYhZBJS%2FoVqNd7UvBikQQk2sdKJOOYu5Y9VWaE%2Bk9uL5bfIBiergpoVd2anURtgMzk68%2BCsHQUt71GDSQ42uZ1xujk%2BC&X-Amz-Signature=861e326541b4d9a643db7e2757774f913ea7de9079a3d20f03c6f2ff9b7372da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHIBJVIH%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIA0k6RgkFjGRLhtUplXC7IRdq8t0LZpDvrvHp1V%2F5rVmAiBBLwhKSx9FJiwZxkUHM4lUji4Joxsk8ekmhq8f1jfnFSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMBELhs8T9aVqJlT3IKtwD09isXd8HXCWJ%2F%2FWhE2c1KB4fTmL1X7TJSJuBzakSqXsZzYpiodWBwCD%2B9g1kwzj3%2BOCYZndnHb2glfN%2FcldBLzZ4XZ1ceJagQCi5o%2BEUxYIyD4Qs5o32j3FJTfpaIlnQKadkZhc0bNQ9MaOT7TY7ybp6vlnU08amxlRaIonNxnB02qs8Tzii9BD0oVCQ8pSjuWcKSHuuPJ0Dz85jm7jNmugmr2zMlJF18chpQANeCwxm1JRZUdXlHFhF1e0AZQ%2BXFS9PZu12GrDRMQDf4sHMHePsKOiM1zCiBO8s8JP686yPl5eYx4TdtYcg3yW7fModo6jYo74zJyLJ0cNb2tuxQShrtF8dbdz7t%2Bev5Yc2c7kV78o1mWOS2awI%2Fk5HJgb4pjBxHj9N9iiGpuMvC8a43N5lGm4sSEgdetzmJhifVv4ocblzAEquqYE2YiYFoJYceRT7meRIaiCvw25VHaOH1HhfhRllP50o3vDCBvwd86HuNug9%2FDg4vnGbkUYaxvSIjkLWabR8bmlwqnrzIzsZusgWSmS96xJt2udk0mwzQtr4%2BPb4cZbNI8YcBTEYj1gp1u2qHsKQOwZ5SYiZMD0WsSx0M8cJFnwEUXVBBf7NjiVH6thwpYRcbD22MIAwkuW8zQY6pgHBBQVx9azsgZ%2F8MzXCcq5Vfp9jQ3GwgdhHbUYM6vGF8o5KcSd5DCxymOr3CtgIfGxZBA7iLSjqZA5Ze7aQ6RZPVimvvvgBJV%2FC3xluExGFhukadJv05e9gQSq4m3%2B58nnvf5y%2Bf9ZJCtqedk7nmFm8eOMV%2FLvHU0Ry0HVGzocH1jA5m3zDnPQgZqxlM2f2vl936MVaPs5tZRHgcsWMmbk8ECCnkA5j&X-Amz-Signature=4fb8060c52b8c409a41511ff0b6e6a5dce394f2e40b7f1b3414d52b8e4c4cc87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNOARM7B%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211939Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCm%2FSwMa1ghqVTYyf8%2BoFdKwfr0YezF6OMhocWzvrXNGwIhAN74olda6LyKqHxQR8EeDiURXo4mpYuVmYhtCXiUzrLDKv8DCDYQABoMNjM3NDIzMTgzODA1IgwLUUS%2B%2FR5%2FUpsExkMq3ANN0ujZq8gadMAAd8ThzyLoj7BwJJlwMotk6Uh4CsZ%2FYojKRZ2tbq35obVl3D%2BezIkaityLTHFIjhzYadJdv9Dm%2B52PvN2JWguOZXfWb96lcoBEFbiUm0p5ClWknZXQV2sm0lfART9iQOqcyn37md0VkMrkup9mAHWihz97mJH1yGm1ki5ry1F6aN5VtpZ3qCOzBTS%2B82Q%2FuYbczkPNKhEf2vqkZN8h1kzBxdfBhZ6tqTAoBV1TusfbHkmmf96pU%2BbZvoMyKYCkJCrwd3ow%2FZ6XhgGx3k5tHnPFsbcWJvS2fGz9l3xUUmdYZrWyY%2BYwv22Rhpz3kE4qodi2%2BRVVAJSSVkcCtR5uSo4AY7AOiItzBhJyEVOEKIvgiYIKQQDa9Eb2M4FJMH00MOEvxs3Vr3fgkAaO0MZw0fGwGOGsAnzOtRUo%2FD%2FYJSBNonxP5I4D66o2bVzRy61SwDgVda0kXkYMSpEzDrnWvbsBnQjYdr4gGIsRzpf%2FY0YZmGHwagjSJW93z1qME6TZbQHbRdN%2FvAxAGlN4hLd3UdvzkxyyQ5WPK95hXRjtUcKpSkfz6MxlNr9Yx1jNoErILUIvOJg7MLTg8rpq18fLUxcJmnRO%2BwpsWatHLhOzugessq4MnzDZ5LzNBjqkAQPn4m9Kghvu6cdC807xbumvHObLVF5STNZD0H3TWhcOwVj51YSydQ1nfUdbQwyMbHTel5XnHrmNXS4VjlN5oZKYMcrnhRB%2BDzKLt6YG83J58LCpNEyJXkgTpas%2FtulwcVJwMJB5CP7QTl67XBDFLaJOnvjRVx6BPY0TASyUVZKzyK5z6Loj33NBhoHRAgLm6HyhY%2BLBRz79PTwwkjDJlJIQQgYM&X-Amz-Signature=13a9c6af1a99b73216b8dd25808d0f68e4f7dafe97502b43607368c2eb412d34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNQVKU3D%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQDKGHE%2Fu55fDgED5%2Fmb0jv38aQIgxEbnPygcl7iN7%2BIYgIhAMm5T1Q4tOSCWe4DHIN6%2FzgytRYuzokyYaQgwKr2ch%2BoKv8DCDYQABoMNjM3NDIzMTgzODA1IgxqQlSeJ4XnnL%2FMCKAq3APu1AFylxbpyZKLp%2Fc1YBvPmbSG81qaP37fRwpBzQefQbXvFM7P%2FH0LTaUoBN4n34faI9OsBiB%2B3SMSq3npf15MqIu6m3AsHXN1W7oRc66OPUPjudtdkcJX2QU%2Fd5uKXTmMONoBUiwOI%2F298Z4eU74%2BzuI3zcVqCx2rAhrL%2Fn%2BuEvtkNtwahtYLy2J%2F8feG3z4fgZ2dEuaYP1RbukFY0CJBKgynU6Lj7ZpsXk8HjPAqnrBe9SK5QiYjE%2BvqOC2eQ0Z2jmschN0uiXF%2BLOedJ56lYlf%2FEMcG2%2FI1gtyZvHKgqy6YXz1zPALlPcxHlS8JIONGSj3DC6TtsqihpU1z4Xm6hcTo32gxF2kVZWlJSFjPZrBT9OozSUeEhn%2FRHOSXOIBl6xjncmeSFvMBazQ4QLO5akngztfh4TeWO4kxGbPKfsIYkXWEq%2FHiUcx9EHXA4rRTjJcg1aChmpQxTN68rhl2zyiPkJva0KdKNDyxaFHLXnj4CSoWvhLRMxXjiUGTrzi%2BBKNgapRZWbj4Db1NzNAP8NNZnu%2BQi00LFiiupSVdl80ytw4%2B5Lbq5o1nCFwso2gsbebnf3BZL1ypDGnbjEnZ5Dc5TJh70OMxoDA00llZPBj8g5lc7opUJc1AlzD%2B5bzNBjqkATydnlmxH2D4v2WG5YOSfw9Jk84UEYG4e%2FBR2oVJaIdmA3%2FxYhqC5T9HMjhNPN9yZknVtaEGjfgOWLb2ybuXr03gy%2B7olFJT%2B5jsdwxmY4z8CsneYCg%2Fe2tySoeFFEV2qBoNfxBzOBFgJFEPuqIMfmHHZMBM3XEBZvMQZojyIt8SQqArawxpo68Jsfshc%2F20y1hF%2FBOk67FMcVlZY5K%2BZxxl3ws7&X-Amz-Signature=d68c92f02ad7af881f39acd70b412bc9c01e9fb9fb0471ff83bacbcde7c43aad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNQVKU3D%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQDKGHE%2Fu55fDgED5%2Fmb0jv38aQIgxEbnPygcl7iN7%2BIYgIhAMm5T1Q4tOSCWe4DHIN6%2FzgytRYuzokyYaQgwKr2ch%2BoKv8DCDYQABoMNjM3NDIzMTgzODA1IgxqQlSeJ4XnnL%2FMCKAq3APu1AFylxbpyZKLp%2Fc1YBvPmbSG81qaP37fRwpBzQefQbXvFM7P%2FH0LTaUoBN4n34faI9OsBiB%2B3SMSq3npf15MqIu6m3AsHXN1W7oRc66OPUPjudtdkcJX2QU%2Fd5uKXTmMONoBUiwOI%2F298Z4eU74%2BzuI3zcVqCx2rAhrL%2Fn%2BuEvtkNtwahtYLy2J%2F8feG3z4fgZ2dEuaYP1RbukFY0CJBKgynU6Lj7ZpsXk8HjPAqnrBe9SK5QiYjE%2BvqOC2eQ0Z2jmschN0uiXF%2BLOedJ56lYlf%2FEMcG2%2FI1gtyZvHKgqy6YXz1zPALlPcxHlS8JIONGSj3DC6TtsqihpU1z4Xm6hcTo32gxF2kVZWlJSFjPZrBT9OozSUeEhn%2FRHOSXOIBl6xjncmeSFvMBazQ4QLO5akngztfh4TeWO4kxGbPKfsIYkXWEq%2FHiUcx9EHXA4rRTjJcg1aChmpQxTN68rhl2zyiPkJva0KdKNDyxaFHLXnj4CSoWvhLRMxXjiUGTrzi%2BBKNgapRZWbj4Db1NzNAP8NNZnu%2BQi00LFiiupSVdl80ytw4%2B5Lbq5o1nCFwso2gsbebnf3BZL1ypDGnbjEnZ5Dc5TJh70OMxoDA00llZPBj8g5lc7opUJc1AlzD%2B5bzNBjqkATydnlmxH2D4v2WG5YOSfw9Jk84UEYG4e%2FBR2oVJaIdmA3%2FxYhqC5T9HMjhNPN9yZknVtaEGjfgOWLb2ybuXr03gy%2B7olFJT%2B5jsdwxmY4z8CsneYCg%2Fe2tySoeFFEV2qBoNfxBzOBFgJFEPuqIMfmHHZMBM3XEBZvMQZojyIt8SQqArawxpo68Jsfshc%2F20y1hF%2FBOk67FMcVlZY5K%2BZxxl3ws7&X-Amz-Signature=65cc03de95b16547ee88243ebc3cbfb9182869161b78d0db1c499948dbee133f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YCTAIQ4%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIE5wJqIdqd7HVcm8UWBztzu6a%2F9o66gU3K%2Btokeu%2BeAIAiA8iYUuGWTmSC2HvSAvGw4%2FmKHuwjgdZUDTjQP5NJIy9Cr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMt6wAuv9tkjBTZ5ttKtwDkTB65zQzgf6a%2B9i72smtAYaSu0BRXdyCvk8wPRf13Blb%2FKt15t%2B5yM8UBqSQxA2Iq4%2FcfT2P%2FzDA5d6t1ynDehK47t11zeOxH77mf1WEsX0BH%2BqgyY2MNtTuHiqfiXhwthN5X5ZGqwWyY%2Fd6h0XhgY7C5D%2FfcEuAQm%2BWCdPhd8u2HZ%2FIMMblMkjxa4t2tvbzP%2FBo3BeWaDc5xjeJZww3tNvBYbSRvy5674xd5otv0QBZi7YijveeUm5ibf%2Bhhx7UCboimjaq2YzS9rB2xarMc5uB%2B5CzNV8tI38UIFNsLmzIVGkURB8yccfktG4crNBtM%2BcC3nRvQv5HwUESSu86SbK8yaxTJfybpGrgt%2Fd%2Bxis4LBD%2Bl89XCFmUE8dOLPQQxpjV1SLluiv4X1yfL2%2FXUgbblWuST27h%2BzoPfm2o8AAKORRZpjiGPUTIIjMpPPe87%2BhNMh60%2FX494OzVeUKHP1XkVfamSb2wmw5Rq1IabzNrELLDC9ouPS6ZhUg6rITQK8L4gmnGxXi2ntwt%2BLY0rBdkEWgy%2F1B8xoeJDcKU1A5dW6pFAgA%2FBtWAy%2B%2BiaH03aBY%2BtZKpjTF%2B%2FHENxiO2jRMmSbcH3v0itQjzcM4rmTngRxd%2B4TdLf9YI0kUwl%2Ba8zQY6pgFwduhztjWSKrDdEOoWFW951MbX3VoOiibvnPwBUVW1KjlUZC7vZ9UfY2N0SkAPSFlUpM4D%2Byn9%2BMqhhd2wyIqwnUUTs0VDCkvA3gwmYYYaZ9DWpxTSqrXPTzXGFPQnqgk%2FF%2FUIfaS7tT8jQeVI0rKxSYxESYMVM71GNTxyD0EX88FgUMIQMLZi0WokgdMRmVG5nW19OzgP4xeg2aYrDd%2B35ZUCaxfs&X-Amz-Signature=8809d13aa686653438d2f3e3601706f1c4d332f074dbe815b6d0ed9d88850380&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHWUERAK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCICjQ37DEU8UE2K8CcvcCR5zJgr79odbe8hYGutjGMxpNAiBvcprU5dM1dcs3hv%2FCDbDepvMybK9ZZ4IGLE%2BdroweZCr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMJnTZCXKaHTUr9T5mKtwDyjWDfp04POGHnGafziwNrLMg9J2QDkZj08071DoNL4dZJOkWQgztVLbyiW2xayGyXN7sN85OMsXsMJgv%2FAtVGllx%2FeeK9xtKJwkvim770BeTFc3cXL4%2BLaqEsVW1OgsEDd97YMCxxyCDXxj25xTFq4gYSRL3PaWWGCCeIP8vwSvzhNJ0wzr%2BkZ8Vz%2FhBVGfL%2BXGT7oSeL8qa%2Fr7paFL3MN9XjYHeXPe3vNBCM7rroVtqk6QFYjaQmfaeBPygcXdP7FuJNFlzi%2FVc2YR1BGFkUCkJfxyCt2gYNski1tURNmV31sg66iMoKLg%2Bk9a7DWsitlERUjAXC4MZpg1mUOpmnAMyupE9NHQ7APFDqT6DYmvwycee8u%2FOZXEa7Pa41oR5dZ71BO%2BWAVLLLPYi8cWaN%2FCNa9pQ8%2BIVFSj3P03NUMlbGjh6qED8fLMOri51fXfl2NM1OvLZ6Uypc9STgc739oq3UK%2FLA1dYA2BBEI4EJjvR3kPJXslxdhuJMG9J4uJP%2FUEquT3k%2F7%2FeJowPEgQxuOKs9ty5aifGtEI6DCj3q%2BpVRNdsZFfKE0OUNfqQ96Oz46V5%2BAys6f4KS%2Fv4CmwbkMwGL3cR7kK9Q8FSScJpJWEUPXg4fy7BDDiy1K0wxOW8zQY6pgHBuVGxxt6iB5pBdtacSdthHjHsIPSRkbhc0k7wCuWGnbwOYNaIf3JizBX83Ktox%2F03b3DXZACN%2BYjj4BtePaRL7ZScbeyoRqRNwZLu%2BYdJuWuV1gznONbtq6mB25%2Bkzwbd7DVarkYnIXhE%2FBl2SQk9SmngqSLNtQ1u2zv6IeYYVAFYA2NjmcaWIVPRYy3Rk86gFeJCClgIy9QImLAi0lJIn9%2FhlDac&X-Amz-Signature=b31901d220af716bf1c2918ac67d7f6b881ad1dd9c93d853f127f1406c300ff4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHWUERAK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCICjQ37DEU8UE2K8CcvcCR5zJgr79odbe8hYGutjGMxpNAiBvcprU5dM1dcs3hv%2FCDbDepvMybK9ZZ4IGLE%2BdroweZCr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMJnTZCXKaHTUr9T5mKtwDyjWDfp04POGHnGafziwNrLMg9J2QDkZj08071DoNL4dZJOkWQgztVLbyiW2xayGyXN7sN85OMsXsMJgv%2FAtVGllx%2FeeK9xtKJwkvim770BeTFc3cXL4%2BLaqEsVW1OgsEDd97YMCxxyCDXxj25xTFq4gYSRL3PaWWGCCeIP8vwSvzhNJ0wzr%2BkZ8Vz%2FhBVGfL%2BXGT7oSeL8qa%2Fr7paFL3MN9XjYHeXPe3vNBCM7rroVtqk6QFYjaQmfaeBPygcXdP7FuJNFlzi%2FVc2YR1BGFkUCkJfxyCt2gYNski1tURNmV31sg66iMoKLg%2Bk9a7DWsitlERUjAXC4MZpg1mUOpmnAMyupE9NHQ7APFDqT6DYmvwycee8u%2FOZXEa7Pa41oR5dZ71BO%2BWAVLLLPYi8cWaN%2FCNa9pQ8%2BIVFSj3P03NUMlbGjh6qED8fLMOri51fXfl2NM1OvLZ6Uypc9STgc739oq3UK%2FLA1dYA2BBEI4EJjvR3kPJXslxdhuJMG9J4uJP%2FUEquT3k%2F7%2FeJowPEgQxuOKs9ty5aifGtEI6DCj3q%2BpVRNdsZFfKE0OUNfqQ96Oz46V5%2BAys6f4KS%2Fv4CmwbkMwGL3cR7kK9Q8FSScJpJWEUPXg4fy7BDDiy1K0wxOW8zQY6pgHBuVGxxt6iB5pBdtacSdthHjHsIPSRkbhc0k7wCuWGnbwOYNaIf3JizBX83Ktox%2F03b3DXZACN%2BYjj4BtePaRL7ZScbeyoRqRNwZLu%2BYdJuWuV1gznONbtq6mB25%2Bkzwbd7DVarkYnIXhE%2FBl2SQk9SmngqSLNtQ1u2zv6IeYYVAFYA2NjmcaWIVPRYy3Rk86gFeJCClgIy9QImLAi0lJIn9%2FhlDac&X-Amz-Signature=b31901d220af716bf1c2918ac67d7f6b881ad1dd9c93d853f127f1406c300ff4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZGWZ75V%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T211954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIHmLh%2FErXL0skW28RMYQZyEESBCu0nQrtPtrXtsY95wFAiBTaBocP9mDo0gtLMmigdv9NDYx4rrpbKsfGO5FcXD6DCr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMl4eUhGaDgFKzbUCSKtwDV5G66NE%2FZHj2%2FvL2pX%2FP56hBYnK4%2B90LD5XbftadeYl5yOy4jBG734NQSBb8j5DuOgdSRerrZQRssBkLaCgKg7ZV3RiwdMIZgNZ%2FLuxmJ3TxqO%2BIWT6IjZOQIcW3ve1zQu%2BJ5Zsz4AkWFPpsu2CLfmUu1QdVsYMucslF2oEfaCyO5cmvMZNnKcpGouGJw2ghu%2F3jUONmS1jYLcN7aBRRZ%2BNZ9IVjHQ8FAZNV0Mwm%2Fyy5GWtUXPM4vCHiZUHSds4kXJba4prKqcPbMsd3O0IoWrl2SkstjFAKVvoboEB%2Fc5Hl9gxe0JXetFEBanFLbPqjr7G17pT0I1VDzd0PPcysNZAmce4WEQxndcU3ABhHTh7KTQ6H7ho5X%2B1Q2y7rBpu%2FsqJp6R81JSkpnPpSZsMbawQJrwhhMXOfAQdhfdht3ZWvKwClFwEX9lKFrRd1Ye0l%2BHF%2F3zpoq%2BeclfSVX6oCXa83Lt8N%2BTbzHAj6eODxqACCQp2kjL%2FEgPH4UMSrEbbksGFuBsRXGRLdbo24OJzTZW2zTDg09d9hy45rKhZy%2B2U1W1ookSJiYGGKNxuFic7JnAurHq9Bd%2FP%2Bm%2FnlD8sAlQaL1oHnaXNaqZxS8sCwBeMLJ5CE1M1Hqh4rI1cw1OS8zQY6pgEn3q59j7fnq7%2Bh1VyzQnufRqi6ijrOD6kSb%2BC8MUkpyivP8jzZMMtjoxj7PFFBZJ7fz%2BlosJiJ2q5DdDQ9PTOJAQOkhP8KVeZoLHQXlvrshxytdlekGocoVw1YahyHmise8NNyI%2BK%2B%2B7EXzplOveBg%2BCsUAxtiduPgHZkJpGRfdrqznye3hOQ%2BqC3sasogP9gV%2FByfMh6YupTDJjYVV7wmmWkuBrTy&X-Amz-Signature=b4d8a2fb3f67546298583d2c3774ce4c2bc69f24f40fd60ba1a85442bfe7abfc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

