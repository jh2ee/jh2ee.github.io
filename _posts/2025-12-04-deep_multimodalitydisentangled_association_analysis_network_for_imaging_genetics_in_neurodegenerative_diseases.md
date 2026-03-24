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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBHVSJN7%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BZKoisMrb8lVJLMd7qDV49xX6i8cIeBN9PqGSIDF9xAIhAIB80Jy%2BTvqLhh0ElYkDlubg%2BZ%2F%2FoUJGNyEmefhh%2FIi9KogECIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz3BheGaKTXXACbvz4q3APnpbweiHhH9I9UBZF0e8q2kQMfM0PlXbqMwTkIc3MJab4vGGn1yzOYK6lfVvRS%2FVKwF5cY6K4PBXMnZTgYSbWxAoMbdYcZ6G0o0y%2B3TFnmrwZHT29tDdREfEn%2FeeUyU9vscQlgtXy1YTSPq3S4eUNL3sJv9BLOeVu1RTiy4lipYX67aLHASh7Px5fnjP43aaWl%2FaE2ngnek%2FpLBCJ%2F4bb8oV7nkTshbxS%2BE9rsNUCTEcuLNG5g7Ileap6c6vLyuE1c4jff5gfBNrW1V1Ac13%2B1hxDS8vUpd9hzR2Cy1bxvj%2B39VcvScIyLevc1IHzoVcMaqHsmTG1XIgYpEly3w6Z%2Bn5B4RdWwgARs%2BDS%2FnK6OoJYo55eFAkcBIfD41NrgDQucHeAKVtYsdO0yJQdXYomS7vr4bsa1sVxj%2FioZ1FOHmieP%2Bb8p7Lm2YYplayAvdAVxN%2BlkelLCzfJI8kpVAutrzLLvfRaNHJoB7osmqHqFn%2B8fGON3DMkywlJq8MrGHrqCbnmcMjZfqQs6ot%2FFQQz3%2Bd0eV1K%2BMjaGal%2Bv028o%2Fs2D7qrMq4isa11ksiLokf%2F5ZkKKXU1Ttm7uvyiOaDSwEGldwIdMNiKLcyKqjF95V7RvcE5xj9VEcgWc%2FjDpg4jOBjqkARhg8clRg0cJUtek%2BOOjMm0NFmGeqb2P458A86XsKKCW%2FBE9TMlUlk31XJrIe%2FVWOikKUzJ3ZIofN7M%2FGWIZkgpn6bmp%2F%2FT6cpVOLe4XbelKfLnNh0%2FvP924Zh39GgzawI%2FilVMuyyBaw5I6iSKj98MAfiyni1IBUe5Bz09kn5OZkADciapcnUL89PCOpzgs96ODU44OhLsKgk9z2Asff0hOSfAD&X-Amz-Signature=8c5d5800e9d0eae98e0cb3f2f7fefc30d9ecee120efd5196002df0217d25b2d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBHVSJN7%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BZKoisMrb8lVJLMd7qDV49xX6i8cIeBN9PqGSIDF9xAIhAIB80Jy%2BTvqLhh0ElYkDlubg%2BZ%2F%2FoUJGNyEmefhh%2FIi9KogECIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz3BheGaKTXXACbvz4q3APnpbweiHhH9I9UBZF0e8q2kQMfM0PlXbqMwTkIc3MJab4vGGn1yzOYK6lfVvRS%2FVKwF5cY6K4PBXMnZTgYSbWxAoMbdYcZ6G0o0y%2B3TFnmrwZHT29tDdREfEn%2FeeUyU9vscQlgtXy1YTSPq3S4eUNL3sJv9BLOeVu1RTiy4lipYX67aLHASh7Px5fnjP43aaWl%2FaE2ngnek%2FpLBCJ%2F4bb8oV7nkTshbxS%2BE9rsNUCTEcuLNG5g7Ileap6c6vLyuE1c4jff5gfBNrW1V1Ac13%2B1hxDS8vUpd9hzR2Cy1bxvj%2B39VcvScIyLevc1IHzoVcMaqHsmTG1XIgYpEly3w6Z%2Bn5B4RdWwgARs%2BDS%2FnK6OoJYo55eFAkcBIfD41NrgDQucHeAKVtYsdO0yJQdXYomS7vr4bsa1sVxj%2FioZ1FOHmieP%2Bb8p7Lm2YYplayAvdAVxN%2BlkelLCzfJI8kpVAutrzLLvfRaNHJoB7osmqHqFn%2B8fGON3DMkywlJq8MrGHrqCbnmcMjZfqQs6ot%2FFQQz3%2Bd0eV1K%2BMjaGal%2Bv028o%2Fs2D7qrMq4isa11ksiLokf%2F5ZkKKXU1Ttm7uvyiOaDSwEGldwIdMNiKLcyKqjF95V7RvcE5xj9VEcgWc%2FjDpg4jOBjqkARhg8clRg0cJUtek%2BOOjMm0NFmGeqb2P458A86XsKKCW%2FBE9TMlUlk31XJrIe%2FVWOikKUzJ3ZIofN7M%2FGWIZkgpn6bmp%2F%2FT6cpVOLe4XbelKfLnNh0%2FvP924Zh39GgzawI%2FilVMuyyBaw5I6iSKj98MAfiyni1IBUe5Bz09kn5OZkADciapcnUL89PCOpzgs96ODU44OhLsKgk9z2Asff0hOSfAD&X-Amz-Signature=8c5d5800e9d0eae98e0cb3f2f7fefc30d9ecee120efd5196002df0217d25b2d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642XKHI64%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFOYreUIHTtOkJIeuQFQgodbb60O3%2BWfq0VUx7tc63lQAiEA7sN3PZlu7f3%2BBEvDuu9aFs%2FMknvSJW7rd%2FzX4VQijOQqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA4DC6EwXndPlPDyZCrcA6AVNVqnMo7V89PljtFEJyP9D%2Fs1%2BwTZAlReUJjJRBI6kEz9IRGovvMOH1pvVpR2MnpN1bO7JBSrO83ryw3gf5gOhtAlVuVk9FvbYcw6b4wrB2o6YKj0F4%2BVDg54ssNRMgZdQ%2FCX1cVHtcVGlHvynrRlehatEIbe1dPzemqY59cqnqRdDOStM9dNAQaXmCk8tX4X1r6B6yn4z4Ntx%2FUPxkl5LX4RJfPpqlpVjzf23R7dUzf9heJTs2qzbH8fwodGpYuiD9SG9zSMKy7Tis57%2F3wdA078d5bFfYX620qjgETwMPN7H6QgcHxkuPxcg6h31kuxoa62CizriuEoILqRmiAWFrdB%2FrtmqHN0RCUEi20bOjRca6ETnaNrtVS8CS39ejV2qdRaFJExuGGPFvhi4nfrnOWS8GuXEszOwB6HIf4AdJpZbYxr1WY3z8cqxZUpgrJ45NFUh6cLtHFAOl8izSf4rXbny8oaOZpyHjRzHYfmUholl3ZuFmlYHlbX%2FIqiWD92mMXT5VNyc6wPknapY8ZMIjIV7EeGeTi3%2Bl8whz6hR%2BOAwP2T7NJnQYWnumau9riqe7fZoYuhLDKl6ii4FC4ADJ%2BIfn2VwkH61aou%2Fi%2Fv%2F59Q6DpLelgRrPubMP%2BCiM4GOqUBOvSaH4bjqMc8Kal3yCUbf11xwJD%2BSSSk31a1Bhv%2B29KMCvTELqxz59cZXwVxT%2B6PVNRGIoE5I8irDdaoyiTfnEOQEsCTWDb%2BUmGDo3vWXVSW9ugtcIiOFCbpgvofICJXhHkg3sfw6jLtY8hMKo1nj9WhSlp9IxWNPlZ%2BNkgekpjBjaP35xW9M3PxNlz3ZXgZ5z%2Fcv6ZJeqT3AjN63SPvUQ4CLS0J&X-Amz-Signature=cfea3db2bfbb4b92730be87018d37f20ad1997ce6ca04d112eb43441b440d4c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQQEAKUJ%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDeKD%2FW972bf3IimOqK0s%2BM6RTa8iRaf9DZ8bD%2FjYBOOAiEAzx5kzAa%2BlB4uMAozKP2a8b5xzu3gFevQYPtUEuBLTPsqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAhb%2BaHKVO64abHd1CrcA9vUXj92%2FftKiogKsgJtWUvNHCqLd37D%2FgtDbGtZxUehmw4H5VU4vdaiVHSbhIdOKfuKKN8lx6mcxpRWVStKZGx4f5t%2BuK7%2BRZUgapEawUEtg45ukhdpliB6C2t%2Fgz5bNXWbATd22LBjiTPS0%2BbPO1D%2BjTNFSq5JNqXrBSSMrKiFO03vjBxS1kGtBQYcH%2BSez9lgmjt%2BG%2FEm18DN9q7%2BO0RAC8HmZR32NWDUm0kIZrHxAheAC%2Bb9e6GAhqhOeG%2BZCQGqY5QoWJie3Iy5wWhhOpfQZSCVgRVKqvOaUkcJOAnfNdhSuHSx3fZ6Vvt6GFqCDW4nTKMC%2B0GZPfT1jbF1uyv9nEJl0KfZZt1qMbXqSTU0DCEN9TGCa8zPNZEgdIPoiEofdvBXqlovPfNtGGAAIvaxSHHRtH2TyC0YTntajgfrNvbm4u2P0gOne1HoFJoJ%2BP4sybt9avdl%2FGj%2BJmlHz8opY9YQIiogG%2FuY55v567XSTZLxZJDnnEZoyZaCcNKKsOIbYFAG3I8fs5qt%2BjJVeFp1F2wzzfctRapU2WvzLAnK0AS6LK1hcqW3RyijW8C326lGdewVCN182aP17KPyRR20WOIs%2FXr1KCVeA0L1%2FsxxQqtivv3HtO%2Bno8xwMMWCiM4GOqUBhw%2F9SyqC6TWMdR9cmbsAyxugU32VBUX8maCUqFEMJmrAT%2Bz0%2FtVVhI9b8ZPmwqCKC4Ie6XCkTdxPxhw77Q9LgyAx3QLCJBwkpvg%2BQjzm0NvD79Q93pAu8TRW9YUHq1pX7jEifNgXUjNtpDxr7PnJg0%2FehM4RKRLKa5TaPiGLd8%2B14hrG0amv6OMEOpoELZEVUfvuO5esyaXVWvhbxrWL8BXX%2BHdN&X-Amz-Signature=5da4d3644a45450ad073ed315e68ce81c5dcfbb546beb7d0f3adebf62d3b57a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQQEAKUJ%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDeKD%2FW972bf3IimOqK0s%2BM6RTa8iRaf9DZ8bD%2FjYBOOAiEAzx5kzAa%2BlB4uMAozKP2a8b5xzu3gFevQYPtUEuBLTPsqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAhb%2BaHKVO64abHd1CrcA9vUXj92%2FftKiogKsgJtWUvNHCqLd37D%2FgtDbGtZxUehmw4H5VU4vdaiVHSbhIdOKfuKKN8lx6mcxpRWVStKZGx4f5t%2BuK7%2BRZUgapEawUEtg45ukhdpliB6C2t%2Fgz5bNXWbATd22LBjiTPS0%2BbPO1D%2BjTNFSq5JNqXrBSSMrKiFO03vjBxS1kGtBQYcH%2BSez9lgmjt%2BG%2FEm18DN9q7%2BO0RAC8HmZR32NWDUm0kIZrHxAheAC%2Bb9e6GAhqhOeG%2BZCQGqY5QoWJie3Iy5wWhhOpfQZSCVgRVKqvOaUkcJOAnfNdhSuHSx3fZ6Vvt6GFqCDW4nTKMC%2B0GZPfT1jbF1uyv9nEJl0KfZZt1qMbXqSTU0DCEN9TGCa8zPNZEgdIPoiEofdvBXqlovPfNtGGAAIvaxSHHRtH2TyC0YTntajgfrNvbm4u2P0gOne1HoFJoJ%2BP4sybt9avdl%2FGj%2BJmlHz8opY9YQIiogG%2FuY55v567XSTZLxZJDnnEZoyZaCcNKKsOIbYFAG3I8fs5qt%2BjJVeFp1F2wzzfctRapU2WvzLAnK0AS6LK1hcqW3RyijW8C326lGdewVCN182aP17KPyRR20WOIs%2FXr1KCVeA0L1%2FsxxQqtivv3HtO%2Bno8xwMMWCiM4GOqUBhw%2F9SyqC6TWMdR9cmbsAyxugU32VBUX8maCUqFEMJmrAT%2Bz0%2FtVVhI9b8ZPmwqCKC4Ie6XCkTdxPxhw77Q9LgyAx3QLCJBwkpvg%2BQjzm0NvD79Q93pAu8TRW9YUHq1pX7jEifNgXUjNtpDxr7PnJg0%2FehM4RKRLKa5TaPiGLd8%2B14hrG0amv6OMEOpoELZEVUfvuO5esyaXVWvhbxrWL8BXX%2BHdN&X-Amz-Signature=011a42244e7c600a7b325e2adec4873441a983c6439d2c67433f621dce4764b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR6NI4UF%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHSXEXjU1WRMkAPEKahls6XDLTFbhz7u%2FJ7r%2B8RphAJQAiEAjo3ooigta5CF0UDAKL1izLIf4WsS0%2BOlYekUQQvTAxYqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK8wVrIgjQRp9uTbfircAxOxab0pP1uT0nbUJO0WPtELwCVwO%2Bmr5cuTyJrXNiUJDrPXvL%2BwzjOP48sRXIhMmvqxS5WMn2X4y1O3ArYa%2BEK4JGU35O%2FloYiXwKTB0I%2BYUaETt8V6%2BlcNzIaTRsyZayzBa39%2BrQ2CNb9Cs%2Bdgrw94jK8guGZNKisS58HUie1HYUjbExQYn8uJo1WBs7V7sGDb5r3qLys9CWaowyUQL9xcjafoL11oKraX2O5qSM4VBc4DaurRxdwoNX7Qs75sQFZirxbpxfmAKZ%2FK6ikSconZk3HqcEgBk9mQT0q1KIB59NcbSfOgwkWnB0mcb79T2bPmVXQJTz9IK4mbGcRV9l86y2LmO%2FTxLRopIF1Av%2BnkqW53%2FNFxpeCmyH25DHgj9v%2FQRfPOf2GE1iuyASC4UxmSAr5tMA7bAJaOneCZmLQ%2BdD0e9%2BP%2FNZMLZKN3qrqBV%2F8L0YR8399pVoh7qubCh5QoPTPCgX0X296mrc848rCXr5KZci%2B9UxLVDkRhvQkUuDQXVD7YfmbZKtT%2FuCHbb5LAfDiTXi%2FcOGRLKNSDJaBSMdCUBQaqVqOvJK0UEO8gex2eNyhcQ7N8KdHyYR4UZkZwB%2BkwaujoMNK5Zxovx2UPKfF%2BlDW8JBAWR76aMI%2BDiM4GOqUBWpN1Padaxg%2FkVxq081C3S9eTtJCHq1CtYJ%2B8N%2FsPpEWGL3Oo2WGetbNBPVdKP7J%2BdmYcNUK%2B1%2BSa7OzZRA7ESIqqhH23TqRtvfUiJ2co5JpbWJcqJmAUidnHkcl0urdKlfrZ8efqrizOgxLcZIcMUqhAp5j6lO3%2B%2FrmtdLX3XZOGVAFpVEqh3USOmcsh2NcJcUwlh6RLrsw3qvn781BQDtGgHxen&X-Amz-Signature=8602aa9ad1d4e827aae17db22aa89bb34025d895c911d0d1de45dca54087b290&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWA2QPOV%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCFAC2yx%2FQX8ixCfpNMSDxVJhGBbcuDPRIxNUgWiHkCMAIhAPJ2tQGmnkGESiKwSHYDOjh0rHgrG7iJgknhHDEa5UAHKogECIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzRry%2BGwNc484DZjL8q3AMx9Y1y08qciuRiR6AsudFuOCMw%2BTQaP99vty6SVL6GX7Z5DJzJcvjdEPmMZri99BhjUk3XX0sROuednJU8YGJtLzH62KVUIHuhQWXYdLnjjGbC%2B9J1th%2BLRAzc7cV8qCMGELwdsY2EWotcL6bsTn4iiI2YrLbyBLkgRnytHeUbx%2Frebri2pv6RzBtseQ15xhnzhmny9zoqCtE6IgERlhvUzr1%2BbfvPPRtlxNBL5s1m3Q4MB5MbRx9Xes6D%2FBu51kLbXsCjsT5pYGcROCF6mXYTCOJmzy8sTlrVvbpDiirBifJs97caTPrsGJlpbS00eqngD4tnAtPh8YK4008kEJnunjlXDqi56CnQayp2ewe783BhKhyH55d3ekJvRrsVN%2FaIQiMboQ%2BaYJ9Lvk17kjQStoPC4%2FH%2BM20JO0SrlUDdrlD77I3%2FruEIhdvQbABYojXIEplzs2kb5%2BJn3hby1Cs6o3jxjg%2BFRFtqJJ3Vkw0WuJTijw%2FyJpiG%2BBIp51eoH3UpQMaJDUEEaSoVheMYiNADkPQk56uWb%2F2pP4xNzP2C89OgzMwTioOqUlBsV7EpuhgyBEItcR3Vp2dxJerK2glYdmR7vt%2FCrwsobKzzEmhXBLM65U8AkmFLipM0ozCWg4jOBjqkAbysAEGmsEaYfhvpjihdtz9bjDnY1u0plasII33MMAYFJyBUNjtzPtt8mFf92oxdQQTD8uzbfm3IDuNgUu9f6WHBPMXeD6x1ODuk4P4fJV84dMiGLHm%2BF8LIHEWbjcAPrdv%2FeS1oIa6Iq94Gj0PLmI3BRxZVaGdHak7Wr7hKW0FcliMfH%2BRQULFWZwMak7Q%2BSyjUPiH5gYkbjEPwnMmzf%2BhNClfg&X-Amz-Signature=be4aef4bbc58feec3cc4eb2038e5fc478f98ecb6ad2b491045d52a8c0d30f577&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZBREAUU%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB0ay9DNcvNj7M%2Fjwn%2Bi%2Bmzy44pFPrz07CTdstJTCCgoAiAl%2Bv1DZbJudRpKy2FqVMuFiLAedxWDJqA3K7SoF8V31SqIBAiM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxZLk%2BJIMzxdiKslSKtwDGwJurYFnGkoTUBmIAgvlE2hrq1%2Bg92dg4jmljmFf3lEyYIorrj8ohkGcZIsMIw8AOrz9AEhdJYZdUjAtwMSW9kfeDzCKKB59Otr2YwfLX%2B2hJxgECEfp75AYnp1iXg2aAwcuWdZ4VVg3k3fADkxfCDbXdow8UaC9QH3qs501rjDVR%2BmAmLcw6rw0DhQTK8NfyarFGsXsqiJo%2B15RJib6LWP8iEGdfFDgHMbvlC2MrTap2HdC%2F2yYWL8e3xM%2F5YlrdOtg2c2XpalWdeQWReaxGFUPKQm%2FqXl5wHy%2FG5ika5s3YHl%2F4wFZISI3nKr4AC1%2BIKYGgHy%2FFGAU2047bowZWe7VxRIvScRIK%2Frv4mrNyucJxMQoH4zM%2B8gaMG3%2BdFvWACwChQki8bwODpY8jckf8Z84HbKn7DbYT%2FtkZdXWnHWwK1wrenqwmZJqTiJlT3JQ5uO31S1jvTabTP%2B1uIHM9KduwH72P6iMcEZhDRGtmiSKn0aPEqJP0bbMGxeQvOTOMRIvxMd%2FfbCsUn9A6aZKbZdd%2Fim5H4ty5ZsgA%2FgGCS9IGs%2F2WCfTqOKMxUiDqbiFtWos59zZyqnVLArOkIWF0Aml1bwtxkM385yIPjOAfwr9pW81LN%2FGptjFYRUwuoKIzgY6pgHqs%2BdQ3Yy9%2F3jMDuiBWP5EUSWg1q64Tyf6ToqkY0Y4SEqBr4kywQDSqB2lGgWIneoTMt2kJid9l5Lopuxb%2BVmaEvk6FPno%2B8g15rUKXzOKHxAbe10VFNDfsbCqOq3IzX%2BAbT3NLEfSa5xXOFuRf7x%2B3Aiqn1LdasfZgmXG328ED6fuRpjQt4ZcBOq%2FO%2B0Nsufy1ufsDR5aCidVpnlu8jdwpqE0Ut8i&X-Amz-Signature=90de87d24daf109d44253b9f9de3c6c8c56c721ca20003d6563fd0a2fc97457b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFGLD6QC%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG59wqJkwR7TDaiPinES8nSn06jtvEjj9Fw3rMwqrL7EAiEAi5szo%2FzGD1gUMGz0n1oX%2BuaUNdLJ2Zcfo8%2BGR6no5AQqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLQlcvnAq3A1facZyCrcA3jYZt1dqxYTx8cAIQvnucrbWMKt%2BUN8Vp1AKb0FIhmDZ6vaDZJzTcSzk6TiqRoAbBkCpo9nUwV6%2BwvKtvKnYOGrgkEp6bX4iV8TlR2g6x5o%2BIMndYYOdFuSWZCcbq6%2B%2FKKePaDOAmCK0tTA37a0r5tUblkCSN1hgXjb0UBzRRrfxg5ZdD3w8Yp%2BT2rwdBpU3YLrOBxttHAY%2FjL%2BdJ1h029fzqQaze9P%2BmKCHcSkILUQbE2CPNjrRhxEQtNJmTHGvCQ6FaXR9JEgDKz9j7ACV6oHDVPgKf6eoJLxawwceJvSChe2t%2BoqjYK356Qk0kxtj9PgMu1KdAjEtRNYuWDhUGVWUAWBoZxr%2BAEK1NnCABoNVqrB6hapq%2BZrviuXC2i8pzeOmI6odhpo8lpXcLKg65ERy88rhA5lmEe2y69fMgMWm5T1ucDIwrwueFKytrdtBSG3iB1EMjyYFZMVhMDnRNF%2BD8cdjycM0k6jdiyvbZ9XBpLFIDb4bgB3CnBAAVInsL1PBl1UGY%2BBfVSajL7Zgef4vwuCyBIwX9aIegFPyeei%2BdQ5R3nxz02uc%2FNpzi7D2DJtuxZSEcsH8Xq455G%2BZChnVgnvOS79F2Oxv2fzSG%2Fs2bimFx6xZ%2BtaIjpjMOODiM4GOqUBWVtHsFGjb3j09jR0jQHTpZJmtl1IT7YKPfTOLYcCwamMEPgaC4pU2Q6xxTsmoRfm2z7AL5KjTtkwq%2FEhx5JE5zXkjuXE8pFu8zjtjVU1OtcU3NhCGQW8Pi%2FYsWV8rk0N5RdtrvEqs0zvRrUMLlzGCTjRsNjk2VEw77cSnviLQGzKw%2FnDiwvhyCZXsK26V0Bo%2F%2F78l6JdWOZT9BEqWtbisBzdbthY&X-Amz-Signature=5e3b7c10b5e9ae05440358a5a40171a6a3a1a7533c053994ad4fb547ea2569cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFGLD6QC%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG59wqJkwR7TDaiPinES8nSn06jtvEjj9Fw3rMwqrL7EAiEAi5szo%2FzGD1gUMGz0n1oX%2BuaUNdLJ2Zcfo8%2BGR6no5AQqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLQlcvnAq3A1facZyCrcA3jYZt1dqxYTx8cAIQvnucrbWMKt%2BUN8Vp1AKb0FIhmDZ6vaDZJzTcSzk6TiqRoAbBkCpo9nUwV6%2BwvKtvKnYOGrgkEp6bX4iV8TlR2g6x5o%2BIMndYYOdFuSWZCcbq6%2B%2FKKePaDOAmCK0tTA37a0r5tUblkCSN1hgXjb0UBzRRrfxg5ZdD3w8Yp%2BT2rwdBpU3YLrOBxttHAY%2FjL%2BdJ1h029fzqQaze9P%2BmKCHcSkILUQbE2CPNjrRhxEQtNJmTHGvCQ6FaXR9JEgDKz9j7ACV6oHDVPgKf6eoJLxawwceJvSChe2t%2BoqjYK356Qk0kxtj9PgMu1KdAjEtRNYuWDhUGVWUAWBoZxr%2BAEK1NnCABoNVqrB6hapq%2BZrviuXC2i8pzeOmI6odhpo8lpXcLKg65ERy88rhA5lmEe2y69fMgMWm5T1ucDIwrwueFKytrdtBSG3iB1EMjyYFZMVhMDnRNF%2BD8cdjycM0k6jdiyvbZ9XBpLFIDb4bgB3CnBAAVInsL1PBl1UGY%2BBfVSajL7Zgef4vwuCyBIwX9aIegFPyeei%2BdQ5R3nxz02uc%2FNpzi7D2DJtuxZSEcsH8Xq455G%2BZChnVgnvOS79F2Oxv2fzSG%2Fs2bimFx6xZ%2BtaIjpjMOODiM4GOqUBWVtHsFGjb3j09jR0jQHTpZJmtl1IT7YKPfTOLYcCwamMEPgaC4pU2Q6xxTsmoRfm2z7AL5KjTtkwq%2FEhx5JE5zXkjuXE8pFu8zjtjVU1OtcU3NhCGQW8Pi%2FYsWV8rk0N5RdtrvEqs0zvRrUMLlzGCTjRsNjk2VEw77cSnviLQGzKw%2FnDiwvhyCZXsK26V0Bo%2F%2F78l6JdWOZT9BEqWtbisBzdbthY&X-Amz-Signature=4366debc182fc67fc23466d2fb43a8a1ab84395a42a3964a9bfd2ab84e56a947&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUTXYUPY%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHkKtqDmDuoxMvOKczzZpxREelL%2F9OOdgfxfpkSV4NylAiAMrYUA0q9A%2B6GgdfPeCHcXOp9Dm1edDB65c0sGDhDPASqIBAiM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMf%2BQIcpx9S%2B6CxxUvKtwDHlDLanQZXTNObpaVKC5vGLTJeX13U7U8K5zApD2dN2s7BoIOMyr0ZEYsHsyk3TaONgNZKRy7agixOSKatjATLt2V853NLhJ0j7H7fQkNx7pNI2zsZzB27wioxwzbJdoFXiPuH55W%2BAgODDJ7APJF0rUbnGv2%2BS2L%2Fhsi4sL67g6StABBDLkn2dlCJIELxyhh%2FE6u2dnYFDvH9ZUXj3nmglFUyIs0%2BO6J4YnyyPKyhm%2BnnQjiVpDE8ViBewmns3evk8H3dSq9dK1zoVm%2BHye%2FOAtSdSpUmDx17o05Hy%2FPGNrtgRRcACg8bUmc6MYcIoVKIgynBxlxE83PwKGw9pWgL%2B6QTObVxreIBXLb0RjvV8Pk5lUgEcC2BISDwCNwCghsV40%2BpaGyhYh9nAwb7Svj430NP0GPpqkJfjMTuNOorZnlmzpRKuzvMyYrYA%2BgPZ3Ru2FccO13wY8k4uhH%2BLCngjHqs22NHjLeAPa3%2B7Z7BkO%2BsjIA6fuf4H4MqzlT%2BUzmQgA9V%2B1xkQ%2FntF2TqqLHdV3QOd58Ik0x9lT7HkyyWqhF%2F72dDzII920EXUBdBOk0RugTK0LQ1NsHmHucw5rddw8vYZ5Evr%2B0jEqlwkp04yOnvoiYcEDtHRPY7tww%2FIKIzgY6pgFV%2FPYpTmEC9Cu1jfNmXxvjZTJYRXrYdeMKLc%2B1iMnmMHYoFkgUtTN9feQoGWLgcKxxxYBTdHWyqscZw3m%2BKkovq5NOZwRYhE8q3pURCtb9VqAPe5nfNPN%2F4OxniNL50NQiB1EUXIUlQOCqJoERnaM9XF6v%2Fa5psl%2FP3CWiTuAGpJ9pqBOrwcWQDrzj42kKz%2FskWddvNPU1icNEFk9u%2FSl7axgReKCr&X-Amz-Signature=c319db7303e4645c273d7fc77011b7df6579cf05d5f7a24d1073a494a2bf8bb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667C5UELXG%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCc28XctkaSJ8VVTcRy5vOzEhuV6oirQZ3T0eXq7WgQPAIgMxdzpg4JaG6wgd3xJutNFAO31icXACrOImlq9unmH8YqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIv197FGh9QIpoPFLSrcA79Wih7%2Bpw7jzmPOZFUQksRKDsmD2bkyZYApfbIGDje3%2BXF0W5z7t4FPsx549kAHibuhjHWV4Mjo7saZJLebqSqb969V8fn68OHyra2%2BnQqtCYB5B8zhvnVNGLyk1DCjQh3OSCM86TjBriBvsWXOA8mxrMOGiJ%2FLY58WbB%2BZcl8EWzA2o8CS8US%2B6UvKVFRZ5aScA%2BARMSylYjS55Skj79UlMq36Y3X4gonEyKB6Vc9xoAT%2FlHrjIqwynZyM5EjGpIINoFbcOOCrKXqYbFWioBmiANVmvlIL8g8s6IVkm8cLuO9QNV%2Bke%2BxsAQjz2TPZCJ9pNiO3yWjPYoc5nobSOzRkhnYTXswTxPhgNP5dTEb7OvEZVoG82WN6I2iMBWnkFtMakdOQEMAaf82OjjwzEhyU%2F6SIkW%2Ftr%2BjuxatKXqwA9seSQqnFvTzzr0rsbkc04Dsh7Eq%2FDCKVwfprElP2KJA5Ml4kdxXGESZ3Z2R9EYdS6L38DGqKXbqMo%2Fx0UKfDa8Y1QN3FasCLsCxm7ylOXriThQ6Ms2MjcRHnpdScH7WcHt%2BNrzgfESW4i88JXOQTfYXC0DsfIATl6TfiNczxljtFn8dhxOtQ0YxqfcOXaI6mMLuoaYI0dj8WmMtFMJmDiM4GOqUB%2F2TR0pCtgob97mPbr8zEqihaN%2BEuZLoRdWdWPD6T2JGnBM01kCXt3Jei8CAhyCPb2LaySLwwrY3%2B3LgiolvDazXsz48PUQMjA4nVraa6S1p3Ta3wfFpwQ4QsxkLejCVQEDgvi3eE03XEFp%2F%2Fi%2BZjM3RGDomfMdoOOER740Bj7LfK8cnBTbklpzIAUGzpoC8zdq9TjKUl%2Fvi3SAf8pAiC2T0Hzlc4&X-Amz-Signature=5a0def017378d31085fca9013482212e2b9e97e7d0a40605bacbd33718d38cbc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667C5UELXG%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCc28XctkaSJ8VVTcRy5vOzEhuV6oirQZ3T0eXq7WgQPAIgMxdzpg4JaG6wgd3xJutNFAO31icXACrOImlq9unmH8YqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIv197FGh9QIpoPFLSrcA79Wih7%2Bpw7jzmPOZFUQksRKDsmD2bkyZYApfbIGDje3%2BXF0W5z7t4FPsx549kAHibuhjHWV4Mjo7saZJLebqSqb969V8fn68OHyra2%2BnQqtCYB5B8zhvnVNGLyk1DCjQh3OSCM86TjBriBvsWXOA8mxrMOGiJ%2FLY58WbB%2BZcl8EWzA2o8CS8US%2B6UvKVFRZ5aScA%2BARMSylYjS55Skj79UlMq36Y3X4gonEyKB6Vc9xoAT%2FlHrjIqwynZyM5EjGpIINoFbcOOCrKXqYbFWioBmiANVmvlIL8g8s6IVkm8cLuO9QNV%2Bke%2BxsAQjz2TPZCJ9pNiO3yWjPYoc5nobSOzRkhnYTXswTxPhgNP5dTEb7OvEZVoG82WN6I2iMBWnkFtMakdOQEMAaf82OjjwzEhyU%2F6SIkW%2Ftr%2BjuxatKXqwA9seSQqnFvTzzr0rsbkc04Dsh7Eq%2FDCKVwfprElP2KJA5Ml4kdxXGESZ3Z2R9EYdS6L38DGqKXbqMo%2Fx0UKfDa8Y1QN3FasCLsCxm7ylOXriThQ6Ms2MjcRHnpdScH7WcHt%2BNrzgfESW4i88JXOQTfYXC0DsfIATl6TfiNczxljtFn8dhxOtQ0YxqfcOXaI6mMLuoaYI0dj8WmMtFMJmDiM4GOqUB%2F2TR0pCtgob97mPbr8zEqihaN%2BEuZLoRdWdWPD6T2JGnBM01kCXt3Jei8CAhyCPb2LaySLwwrY3%2B3LgiolvDazXsz48PUQMjA4nVraa6S1p3Ta3wfFpwQ4QsxkLejCVQEDgvi3eE03XEFp%2F%2Fi%2BZjM3RGDomfMdoOOER740Bj7LfK8cnBTbklpzIAUGzpoC8zdq9TjKUl%2Fvi3SAf8pAiC2T0Hzlc4&X-Amz-Signature=5a0def017378d31085fca9013482212e2b9e97e7d0a40605bacbd33718d38cbc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZ2YBGO3%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T032752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDaxYJx57yo8VfmhOQroLIK3svUQZclPcAZVE88kqDvggIgGPBFo3gb9U8FP01w3bYI9NjoPjoNstNwdOcfeayj3fcqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCAmvKZtIUz%2FcJ8PeSrcAwjwk3HSOSA%2F0qa00vXyJQ%2F3VzqIrmRDbUIMV%2BD0W52I4ZkI0C6UdIl%2B9R3MJEbyzV0YA%2B4CjPdYT1KEcfItzjH6BEbpxilmQW%2BDBm%2BcTeXimigUcI2AuaKMKB08bnPZt6I%2BAgNxwZ32ykrvJjMRknG3PEqIAMcSv81ZAo%2BbWo3KP2v8Mw5r%2FQyh249VW02UZcIhuAzEZEYc25eraxpEWtz8ZqBn29NS%2BFv9T87ekk%2FtvPp5dxoP3rhViepO4qYyLOmiIQmCE5g%2Fu5Bv3TOea%2F%2FXr3W3GBDo4L4Hf7xY1G%2FNQp7h0qXEY%2B1YST0PzNfDAKQQnoyooAPxHBUiTf8lTXVZIKi284yLkR2E9EDeJwoOi%2BpMoFyBsqtFZ1cS3NdsUOJMPeNPmETDbog6z%2FzFApZZ1FustE3uLb9I2IFjkGVBeFxrVzfdzGmQFNXJ3q7z1Z%2Fd3K%2BPuRr1eUsX9Ignqe4WD%2BShhXTKR5ot6zvmqSllanNesDskiYzOD441yNrlc33bUD7ou5Xdv2kcx6k4vHRv%2B4q9qO4ttCWP8zsUoRsH%2BOdXWMDT6rEvV%2FwANH0y15asqNXadC0W3ATFTgKqcplGs5YlZBg5jL7UeVKIzQ%2F2xkDs%2Fch4fesviPPSMIiCiM4GOqUBs%2Bovdbq1EuCGnkyNZvuOkESKC3tHTzZIZKNzVawtg6Dlww7FjtxwYzlIZt0emtDzcZBP5dqFnq843n23JUeB0YdvlrNebQet6Cb6VMyXdlT2FqAS4x6sjplCZzQUtyXfWcDu4KsmQSTF9GDooquR8R0AByqy3urbgurYOrVYrIAEwiCoSt2Qx1Fd8LTqeLlr%2F1uIcYaqCCquqJDh%2FpjtZJmBOg78&X-Amz-Signature=76710cb6c193db4782f22c511f5172b92a7e4cf9cd5d640aab2f88b71b4652d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

