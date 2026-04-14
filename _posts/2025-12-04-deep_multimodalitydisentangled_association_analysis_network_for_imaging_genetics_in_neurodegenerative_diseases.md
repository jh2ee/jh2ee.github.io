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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2NDXKNX%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCF9aYDnr3JibQpP2jiKNYNx%2BeUqCUmZ4nqqYwcgVowOgIgVpBjYM8via2oYg8dujdGYRdAhCfEL%2FUXpQuHhmfv7H8qiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKwZFhYWUOTAkLEPJircA79PBHbonPtQ%2BTOGfPJIS6g1Num1KFQP9%2B6H89LnV9IVLTUTIwX6j8oyKVL1lfCTguP%2BXMujQikTjJWF0wqaitcLBx4r0mH97GKjv6ceQpbOw4mcjy3RUtYl12H4nspdalo8NHxVJ%2BB5nMS4zXOrYHoCIVVCk3chpjWCYeTEHPBzqPuL7GIZhO%2FpXhlb6n%2FC2U5VGzO7Bo8ms59b1Zkc%2BaMwu5UMCuvaXwSvJm%2BpVpdR%2B0nACfRx0fjEj4lehQSxAWByNs4oVp7oOWcyjj%2FP2iz2ql5xhBKcvBja0rTg7YjyTjEUpEF1etUeZtdutUThhiqxntyFcgAY5CWP%2B%2BXiRQDLwWeUPvjVWvT4RO%2FMJcOJbfBgaDV%2BObqpCLbW2i66Ng5bcqW%2B0lc8YiF8mfyGkchOKtkhNNtZKWmDWum1RaT90coLIaUowKVtuKvFmagdQ%2Bz0P4%2BljdiN7AIWl7lIDfr4C1pukJkZVzS3kVUp5iXdOjJerMjjKWvUOixZPFLDlp1%2FTsRaxGvWjqb7Cm1Wz0QQAN34GFwCbNII2R7%2BzJZ%2FKHfN2kxxU8ygEd6%2FgxQXmkRQFJpX8V9Xhe14o3XFqrDNqNEcseW3lFgSiGi%2BdhjfPhDY%2FzprkinA1DRAMIL49c4GOqUBBsLUeyEypSaRWrVfzQ11PJH2C%2FGR%2FS0x805dfnEl%2Bj1%2Bljv9Pv4KyDxtpnzpJT2t5B68NwrhC%2Bb9b%2BsUkQiqhRtgMFoAKSCYJj4uaO37aFOouWUhF%2FK7zx7iYk6jn87J%2BrSgY3987yCiLDashg3W4f2JQp%2B1ytJYV99wkodyyP7XP24o3e75tBE2kNOCN%2BZ%2F9N7h1OxuRMRrEt%2BTVoc%2ByaYDJ0UA&X-Amz-Signature=aae9b49dc86708b79900ec20ad0f69a337ebb33c57294f4ce87c0057b1f3f7c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2NDXKNX%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCF9aYDnr3JibQpP2jiKNYNx%2BeUqCUmZ4nqqYwcgVowOgIgVpBjYM8via2oYg8dujdGYRdAhCfEL%2FUXpQuHhmfv7H8qiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKwZFhYWUOTAkLEPJircA79PBHbonPtQ%2BTOGfPJIS6g1Num1KFQP9%2B6H89LnV9IVLTUTIwX6j8oyKVL1lfCTguP%2BXMujQikTjJWF0wqaitcLBx4r0mH97GKjv6ceQpbOw4mcjy3RUtYl12H4nspdalo8NHxVJ%2BB5nMS4zXOrYHoCIVVCk3chpjWCYeTEHPBzqPuL7GIZhO%2FpXhlb6n%2FC2U5VGzO7Bo8ms59b1Zkc%2BaMwu5UMCuvaXwSvJm%2BpVpdR%2B0nACfRx0fjEj4lehQSxAWByNs4oVp7oOWcyjj%2FP2iz2ql5xhBKcvBja0rTg7YjyTjEUpEF1etUeZtdutUThhiqxntyFcgAY5CWP%2B%2BXiRQDLwWeUPvjVWvT4RO%2FMJcOJbfBgaDV%2BObqpCLbW2i66Ng5bcqW%2B0lc8YiF8mfyGkchOKtkhNNtZKWmDWum1RaT90coLIaUowKVtuKvFmagdQ%2Bz0P4%2BljdiN7AIWl7lIDfr4C1pukJkZVzS3kVUp5iXdOjJerMjjKWvUOixZPFLDlp1%2FTsRaxGvWjqb7Cm1Wz0QQAN34GFwCbNII2R7%2BzJZ%2FKHfN2kxxU8ygEd6%2FgxQXmkRQFJpX8V9Xhe14o3XFqrDNqNEcseW3lFgSiGi%2BdhjfPhDY%2FzprkinA1DRAMIL49c4GOqUBBsLUeyEypSaRWrVfzQ11PJH2C%2FGR%2FS0x805dfnEl%2Bj1%2Bljv9Pv4KyDxtpnzpJT2t5B68NwrhC%2Bb9b%2BsUkQiqhRtgMFoAKSCYJj4uaO37aFOouWUhF%2FK7zx7iYk6jn87J%2BrSgY3987yCiLDashg3W4f2JQp%2B1ytJYV99wkodyyP7XP24o3e75tBE2kNOCN%2BZ%2F9N7h1OxuRMRrEt%2BTVoc%2ByaYDJ0UA&X-Amz-Signature=aae9b49dc86708b79900ec20ad0f69a337ebb33c57294f4ce87c0057b1f3f7c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IQXILZH%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDLhnlGdZlPd22l7lnUVTrkh7%2BvoGWI8LXCHi7eptRgfAiAlrl5cl8jzutWXTpuMwGtD%2FGn%2FMZZeZNnEncVhtbXCWiqIBAiB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2B3n28wpdBs5uDQ68KtwDVygnrkpIs3%2FgElPP70FBP%2FTGnjPEDioDEPaQfS1IoF%2FSBvOarCkVpMkcnIhmAGKcj4iBxS5drjxd2Y%2BvPPhSgrR0QXtJcZzsmyfiPCKT9oVjclqNvEryeYU%2FAZQRVaFYpRzg3P40fi0u%2Br3uuaL%2BodkqvNvnsQ8toXtDFS2%2Fx4jOx1%2BOPvBLv9cuGuoauM8sm70Iceb7uJe%2FKojbTDpZqMdn4vXZUIJuldefM7jWEO%2F2ha2UZ%2F20sr8QFZwuzLNlzZqkyuYsrcjLbtDaDy8kWG45Kh8n8Wi9cHL91hYetkVEePwKZ4rXV3zrLqlk7M9S3cRbn4YqGs%2BLFQ7OCC7dAcvFlK6dsKacV8jLUGS0RGeCQu%2FGtvF35dB5Y%2FRtgwl3n1%2B4jd5GSny5tVSadaLEuYVhcma%2FWp0%2B7F0LpRTchVRj0%2F49wnOGe0hIN2Az9NbiOQGMd1wn4GwjSYKp2YqX96JYL%2F30XUd4mTlnaaJqNIIv13E51niux%2FDExzRNojz47pa0cwkvxsIbHPOELJ5E6yGm4cQBMaBWilFT23BoNJ06%2B88Retkrz0iepufL3EIcBo5BsGBaqv%2BLnhGVSK0B2Se%2BShFl5A4lXDNEAJ%2BvUPbSLYOYGG0xbcEmFMIw9fn1zgY6pgGiSw8idfkwo7Yw7JeEmN7x0qvbBJGujhXLxNUj02eQpehDpptJOZ7df0ZME13Rcvd9F7e0Ke4DFhhYf34qjGU%2FApyTc18oOytrRf874LP2xlU8Fuk112zdvgE8gZdTweQfHcjREbDpWbmbeCcn9tHSxZLaSxEi7jSAO9tZLg0sorQOSeIwv6AVlohJoyXoedvt%2FW7VRKolUJeSraQvGXRJmHjt%2FrQ4&X-Amz-Signature=bfc294a0e73be8017654ab9ccdaed860d31e5744c421e134d3be5aef0246386f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LNDMV6D%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCdKi3LanRRp3yFrjxiWZ7ZomvxTqii6GaFnSP607cDWAIgG8m9Z7df71YSzsba44hmIQ53ao0Or1PHt%2BJ%2F8EMdFYoqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAcOoMoI4veNummWYyrcAz12JNFCzFkD77oG12dM0ERTYxwT4Y%2B%2FBiPwmosxjyF6w5JzbMW4hujhNX1pwVWI1pDNe12pN0AjREaZjayrRlF340bwk0s4j1Q6KO8zqLkYwpHhjIhwTEtTtVoT6BGHr%2Fk%2BPe6lJy%2FYg7mJuZ1V6PyRmCt262p%2F%2FRYGI51Fj1IDjS8SQVme6VEtkbQMdSsYwiKVu%2FfLtRzke2nwKzaxsB%2FzxW3dCiU3dS5A6GU%2B74MmZ66Ud5Qx%2BdxOTk3AMe%2FKb2GhsLwQ4SdytoPFn5lJ1Xkqg6L8gJDwsVgzCCQ7C8djTiLdD9gIuRJxAMmw8xdupCYtm0HMMBowVKUfkNW%2BFtJSpRGper7414efWGbc1pxfVwH7jF4Gbk7xE%2Fl7hr%2F7GbFCdaAOYlrsyB8ncgXo4UTsHBSXfiKXaDbVXjatyQ41%2FD1yDiY7yQF62Y1kUgSbUKdUISgKhJ%2BFJQ4WWuO5pxon3rYT1vEnE5gQPs5XJm3TTMOO4X%2FmHEGGwNYDyI01W8y5hGiwOHtOE0Igjbf1AREfWZB01BsMUCh7MbyRsyZDRRSPCFM8gdVcVnRhG7GSb6w254locKSgn1az8Kmhrmgz4Wm3PrCW4ZNlG1OGw1YfL4Ta9RYGmUjH%2F8%2FVMIqd9s4GOqUBFaiwDRHFI3jVv7eRalevFnKYr845b8qLJaTsyWeclAkLYPpdh2VPwwlrqOxLs3doCIkWe70QPNEwgXlQ3Ze%2FYBOudZUvFirSd96%2BQsPG%2FVJtVO33PL6HqJKjgvtfARkjTtn4liQZE0yAAWb5ZMn5xn1gsa5g5GGz0hv5oUJYyCRnHjGwEeEwyD9a8gIgfzUuWcRj65%2Fmpv3L0i189E1rTQiNeZUw&X-Amz-Signature=5956f06dfe41821d2a5ad73ab7eaf36b63855da225ba3e3ee2f34b7113845b96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LNDMV6D%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCdKi3LanRRp3yFrjxiWZ7ZomvxTqii6GaFnSP607cDWAIgG8m9Z7df71YSzsba44hmIQ53ao0Or1PHt%2BJ%2F8EMdFYoqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAcOoMoI4veNummWYyrcAz12JNFCzFkD77oG12dM0ERTYxwT4Y%2B%2FBiPwmosxjyF6w5JzbMW4hujhNX1pwVWI1pDNe12pN0AjREaZjayrRlF340bwk0s4j1Q6KO8zqLkYwpHhjIhwTEtTtVoT6BGHr%2Fk%2BPe6lJy%2FYg7mJuZ1V6PyRmCt262p%2F%2FRYGI51Fj1IDjS8SQVme6VEtkbQMdSsYwiKVu%2FfLtRzke2nwKzaxsB%2FzxW3dCiU3dS5A6GU%2B74MmZ66Ud5Qx%2BdxOTk3AMe%2FKb2GhsLwQ4SdytoPFn5lJ1Xkqg6L8gJDwsVgzCCQ7C8djTiLdD9gIuRJxAMmw8xdupCYtm0HMMBowVKUfkNW%2BFtJSpRGper7414efWGbc1pxfVwH7jF4Gbk7xE%2Fl7hr%2F7GbFCdaAOYlrsyB8ncgXo4UTsHBSXfiKXaDbVXjatyQ41%2FD1yDiY7yQF62Y1kUgSbUKdUISgKhJ%2BFJQ4WWuO5pxon3rYT1vEnE5gQPs5XJm3TTMOO4X%2FmHEGGwNYDyI01W8y5hGiwOHtOE0Igjbf1AREfWZB01BsMUCh7MbyRsyZDRRSPCFM8gdVcVnRhG7GSb6w254locKSgn1az8Kmhrmgz4Wm3PrCW4ZNlG1OGw1YfL4Ta9RYGmUjH%2F8%2FVMIqd9s4GOqUBFaiwDRHFI3jVv7eRalevFnKYr845b8qLJaTsyWeclAkLYPpdh2VPwwlrqOxLs3doCIkWe70QPNEwgXlQ3Ze%2FYBOudZUvFirSd96%2BQsPG%2FVJtVO33PL6HqJKjgvtfARkjTtn4liQZE0yAAWb5ZMn5xn1gsa5g5GGz0hv5oUJYyCRnHjGwEeEwyD9a8gIgfzUuWcRj65%2Fmpv3L0i189E1rTQiNeZUw&X-Amz-Signature=b95eec5405c7e9ffee64b4f4dfa3a0dc195119d8496933207e6a7a3b06a83c16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOYDBAL5%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC033UmYcpoEuO8vXi3pFx60dBG8l7ZrZUjBqsn8uJF2AiEAhba1qqosjB03yQxQd9BASH4GXrBwRvv%2FQnDs2Z4DuKEqiAQIgf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHmaXBImBlWEcXke1SrcA4loF5jMUh5rTbOqj5nYhwca0lnNAc6ejGtOm0PqKvx44VZfjwcqH%2FxSQDzCxJdJErmpRd58SvWNrmq0mnB8%2B%2BaDrsV2su9w%2FSbGY9OTXbs4%2BFK9d4Gz9w3Rm5DGgKrXBwacT2GCX%2B7Z%2BmjBryRWjkKUFUWs%2B0lS1nbLnicGYFiT54CoXHfKkBDjgj8ceSOVvX%2FRMYM0%2Bb02G%2BIFebKR%2FHBvYtdhH%2FtJHNcDlVoqqxjnHdovDDYyv5SW9LY%2BL3rVInTKxC1iwEwdr4n5urJA%2BHuX1lS9We4PW4R9CWFSHkOw7WiFIV%2BB7ymkjCNU9njDLUCNA5VMp5EFa9qdI8Q5nd9fOKbD3jA4eH8ffYWZXQAXTTiSpLAmNMoM4Inb4wwCTgdO8cAJSct40jdOLuCN%2Bb4pLT5OZXzeAn%2BLxDq3zPu%2FXlKz3kHUQUxcFY8vgK09RizNbJI1gBgDgbSV4L0FG%2FeWSEfMPj3XmoHFYg6zPR9Tt%2BF4dtbXJtHV8sK3gT8UgMhclApdyXsf9NJDQXBO51elA1PzED0MNCu8Fzj%2FgF7h3iuaI1JILES40tk1rety45Vp09DmAq%2B%2BTgB3iXaxu9BOYKH%2F2cBVg7Z%2BYsYIWXVIiy0G1be8zJ6u6RnaMLz49c4GOqUBlrl9fLcrE0zVTUwQjus6G0CPxebtgp4A4CQ7fGHmoP9dh7RjAkmdX3Ck3lx9E00IOsvuxjsMCJFwVtEoJu52H4QDlIVhlUernhEoKXIROHfrzCl9MRRo6Gim0gliCGhLqvzoThXwgNyAp5eZpH0TSWIYX1g6rQ2vXT6iTFpfGSwFg2Cq7fLJUaAwdyFlwpBxItB9jE9RSVqleq9iJeVW232RkC2i&X-Amz-Signature=a9f00b1de1cd7d4e2635dcb1d7f993ff2fa40e5859523d3679ecfd5adc7a70fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRKTQPZB%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFHgU5fEImNLo5StXKrDaQztoiTMxOKCBRsbbwqNP5y5AiB6FaEONidgXi5vQJ8VmGsCmA%2B2tsu95jaX9UBzsLctEiqIBAiB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQsXoqdMtlBd%2FoxZtKtwDGhu1bgh3JZYkcr95HQb70m3bEz2KGLy6vn5s4UdKvcQF8IRDFneseReT%2BsMDTgvsXfocZDuFYyXHUVOumZQxQvyuOOmuT9TWVIaPrYPMgoEIea%2BIgRnbs6F9RR1i0Bjc7lRyau%2BgA9cDXe3LWx2n%2FtoPi%2F6x9xXFHYsSxXPPatuO7MlD5ciGjNyuFTUNF%2FWQ136FSZlhOQFHruDKO%2B6Pbl1z2Pmh8o2OP50NZDj%2FUQ2JR6xoxBBKlOuLjeQgBdU9QO3XanzCQurjzO%2FfXWta7j9yZO2kDkcRutwK5JVWhwmzCN28C4aQfhO4m3qdgj1dEta%2BirWssM2nIOJG6In8xkK5iSVTsUJJBhmHYb%2FDOV4EMQg4Gkapsz3BSP7ayNI2Zfi%2Bh0dhxsLPxF4pgjU%2Fmb8NGI2nV1O8%2FNMT5XTmBVbrNh%2FHPk%2F9T8dldloUtrGlYXjLJ2W4t%2Bcz7LNqlk%2FoSNFhwAr%2Bh8x2At5pnF1bkKJCUmrWC%2FjhmPc2GjkrsNlhKoKWQUswx7j3yj%2FMzDD8lw1867uUu7lPXT9BZ8Ya28iYKvMacAmVAkEBd%2FJ5If%2FtI424Pohpze1VceXrL6Abqu9XUJX6uvQp2S9y0b8yndav4JqnYUvtTMUvqZ8wlfn1zgY6pgFrR4O2Nke7xUefJUE9Pwc5IbOx2Uhar00YbTESV3Pw8qhU7U44FOP8KBFDIrFLw6pFLFAVFDihNlBm85TDZ%2FFyPyAcNIKWYLoWioBwpns2RS96J7xe%2FzRZyqVvSohR2JFDvM49v1dQ2ZkXoXgkEH%2FPucADaPoygelF%2BZrbU1mJlvwnL1VnITex%2B5h1PwS6cE7oRvRKwhlWKUO%2FQp9nZ%2B%2BZje3Srg6l&X-Amz-Signature=2125b744cda1644a97635e4a01eff6220f2339848bcf3367e431c270411b2cb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UG5AJHRL%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD3IDeJe83oCdKd4dFQDxlQufMqZJCBZz2CU5hAFPIldQIgR2sNrAzUq%2F0S1%2Fh6AObm5jJwVK3mr8c%2B3Fi6HS%2F2FqIqiAQIgf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHjzKyvE%2Bw9LlLRfVyrcA7FFaBKKgCwJaZ3umqwRyMX5cUbkGqnY7rTie0kI%2B0O3iuOtgRuj8hR4rCGb322536JdZY%2FYfdTUrogl32LOdZdRKoQEGuimAnckDs%2BX18y2oWt2n5Ln5eLmVa8tk7UyGOKhIsoNpNcLvEqaFz4U%2BdNzU4maHDHkLLZm9pTned8FrcAze2PjHpWhPjMfjda%2B05BF2zadOuo1miEG9DVez34p20UcBEaWgos8NKACvbZ8gz%2BJiwgQ32WPZDBg5KzMHVEiotcuJI4S5Dd4w1BNk9%2FL0RWrk9ecBEVZap2uIftHMv3LI9LFf2j2NvaBU7AQF9GBsNRWzQP0w%2BW2yyD422Op%2F3s1LIbbUfGyw9xfyvep1TjQvgQJ8M8ucgfTcQO5uNuN4UnoRGbr4U2TbktXY850iY%2FYUkj8ogM0LM6a0Udyc%2BiLejJGhu1nKHKHFlZOmCz9amzc4OnwzDZCjCmtAVEICMaeic0D3qyQnPeH1j%2Fky%2B8GbVWuwaX89BS6ryw0OlHAQJrz2Cf8Jr5h3t%2BWu3%2FFE6%2FY8di9wmaIXTKC4qvUMNPS8%2BkntsyhlRWenWVHXCSWZeCkssBor%2FDW0ZgzP%2Be%2BpDFUz0vXuvFF72LjPGDH3TnTHzs3Yl2pxHaLMMr39c4GOqUBBN7G70DL8oZpjEGLCoky%2B5%2F082nLnPyvezqBdiK3giQboTUtkruf0bN5xfNhJmc8rDV4HQ%2BtcuZ9qFWFFNtqHKSn%2F52%2Fuollyg5Mwjz8y%2Bxm6UO%2FAoYXoVQTlLsEDWs%2BuRJNN2UMUeKPlgUXPbMcf4jCdhM7Znny%2FJagx4%2FVkP8K41jy6SwZ4TmlVilxZf%2F%2BiT7EL7tfjvlVmBzG%2Bh0LEtryz1uU&X-Amz-Signature=e615bf97c82dd5ced8988464340c2e9dcdabffa422a6258fa40d7a1dafd7dfa7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBYSWROD%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2BnH0BC0jsXvlIXmw0od5Rr3euPlUg2JZOAXJpeoJNQgIgLPSc50mRWDe80N%2BoNmSH0U%2BzjiwfMr9BdPQ%2B2yCDod4qiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI%2BzeEFIaP3xoBKhsSrcA09li8bQJnK9Dy2eb5TGwSaxbKMA0WonIq4fSTvRpsnIOTshCRHbIFtEU8FaSPPCqwBUNMSEHR8oZOEGG4AqsQdnb6Qof3kpl1dKspzcUX0wJsDq8TkPkjH4Y6HlbE6uF4MoWojf3QphWxIrlJ70tKTk9NyAOG9tB6os2wHF3eC9hdsofY4z8zQlbnMr0FbTJ7z7mtOxqMEmLspQfJNBskTLzyX4wcMvvoIf8SyIX%2B1aK6UCSHcTJ4hOq1llkUzc7J435WTFjfmtnOBdz40b5gyJBU6YO9H6vo6k1JPtYs7gwTccInFXUQb2P5bEdGZn1MRdhmBmc%2F7iRVmQoIdy1kS8CEjcWaDFILzW%2FX8gPANOmUamHnKXimD2ZlrOESivtgsMD3P7KdPMvrC%2BaTtu26K2SDcse6vzVrYVZxtWrqnrQXusWllhK1yjcsv4%2FlD5%2FWnDTQ7ShdD1wu0CwtTnLE3lQJYRm%2FWqkNzEeEWggjH%2BrWn8Vg0PKFSEYJIEtHIjjMio0Y2SDzdLKGBiUUi5AMf3n5VMd99AtkOX0RPTe8qagwdRmszB6vt9Yu%2B0kqsemFtvw%2B7FeLff30OOfsT%2FblTbK3nuoIxBfUjy1mXAIA%2BwRTdRLCPXbw1NHGaMMN759c4GOqUBhX1fophNWgGY8SB94dIdudeUwzCbaEaeRCEZ7ngL86qFACwvVmVNkMdHOhkaBZdGsZ21Xe2XRWiNWx5uZRxVyNPipMrT%2B3SPgMaKE112hg68I2lOCS22acvvuRUsB8YwrWjXh5w3E2OYVzzNRiUAN6YlzLsRJTL6yh5bR9CJsnHG69urQ9nIR%2Bve7jR82QSmp2UQkt%2BK61NlKCT9z7nQiHYC3Mo7&X-Amz-Signature=244e964191765309f9fe6ab6134c6759ed97514acc60efcc29cf12032172e090&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBYSWROD%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2BnH0BC0jsXvlIXmw0od5Rr3euPlUg2JZOAXJpeoJNQgIgLPSc50mRWDe80N%2BoNmSH0U%2BzjiwfMr9BdPQ%2B2yCDod4qiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI%2BzeEFIaP3xoBKhsSrcA09li8bQJnK9Dy2eb5TGwSaxbKMA0WonIq4fSTvRpsnIOTshCRHbIFtEU8FaSPPCqwBUNMSEHR8oZOEGG4AqsQdnb6Qof3kpl1dKspzcUX0wJsDq8TkPkjH4Y6HlbE6uF4MoWojf3QphWxIrlJ70tKTk9NyAOG9tB6os2wHF3eC9hdsofY4z8zQlbnMr0FbTJ7z7mtOxqMEmLspQfJNBskTLzyX4wcMvvoIf8SyIX%2B1aK6UCSHcTJ4hOq1llkUzc7J435WTFjfmtnOBdz40b5gyJBU6YO9H6vo6k1JPtYs7gwTccInFXUQb2P5bEdGZn1MRdhmBmc%2F7iRVmQoIdy1kS8CEjcWaDFILzW%2FX8gPANOmUamHnKXimD2ZlrOESivtgsMD3P7KdPMvrC%2BaTtu26K2SDcse6vzVrYVZxtWrqnrQXusWllhK1yjcsv4%2FlD5%2FWnDTQ7ShdD1wu0CwtTnLE3lQJYRm%2FWqkNzEeEWggjH%2BrWn8Vg0PKFSEYJIEtHIjjMio0Y2SDzdLKGBiUUi5AMf3n5VMd99AtkOX0RPTe8qagwdRmszB6vt9Yu%2B0kqsemFtvw%2B7FeLff30OOfsT%2FblTbK3nuoIxBfUjy1mXAIA%2BwRTdRLCPXbw1NHGaMMN759c4GOqUBhX1fophNWgGY8SB94dIdudeUwzCbaEaeRCEZ7ngL86qFACwvVmVNkMdHOhkaBZdGsZ21Xe2XRWiNWx5uZRxVyNPipMrT%2B3SPgMaKE112hg68I2lOCS22acvvuRUsB8YwrWjXh5w3E2OYVzzNRiUAN6YlzLsRJTL6yh5bR9CJsnHG69urQ9nIR%2Bve7jR82QSmp2UQkt%2BK61NlKCT9z7nQiHYC3Mo7&X-Amz-Signature=469e1cf7a9b4386267ce1ba056165414395d7659ba7337291f67265870681dac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662LGW2N5P%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJFMEMCHws7L3IRWkf1dNCHFCs4hym6iW77jjDkNOVs2jmyhkACIFO59Xg7JGA2jq0Gv32TJ87h384zcn3FwhtOPy5Q2%2FhPKogECIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxTOF7LPGUj%2FI2WeuMq3AMCnC0KMPocKGC%2BixNWhBPH%2FQmGmn10DszobrczZUC9UCIjSk2zoN9yRQt7Tz5QhB2cGENxuGN7BotNGs84VWK4QOom7cecTMAPQ2WRJsAtOOIM0hxPSWlA9Au8DpUtdXagEczs%2Br3jV79gvXcWKK4NeERk70DGGt2tM6sSolDaWbRzLUqjbm8fZAp4SeKAQXACdaCGS5pXNcWQZGWyAI86mN5IVomEa548Xr1diqnjnqEWa0VqQnQJ%2BUmxT7Zvi5bRyZJcoIwzegB9GyxIKMP6KAnju8Mxvzp%2B9zBVvKpOuuPCPN%2BeI%2BkuKZWFBiDAPFMG5ta%2B4rkp8bxL04%2FBvDUfOAiJJgLaMWJW%2FKwqHfO9AGNIvkDlP6rtn0BgXcVcWifAO3jWNyvnunHLfnXg9vuTbQAYq7e0UTvZdiZjkMiYaIeB41oN3ga4UAiZrlBoqnh0wW84Ya699rX3Bbmz8Tqs6sSIpwPPyY%2BZ0PcIPa8QT8cTwyxHMXoIwqDFO%2BxjorXDti0xKnbKYRJacGPpglXbBNXrA%2F5rL%2BjQ1Ucsf0xvpH9BbIBfIYHimUnDSyiqa2lp4t%2BRbFgLYvUnIUEMMWn%2F%2BO%2BtI42b0oxFCBbWGkp%2BsRDMESg8N1XZ8aa1CzDG%2BfXOBjqnAf2yVq97T%2BI1%2FPT1vbQrloxPKUJcNRAzqj8xDjjtkU%2FFIF%2B1jxXgQN%2Fxwav14%2FCW2r6EZKAgzyb65v0gNpDZIvg6ftmQUBYDUbnaKBY7XI7xaPZM4Wsybvx2MsEjCF3fLw%2FzTcVQDELiHVFAkPaRUzZEpx6kLT3TtAyn5Ett0iPsFtiJbUQIxDCxBSoupwz1c9d7KnBrIKmT7XD02JF5bdCPiTAv5M52&X-Amz-Signature=efebea3804bd3cb0b0cea0bb242581bedb38e870dfb7940abec21287b76ee4bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676AIIM3S%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDTXJOGcqUJNeffVkkCs4Ar84F4GdelKIIsLBlM4pja5AiEAx543EI7BxB%2BQN%2B8iF7Zs5CJ1lr%2Bxjen0bHz3I3x%2FryUqiAQIgf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMaWywXbrdwLNYGNgyrcA06gciu86c%2FuAlLxTmJalhCdK2ctHObU%2Fqk9XZNcJpxplv74IA1Xzkt%2F%2BxP06gc73JNtNuT%2FkRgmaQ15ZW7j9sU9RCc3TfIAupAA5SnjO%2BBI81QIACaf6FD120FaFuBKUxjuNYV%2B15q5zpybJDkpLxsZFdYhUGGOEN0os4Lpq25kyujrikp7zCA82EqTqp22EzeXCPDw72Qns611IwZlV%2BUI%2BaLWpv4CUR6suuXpw7Pz0PE5lObU9KdC4IlqlHhhiK6P2xZoVmmKvhtx9X4nzbWAzpC1bypf8cDALsJNgoAI573CJ%2F0a4WsKxoHNEwDt8QSHz5sNkAYIojlQtQg7yMBAENrU9Hq1Bn39QwlEeWDNGc14YQt1MWtfoNm1UwYsVhfsq0WkIo0PGOfCilhNxKb80D%2BZeYpgkldncc278yRdEmx5dZODxuXkNBx%2FI6S4Tjn3V%2BohznAZaLCeGsK%2B2YmDQe4a7Ikac33BXg6awemNXVQYPj7AdKd1WbiBijqcbF2R%2BFFEcOQivVPycN2zyc5X5bYWGUdARnBRTVzyFNRLQA7snSvB8ZdjF9tEl4bTzIRQbc%2BwsdZLyExejzBvbTIP4Fr%2BxnKSwPN3gP5Abkp1vYnIE8%2B6RDtHQFmUMPn59c4GOqUB6ECJmvPNfZ%2BfxQtHvPFvXnQns1ORtBovU%2F%2B2XoB%2BRU%2F8DHmD%2BxcRcJnM0T6qUzBmz%2B3NQUGkKDE%2FIc2ebAgVDkeEirMQwcKJKtzhUiyKkwZP13P5wdY5aKShIkHCCoBHNhec7txDb%2B7%2FaFKNjNq8usgxrGslWQB5hD2xhsohqOvR4LkBzJ7h1bIjKGrxd6yusYsJi5meP7DWQ9oR25fc6CQuSiQe&X-Amz-Signature=744c5ed9a43b2287a040585d6706f24b932fbdaa6eaeb3c6036456ea9c8bcda2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676AIIM3S%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDTXJOGcqUJNeffVkkCs4Ar84F4GdelKIIsLBlM4pja5AiEAx543EI7BxB%2BQN%2B8iF7Zs5CJ1lr%2Bxjen0bHz3I3x%2FryUqiAQIgf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMaWywXbrdwLNYGNgyrcA06gciu86c%2FuAlLxTmJalhCdK2ctHObU%2Fqk9XZNcJpxplv74IA1Xzkt%2F%2BxP06gc73JNtNuT%2FkRgmaQ15ZW7j9sU9RCc3TfIAupAA5SnjO%2BBI81QIACaf6FD120FaFuBKUxjuNYV%2B15q5zpybJDkpLxsZFdYhUGGOEN0os4Lpq25kyujrikp7zCA82EqTqp22EzeXCPDw72Qns611IwZlV%2BUI%2BaLWpv4CUR6suuXpw7Pz0PE5lObU9KdC4IlqlHhhiK6P2xZoVmmKvhtx9X4nzbWAzpC1bypf8cDALsJNgoAI573CJ%2F0a4WsKxoHNEwDt8QSHz5sNkAYIojlQtQg7yMBAENrU9Hq1Bn39QwlEeWDNGc14YQt1MWtfoNm1UwYsVhfsq0WkIo0PGOfCilhNxKb80D%2BZeYpgkldncc278yRdEmx5dZODxuXkNBx%2FI6S4Tjn3V%2BohznAZaLCeGsK%2B2YmDQe4a7Ikac33BXg6awemNXVQYPj7AdKd1WbiBijqcbF2R%2BFFEcOQivVPycN2zyc5X5bYWGUdARnBRTVzyFNRLQA7snSvB8ZdjF9tEl4bTzIRQbc%2BwsdZLyExejzBvbTIP4Fr%2BxnKSwPN3gP5Abkp1vYnIE8%2B6RDtHQFmUMPn59c4GOqUB6ECJmvPNfZ%2BfxQtHvPFvXnQns1ORtBovU%2F%2B2XoB%2BRU%2F8DHmD%2BxcRcJnM0T6qUzBmz%2B3NQUGkKDE%2FIc2ebAgVDkeEirMQwcKJKtzhUiyKkwZP13P5wdY5aKShIkHCCoBHNhec7txDb%2B7%2FaFKNjNq8usgxrGslWQB5hD2xhsohqOvR4LkBzJ7h1bIjKGrxd6yusYsJi5meP7DWQ9oR25fc6CQuSiQe&X-Amz-Signature=744c5ed9a43b2287a040585d6706f24b932fbdaa6eaeb3c6036456ea9c8bcda2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Q6RT7O3%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T011146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGRUtY37GLtgTjQQkfs8iWHpeIhnwJiOBfPL0mIbmOgsAiAjOBKgGqzR%2BFb%2FxtgMsqE14NGZDtA46Yg%2BbtZmuiIwGSqIBAiB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMPgthutUURk5G9xJSKtwDSRNOu22vuaGWAaCv%2F2hLJV3hFqeVA4lL7y3CabPJnt3gPt5ixwJTHx2vD%2FQV%2F3vWbN09zcBbvoE5hiEYZLj%2B3bL6sy5uA0tI%2F5bdBhhTYLQSzefPxLbPc2FIRD3OKDl5hXyBRAcvxHcXpS89s7bFaGzzSdLr94XYm2eSrcrjjnnlHWLilCA5w66zhy0TP6HAagWhS9MHeim26BthmX7HuE4G4RVbwZKYxX%2BK9FPGpgeSbCAjf%2FTjm%2BAZqk6192FlMObPC5kuyc4H6HBOGxT6YVmCkB137ZJ%2Fy318wCRizHzEnmk0vY%2BUtJhI2U6g4syiVjwewaTIKm41xIGGZiXI%2BI8PjGXtwzEB7MIwgN9%2By0VIh7qfUswFaaq%2BVvocgMoEA%2F6ooxhjBKPFEHKHprhZurXzWNeMLg6A7rLiDgb06NpL59iek2jMCVXclNDxi2DhtG8UUlMTuW5UE3ufK9Asv63G3y355O%2BK5Zzs8wD8OXlthmBolM%2F0aD2okwSLSDACHAI1MYADUAGejYsjQA5xPTPZop3z32gVaLmkIzjXR3xTWdv5ivQ888V9R0EXf2v%2Fw7TdO2MjjiKqrZW3VKNLzexX8%2BrIUuJZwKpj9A2sVQCISHntMJAVu4WDKiswvPf1zgY6pgEh4kZaefDu6BYR242xmSZH4P%2F4jsIpf75Ul%2Boqu3wxwYySSAvN8rssZn%2FdOFj%2FL5UvB1BPG45UyyRNtjU9%2BN%2Fmwc330MGgS0oCXvr6DcURZqh51l65ITNtpSGDSDlaimNGeBbOp5lVRCIOwqLUlrZ0YGBz2zeNhAk1K%2FkJCfyO6cmlmhqmH6QxvRd%2B99qTPb%2B2EJYHYl9S4b8EndPbSFpbZuH4GAki&X-Amz-Signature=bf7b4c9f91ef865bffdacf061a2494ea69f17533b1cfc795dadbdbe042bd5c25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

