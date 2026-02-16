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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NHNA7YV%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIDxIFpKbaD0a1wT1FjlpF1Homl8Me1gESuLT7%2FZ%2F6enyAiAwBnFQntQJiDBAaPlR9UmtoL1Cgf66brGzyZX%2Fe%2B4qGir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMuu5jItvksX1dAw1IKtwDoO0d8TCbv%2B7ttqoTRiwImNCC6SOi0iE6Xk1r2mID2kmMxAs7PLhxvZ%2B%2Bwg0Y7BF3D%2BMe6tg1RI%2BKLBnsJrbBue6GAVeYHO60%2B9BZE8zVhOeRX%2FjkmXCZQkbvyUzCByuy44H2rCZgdkeDHhOTqg4hQAD9kZtg%2F7Eum0BJO0sNqXYuFxvSWKutPuKM%2BNRlczBLVR5LNtb5pHgjBuOp%2BqVeCZ%2F4CAS4toWOPBLR7EbT9RPI%2BF8rb%2Fj3wuZCfbH5Br9PtnFWfNvHB5kB88GXbmTEbgbiu2LgUZElDDobz%2B9MCDNp9EZYRJy8f0LGtwmQzz%2FZTCsoaMPw75bfmWagVMi8h5qU3qv36bWPBFxW6PTugk0yXKx1iCFC2I2t9DvC2BaIIoMsR29WhWxbYOPO1gC24UVvIA6FpiMtTpbJI6UpEBeUsqD%2FPK3i0kTkxcLvKvDHjHWgsqeKxKcudkdoKJNGhlQYYAxMNKBgBuKAslByKACFsqMRAHB6ou6Z1JNTTZ0zN3Nu8kdXLnCxum1269Selft8%2FNwqLZZIRTYYAQQ9UhoZZL70iCUyZrBDirhpyoOE7E6YetYhSbGqfVBQoqYwlVivMTQnWBd5dLhfc%2B4tePpkcJgpSZimiD4JqAQw8rzMzAY6pgFZ6tK1%2F0ZMTzKxuqg6q11kTc%2FC9JfUBImFLFI3oTfU8h3N1B0MeComulg2ysPuh0ey8grFT8a5EJHiXrk5KRy%2BZuLFnLSD8nBQkZOacOvYKTuziGk3LTTlbwqrfmSit6NdqvBBmJ4VjgbKM89pw8C6mvmBkQiMTR0%2Brl93d3PyxC80qdD1qXLe2%2B2HUY52L9irvoZLWEsJkkrfZJySocEqbUTBfe6a&X-Amz-Signature=08c7ee31bf758b9cda1b3702552297e939f636e5827985a64dca3d0f0ae58c60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NHNA7YV%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIDxIFpKbaD0a1wT1FjlpF1Homl8Me1gESuLT7%2FZ%2F6enyAiAwBnFQntQJiDBAaPlR9UmtoL1Cgf66brGzyZX%2Fe%2B4qGir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMuu5jItvksX1dAw1IKtwDoO0d8TCbv%2B7ttqoTRiwImNCC6SOi0iE6Xk1r2mID2kmMxAs7PLhxvZ%2B%2Bwg0Y7BF3D%2BMe6tg1RI%2BKLBnsJrbBue6GAVeYHO60%2B9BZE8zVhOeRX%2FjkmXCZQkbvyUzCByuy44H2rCZgdkeDHhOTqg4hQAD9kZtg%2F7Eum0BJO0sNqXYuFxvSWKutPuKM%2BNRlczBLVR5LNtb5pHgjBuOp%2BqVeCZ%2F4CAS4toWOPBLR7EbT9RPI%2BF8rb%2Fj3wuZCfbH5Br9PtnFWfNvHB5kB88GXbmTEbgbiu2LgUZElDDobz%2B9MCDNp9EZYRJy8f0LGtwmQzz%2FZTCsoaMPw75bfmWagVMi8h5qU3qv36bWPBFxW6PTugk0yXKx1iCFC2I2t9DvC2BaIIoMsR29WhWxbYOPO1gC24UVvIA6FpiMtTpbJI6UpEBeUsqD%2FPK3i0kTkxcLvKvDHjHWgsqeKxKcudkdoKJNGhlQYYAxMNKBgBuKAslByKACFsqMRAHB6ou6Z1JNTTZ0zN3Nu8kdXLnCxum1269Selft8%2FNwqLZZIRTYYAQQ9UhoZZL70iCUyZrBDirhpyoOE7E6YetYhSbGqfVBQoqYwlVivMTQnWBd5dLhfc%2B4tePpkcJgpSZimiD4JqAQw8rzMzAY6pgFZ6tK1%2F0ZMTzKxuqg6q11kTc%2FC9JfUBImFLFI3oTfU8h3N1B0MeComulg2ysPuh0ey8grFT8a5EJHiXrk5KRy%2BZuLFnLSD8nBQkZOacOvYKTuziGk3LTTlbwqrfmSit6NdqvBBmJ4VjgbKM89pw8C6mvmBkQiMTR0%2Brl93d3PyxC80qdD1qXLe2%2B2HUY52L9irvoZLWEsJkkrfZJySocEqbUTBfe6a&X-Amz-Signature=08c7ee31bf758b9cda1b3702552297e939f636e5827985a64dca3d0f0ae58c60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYNFLQEQ%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCGokAuBhb3%2Fx0%2Bkxq311lh6Ak3JTc5HJO2dGc1Q5VF8wIhAJXK3BMFyAS%2BpPK2we2IbgFj%2FWvoXmvwMLeg6kYPwwqHKv8DCDcQABoMNjM3NDIzMTgzODA1IgxL1G2%2B8q%2BfIcXrx0Yq3AN5tG3%2BSkrX6ooIhKtcvQRlnZoleS5iLCsBNg0zXvXu56lLFzY46zUrJh5VcZJs8suHuQezMZfwmlY8WvS3cZZ%2F3WL4COEVKmu4wfk9n3ae2V5GZNsAXhjuS%2B%2BK1Mm9QTs%2FlNo7mk6WMwuUuodkWnxfmEEpJ9sLlGqxpnDMi4tXZBDJ3OXtPGmOz94YzULU0TTP3O1uyMImTyBWqANpT83I57IrhrHmtmsWjzKKZOmbK4KcK3k24RGNKpJCxhbedKPDVlRPXOuxYKBXKc7XGWHGz26nfXl9pwkm5KzzYEOU0jZ0f1wsEDY0oOTNLsiOToSlHo9AbFQob4p1qK%2BrT7TCMBLZYFk8SXxopSQCOn%2FcRT4DNad1thbIZuc%2BnNkuj0gZJhAFDXkF0grwX%2F96W5iJBxoqgv6zBdLy3KjuqNFfUu255zCgEfEYyIsFNSiswpUp8I%2FrjRuzfz%2BO8g5PwvZN%2BAVnxbynoS%2BOc3oWIOh0PnWEmh3NqE%2FURq2XjBiLWuMXjtsAnyYo9zJ19wmMF6Wt81xSonL0pesDHKDdrvMMpVu8hZoUOW2x87%2B%2Bp7abuEZ3vJEQ%2FVQsuseVaiol0N5NwvZ%2BAyhfRvFe0BzjuGMPCK%2FXx4SzheR0dKxGljDBvMzMBjqkASrNLsIFsap67SHzdADNIR2VgxzeJj%2BfW6%2F6eMm0GcC0dszfk9QnTwRVlsbpmcMfBo4PUySec5CTaPWTXv6JU3KLCxYy2BhqQADf0AILFCUqgBBMaEzEVD8ahQJoBV2DYWW2jzMX7lhLGeUWgug2vChS6o2fSQkNE%2BX5ZzLqQv1QDyr5BCz5oi%2ByTw4%2BfdQkf88mFLIlMgv94Z4zlcYZFcT1WmmG&X-Amz-Signature=130c3f4be4f96a5857aee703dbb795bdc76fd584c34143578ba27f98683c1fcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHWT3S2C%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIAszEalhulItiCehDRcXDuO2SfMKNjPDww1PJ0EoVnVGAiEA3LosuMp2pO75r9RejBsknDmr3iITc4lpchvcy7HNPasq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDL5QE08lg%2BVObXqQpyrcA8QZgZrGNdjpCig54HaARWcXaGH3MIlpgu8ZfBkz6Gm5ngHKctLrQA5y1PcwkRGj0y4KIjSDIRvWvXiKMhtLWRxlzhOFfBd5VMQj9ONwoeRWDJB0m9Igp0zq1Quh7%2BJVFTSWtTt0Uh0h95CKwCgJLmeVqAJ1j0YqPS2F6uPfxMG7SQTdSUz6NvHRoC4TONtZCEuefmmovvWjbymhCvnhJvMSCpFPBWYope6mVdPdyUiiANfnNY992KGkAk%2B2CeJLq1V0jjuuHBdhJZxBApO8CYahipNHhPkw9cRFebw53QABcimyev3dCiWxLKTNxA1wFHAD09fu4JJuG72ICtMAhYMSA2L8pZEtFMZpAPV1%2Ft5qrrKQUQXAVSPae0egAIIggPaFsJx3ErEqUQ75aa3b7fod9uSj5r3XNJ0D37EmwZ5mIJVjPJNi4UC0lgdIjLpkM%2FLOW7xF0AGrKIZP4WKfpxBx8zpu38JbfTQvFt6bEYo1uIyoUkC4PckWR2DvzDGnxE0qWRQp8YL9rbwyMuIhOoGl5hj%2B4dAZdObt0Cpb7I%2BGMkSMiGBaZ22D365qPEZp5ibfDPBT12L4uOhC%2FsoWPUaRwxfRRgaxn40NtvouZCunQczdIB3JCOSLHAcTMKS8zMwGOqUBFkzhlE0QukuMuoCmEhe9z%2FDnMRfs47BhxqIs0dKB943OOaguG%2BOqikoBkZp0lfeNbdhYSt4mpqzH2aERQ6httDS80EzGMbuzp2kbM4VTCtdlRgEsSN2vk2ok22burDNbKtm%2Bw2fZ2ZdEZlC40ODK3YOpyUf3O0iSyf19xkhSqTBEQStgJhP9pojUqodxeUHPCCiJw7eYyYuTAYGecQKyQm8M2DE7&X-Amz-Signature=12b3e1a14ffda459047a41768cf2692eeb96910b3dc14b08cd47caf78b533966&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHWT3S2C%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIAszEalhulItiCehDRcXDuO2SfMKNjPDww1PJ0EoVnVGAiEA3LosuMp2pO75r9RejBsknDmr3iITc4lpchvcy7HNPasq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDL5QE08lg%2BVObXqQpyrcA8QZgZrGNdjpCig54HaARWcXaGH3MIlpgu8ZfBkz6Gm5ngHKctLrQA5y1PcwkRGj0y4KIjSDIRvWvXiKMhtLWRxlzhOFfBd5VMQj9ONwoeRWDJB0m9Igp0zq1Quh7%2BJVFTSWtTt0Uh0h95CKwCgJLmeVqAJ1j0YqPS2F6uPfxMG7SQTdSUz6NvHRoC4TONtZCEuefmmovvWjbymhCvnhJvMSCpFPBWYope6mVdPdyUiiANfnNY992KGkAk%2B2CeJLq1V0jjuuHBdhJZxBApO8CYahipNHhPkw9cRFebw53QABcimyev3dCiWxLKTNxA1wFHAD09fu4JJuG72ICtMAhYMSA2L8pZEtFMZpAPV1%2Ft5qrrKQUQXAVSPae0egAIIggPaFsJx3ErEqUQ75aa3b7fod9uSj5r3XNJ0D37EmwZ5mIJVjPJNi4UC0lgdIjLpkM%2FLOW7xF0AGrKIZP4WKfpxBx8zpu38JbfTQvFt6bEYo1uIyoUkC4PckWR2DvzDGnxE0qWRQp8YL9rbwyMuIhOoGl5hj%2B4dAZdObt0Cpb7I%2BGMkSMiGBaZ22D365qPEZp5ibfDPBT12L4uOhC%2FsoWPUaRwxfRRgaxn40NtvouZCunQczdIB3JCOSLHAcTMKS8zMwGOqUBFkzhlE0QukuMuoCmEhe9z%2FDnMRfs47BhxqIs0dKB943OOaguG%2BOqikoBkZp0lfeNbdhYSt4mpqzH2aERQ6httDS80EzGMbuzp2kbM4VTCtdlRgEsSN2vk2ok22burDNbKtm%2Bw2fZ2ZdEZlC40ODK3YOpyUf3O0iSyf19xkhSqTBEQStgJhP9pojUqodxeUHPCCiJw7eYyYuTAYGecQKyQm8M2DE7&X-Amz-Signature=f7d6fd82c3eb021643cb4b93e95cab370cccf1576bbb6b358dc007b50f240009&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXUTVBZC%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIFQyGc1EkJygA06IO6lrLPemvb87ECre8lCbjqX43hOGAiAFr%2FLrRtJoF4oGgBhkZiiDaXjh5k6cDvvEdZVY6hyqwSr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMtSjo0siTdY4RUpWhKtwDtgT9Jn2cuMdn99rFU8xTIq5iAFUwILAOAmGe0qb2c2CPvHgVEXC62BAAXRsxOTEOhzmzSr9CBSqZcEQh8PVFv9Y3G5jME0a9Bd%2BZRncXDh4Rtm1hCclyFGhRexntQSBH0C1P7IPhLTSD7TmOya5xe2HSxIOuELEhoDtEcw3FkaRQxKRB11CwU%2BrtDWNSls3lv2zXxM0D%2Bl0iN0zfetx8SFHmSQY%2FW%2BQy0AY8Xlvw5%2FKKerI4u9ExIOw%2FuBdcZsqpoJDphrfK1qqlI1gdIfA5euo3jO0BxdqbSzz6hjvPo75jWvjAsb8qzLSRz7uTpofV%2F2y9nz6qVYvCLdffNAAVkmHqWuPtlTjS5aFwIN9cFXGnrpnKD8nbGFnSr2ApmVfRT%2F4NVFyCijwjSO33miFBQRYP85r6Sw5X6pJAplC0bLYI7IUefwYhfEulySMv6gbkOyl1MHnnhitR3QAku2X9ghnFy2%2Bq91aBXe94Z47BydHyr7IgysnkpyrPH08hFBAOotbdS2XeZYx78SeAUGWxuoG3UGzhbXNKC3O4zKdpP3e4RGbU4YHcKpW1CkGr%2Bz3j0ro0CrVsxLMMwShDbraTvOsbeflCzt%2F5G4eXNyaXZyoSN4XToJKbecot%2FDswobzMzAY6pgGDOgKSh2YNB%2FD2YzmiudRx0rW%2BcaKWYRXJGrqJYmR14gKKD0QifSC30ncP%2BT%2BcGHcSyisZOSe5cPsMXrrL7LMtIcm71acKXYPuf0eWVfbh0lFc4%2BpJk5dzCITltZkaOLpGWl8qxrB2LVGAJ1kMKdIdu3%2BPW3UMjtq6LBI0JzHEJ2PgX5io%2FNL7TWplkMzh6WnTjepE5yx9%2BbSHcQfWLrBedjLCGN%2BW&X-Amz-Signature=24176493f75d0fc77bd59e6941f177e0761b26527e4a8442333ab1230835deab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUHD2HAQ%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCvBcT%2B1BmQZ6Qj%2BLuWg4GDU3ShtJCFjWVKlbkpOCVsyAIhAJ7VOPyQckMPoPWzVhDAmNjRFyDYRxtuaubJNYe7a6jmKv8DCDcQABoMNjM3NDIzMTgzODA1IgwHoaZ5R%2BMG3Jvo6hwq3AMbpc7CMrKQXAYCZWc4hjvtMvoRvIir6fBxdKOTaCfqUjOtVcz8pQykWXNr0noVA479c8Y3U5jjsfhsyW7neJjj%2Fjfzv2vn%2FbDnA4DUltu3EkbVc7zGp7MS7025eCJMSn9hPAH9KalHmPZr4ZHHnF5Wzvfj8IbSLr1M3kHEqNTr3OF2JqANhgRer00RBogjQgoe3eGFYORXE5jyRjiDJRw9ZiBeBKE2TX0prBYiULk9muI87j%2Bmc1Ktd2yOVxsoxNGPAXZsWRmXob6O5ID8aNdlIXmjvqDrAZqr%2FdFUPBxh0kX9ER75qH6O9Mo1ui0oS9iDN%2Bvq50FebIVvGUYgS93akocexA4PeiYRvaXlIczlvx375Xsrnwfb6VPbOT0H5ttk1QLtDph315TuPo2aHJ3zM9l%2FaMM9LVR3SMJTlsIPz3Zk1yDNkf88QTdRWBKMhAlYwr%2F84UqanSFRMAmg56l6jtL%2BUb4cU9ajkw%2FWgq%2F4MwCBGbrkqfK%2BXvQ1YXDH%2F8cE%2FCTKpTL%2FOYO4Xnh5JgwhnpvqvKiM%2BiKq9EUnkfsyjVDVJrXv6nlZ80fSQFS8PRKfZmJt9QDjohDpAsN90aHo8dLGbTVeF6XohXbMHcEtvYs3bC6poYuMu1LaaDC3vMzMBjqkAVK%2B9ljFqgKIZCdO0JKqkol9L8no2sjFY5MQiAImdjTkNckGrAnss5chuyCZmuaw7TaGsJO4trqbMPghkNJk%2FKyaHgNd29a0%2FUNUOHcbUDxGrAtBJ0QtFnwT7cV5%2BfNGLG0czvKUvTOCkI9PZtktQ7fxuAhcA%2BTMRg%2BBru6hy6YL3kYPIQmrUjHrS2tPzXBXugwYl6JgcTYRHuivWBYzn2h5tw%2B1&X-Amz-Signature=fd5cba06663d793501bdc409fcadc82e994f7eeeec12a771103740641eb361b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDATNR62%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCwc8apTE1vUjS3JOx0Ai2vGdfqJT2E%2F9Sd8oz0D5Gh%2BQIhAPp47kjO5EgYGcZVAyh%2BZPkfjX1cGQ4rORb9sPVM46Y5Kv8DCDcQABoMNjM3NDIzMTgzODA1IgwW8tW1gbiS%2F%2F%2FLeV0q3AONI3Te9sWh3JzviFDb73VnNfsu7V%2BcV3N3lebKbKtzcNm38%2BAheaqi6scCqAFg7AWOb2hFvlODusK13lWHkndGf1YcJ3fz8cM8Cn16LUhKQ5sppX%2F24wXia8cxBO5No5VsW7syXLMtY3k6rp9FADMrJ5KQAK53n5A%2By79Ee0duKKVhSW47DYgCb7WS%2BeItLdabU4dfKF9FSxUy2KQWeBfWjs3S94tm0ypzaFHfiGoOtg2hGyTSs4vWnTy3%2FrdepV85NGxQMeidwZ8le7HtSBmXKN0d9%2FaeNZgAOn9G2%2BS0Nn5CD1eCODiLOg7ziEVx%2B87QRXBsf8IjdcOZnp1t6Tof9xbet1IWE26E0PwJ3Z7QKZCX%2FWDFT6NXhigq4bpe4W6p%2FSpvysd1TBmtj0A0MrQ3PqnqSJhpaj2eLpbxH0hDEWNS11am6y%2F6GrwD5fEPiXa2ClPUNEri1M1AzQye%2Bj3Zpl1Oam4Gf4gpqYQ6F8K3TUQlM95CuIiWRlk4UXlEkGZv1Fk9PwI8jZni80%2FbzcHkPYP2Fn50CtgLSdkgS%2F9xgURgwLzEF8FrcbSSr0%2Filu%2BIoaQhHfOaSnKexA7lhEAxI6jLHMY%2F0pvBUX0wMAlZG3yeYPeKAUvPNI35aDDIvMzMBjqkARhdHLJzTYiJ3eGE9EIVio%2BhkFqVK02iz6364RAoTtzrykj%2B%2B9%2FlCLc11PenbxL01NRkKsq%2B5GlUYJA3addDnf8cXPriPA5QXGkwK0w3vlErDvZbDGvCDszrIq1KsCGu7RU1itBzad2L2prwRmOxSZ%2FBrUWT0XPCOyD8cYg8g0WxTrqJxiWbI5GUMLWrN4BfU7QGiNCczfkEVMYtEtf0k7nJUJOt&X-Amz-Signature=36479ce50e93df76255417d19d699b6b48accc3d9144ee3f1cba08e1c9557669&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4WGVWCQ%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIDm20Czo0aY9%2Fmm7lLc1eh31SoQUwgSusKJCyQDqbZiUAiArVjVxYXns5rExvM8cmZtW6POw%2BuNZhVzPAQvXNyU4Xir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIML2ExhzI1IC%2FEh9b6KtwDZYfDQ2N7pL0zU1Z1Zxfi7Ly1d2XBLl65Z1EHnY%2F%2BO9Op2eZEaGAMm6A0B%2BxWmky8ya8kNWlfcRqaf5Dn7iRSbEs5v1YBciQS1ljP1nQxWgUALLhaC47Cf6AmZpzMfZ4VA6mRDKnowoLVsNqg8PzgAIYZ6%2FcFmcwafMcBlvh8UDjpHXRY57HMBpBoUAmSs5l7P5sIfkQafHrQyUVyDplXFGn4qQMhHCxNsd7ZP5ia3nPSQptnPE%2FqiI2GEpdDALQMVg8LOLVu1G3Px5OY5i7NE9eH5OK%2F7H8a1XbjzbMCyTS7m200wBd%2BXllKTZ1yxQo0yXegrPoWto%2FNcvqqjd4KmNZl%2BNY8fljvrx39D7Aq3S8JXpL4SKuCkJjjgjIrJ%2B5HvGeh0NDQJOoJ3jO3rcU9q8U4V2zxQpvlpVMZ45q6nmcq6MDJdEWBAsrCm4xy%2Fy3uBGe26A%2FBHa3t%2BZRusSk%2FpHcU2sdSpA9W2bEiFQmaapbyaCkI0wBYn69iBlVMF436CFWvxfr8%2B4X5zxLz5KInhANbQvJiUP8%2BX%2FpuD8wdrPzIYQLUzA3uBxLrr%2BxTyukDb6kHn5bkt3x928qakq1qkiHtczUaGnCK1XMiaEEP1xFFhbFGa6CEe6se4EwwmLzMzAY6pgF3Ru78dn9uyY4KdoSsOdJgFR5JV9WS9sRQTkphJCW0X4x2t%2FF2YbmG%2FdQ53R59XwN9QOqBKzxZWotvn3Us6oY1PHzRumafao7cuBD%2FJ3AXBK%2BvpbXOw2bbgE7WyJUyDcquTbKpp%2BCZBEWOf%2BcpvKdxA6GguL6CdrDpytROOHYBQwCbYDYyAdbhKDQXcwwOR1wtYkx%2FaJ4SbCgtArfo14vcx01QBIRU&X-Amz-Signature=3a69579f493eb8569382802fd081b6f5c61dafa73514636e1f2f5e3262ad59aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4WGVWCQ%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIDm20Czo0aY9%2Fmm7lLc1eh31SoQUwgSusKJCyQDqbZiUAiArVjVxYXns5rExvM8cmZtW6POw%2BuNZhVzPAQvXNyU4Xir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIML2ExhzI1IC%2FEh9b6KtwDZYfDQ2N7pL0zU1Z1Zxfi7Ly1d2XBLl65Z1EHnY%2F%2BO9Op2eZEaGAMm6A0B%2BxWmky8ya8kNWlfcRqaf5Dn7iRSbEs5v1YBciQS1ljP1nQxWgUALLhaC47Cf6AmZpzMfZ4VA6mRDKnowoLVsNqg8PzgAIYZ6%2FcFmcwafMcBlvh8UDjpHXRY57HMBpBoUAmSs5l7P5sIfkQafHrQyUVyDplXFGn4qQMhHCxNsd7ZP5ia3nPSQptnPE%2FqiI2GEpdDALQMVg8LOLVu1G3Px5OY5i7NE9eH5OK%2F7H8a1XbjzbMCyTS7m200wBd%2BXllKTZ1yxQo0yXegrPoWto%2FNcvqqjd4KmNZl%2BNY8fljvrx39D7Aq3S8JXpL4SKuCkJjjgjIrJ%2B5HvGeh0NDQJOoJ3jO3rcU9q8U4V2zxQpvlpVMZ45q6nmcq6MDJdEWBAsrCm4xy%2Fy3uBGe26A%2FBHa3t%2BZRusSk%2FpHcU2sdSpA9W2bEiFQmaapbyaCkI0wBYn69iBlVMF436CFWvxfr8%2B4X5zxLz5KInhANbQvJiUP8%2BX%2FpuD8wdrPzIYQLUzA3uBxLrr%2BxTyukDb6kHn5bkt3x928qakq1qkiHtczUaGnCK1XMiaEEP1xFFhbFGa6CEe6se4EwwmLzMzAY6pgF3Ru78dn9uyY4KdoSsOdJgFR5JV9WS9sRQTkphJCW0X4x2t%2FF2YbmG%2FdQ53R59XwN9QOqBKzxZWotvn3Us6oY1PHzRumafao7cuBD%2FJ3AXBK%2BvpbXOw2bbgE7WyJUyDcquTbKpp%2BCZBEWOf%2BcpvKdxA6GguL6CdrDpytROOHYBQwCbYDYyAdbhKDQXcwwOR1wtYkx%2FaJ4SbCgtArfo14vcx01QBIRU&X-Amz-Signature=456df76eb4dce28309637eb22ca20738c9b616851dc7fb01323ec44f2c7b5457&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XE4FXC23%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIAMGTEjC30J%2FXhTRrkM6cAYupuqlPiY6U1ZsVzwb%2B6xaAiB2%2FAt3fODqqWbtUnWLHoh0HgXj%2Bf1f26%2Fv%2BV7ef8GPeyr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMsS0QjqPF3NwxvOOKKtwDcatHqPhrFnKNz3MPnumNw8se4Pjkmz0%2Bq2wEmESg548fy5UQ1QiFBn2FEKv4QtMtwzy0%2FQLmoOGaoHNMPA74PKI8LJU3ica6nlt2SbX1o3AXYURJeAlSnOGtleej%2FvPkth0DdbYJyepcTvN1k2wm1BjmjNiHKPJeZ3fB8RWSNyCcMUrhZiQ4VPkGljJYAlH8N%2BZ2VDamOKiJsUXfI4pCv3Zpqf6b3dfYMKlRZ4gcHBi%2FhR9lR4r%2BdXRFS38p5MFOSbywwMiFKoF2P4pDBUOxpKrYP4Ufo5y3WHuQS7i5n%2BpmUI%2FhBqRwQIpnJC3TgmZzR7sa%2BCCZd8xcn0OW%2BP9%2FZzR5sjjFyWaEBoZantdiL%2F04qIaA9Cc4HwOPsFNZjxvRj5xACQ3fdkFgT5Jm68JFAg2LR%2BZVNrh2sF4NWW2jYHlJtPeuxsaQdJ0%2BjPhet4udSWjgOmQeOIvqPjylI4zY3QD9JlvCxRo%2FXlfpXXgiXXFrKT3eoUK7Z2Fs3hbMBHAaSFKyjtlTXkH9qeriCAwdj2oIebE6YOa%2FCz9Fx9%2BDPzTRB0KdwNvXPpYLGAjcaRbtSxp0rdsPIEaF7m%2FkupZ%2FVKvNiD9cGu9tWe6SkrGWdrwaBU3JQDd6Fk6EBjEw3bzMzAY6pgFOdV5%2F0BYhpQ4dq%2FRn%2Bej1HuouQVYc1JjWWMaYCH%2Fzu5svxCWF%2B5eNRaPVnuSQ5j3zuZdtfxTFz%2FUBjPqVy9aqmeZ%2BythwrfOvhRrrTKMZdJhFcXvISrcrjmpnzNamXhmxGI0b7Va%2FRwxjqvlIssFJEkzwioIk4vLragbgmc5%2BnfxKc2WdRfRlHDUXZ3pIXzINud5edbV3oZ9aY1joQLMkh6mOFOUw&X-Amz-Signature=0b53dc29696d6451461f0ed22eb47d3cb484f563141ca0b2d2d51a53f8a844a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTDBO4UW%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIFt4CjP3wrWwZRbxty1mZNIjWn3B%2BZbx1%2BAFb77W7kLMAiEA8XVDJKcOu2Gvx39qxf3ChUVEd3yWitMdSMEJ4E3q5fcq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDNmJ4oosFKDYx560fircA7Xql2oIVkPu5MymN1z8zLp0PA9qi917fixjl2Ep6AMB%2Fo8w0XXNvji1dR%2FIJ6f64NR6SN9tG6c6yMhyQm7WDy0RZ0kCItkDvBZO%2BC4SscA4%2FIhc%2FAGfjjpQJMJvaBTyPnqfMGa3WtBfIPfe0gtWTwQf65Yef97DE%2B7vnDRyDifngFOXkGUPojr0bYOZ4M8LHv7K06nbqS%2BV3FKbputJXTbpbCWUazZJ5Lp10di4K5r94NMeZ06CS%2BilsQuXKSJknb6HDkQozfYkoIRo8BHXA0GrIbMVrzZhnbpAs5hIGVNzwQiFNQAZAWfrWF%2BlXA7ZjyVwNIMbgX6wN1G6qmhdbDO3WPSUy6m3ihRSzsIQQGrIQuQoN4T9c2%2FdReLu2XHxpTG0AV%2Bm3303T8inUpQfuQnPNXG%2F%2F%2FNLScmbG1XAVHxMZjcB5HU39jAGNWY0o8o2t%2FRGaYQ6KSqciKI0Oe2fvZRkaipjng2%2Byf8eeCqqfXLxYmC9GlxGRGOUQXZo4p4hT6nVtQ%2FmN1X3kQh0lgUlvAFdvg%2FnBMcEf9i8zz3l8Wd0hKJ65FErG1wxchZDn%2FUPLZOru0icUA7CIo7y9WFFttz%2F3nR5v2CddQTOmirbPet8kUKFnMgZAj%2BNYw5HMKW8zMwGOqUBw8oy6EvTohxmYr7xY06JYGWqMl5ZCoOjJqzz3tjMXE3TJwA6bpXGfD2kjE4hviL%2FoYYtabP776EW3hhDY%2F4XvGkeM%2FDDsfA6HK3KCUYp9IbwAJj2%2BKlO1up1yuY5oZYBmz0hPmGNdwGAMd9XV5gJ4DLJCG8Y6R2BOVG0BCOobZ9QmdRCYDsM%2FGbA8aFd3QqrF10gYZueqBs3va90k7%2B42%2BLHBfs%2B&X-Amz-Signature=c93f2c116579a5e34485782e3bc1f552ebabe6ca6f6f8d65c098bdfff5139578&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTDBO4UW%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIFt4CjP3wrWwZRbxty1mZNIjWn3B%2BZbx1%2BAFb77W7kLMAiEA8XVDJKcOu2Gvx39qxf3ChUVEd3yWitMdSMEJ4E3q5fcq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDNmJ4oosFKDYx560fircA7Xql2oIVkPu5MymN1z8zLp0PA9qi917fixjl2Ep6AMB%2Fo8w0XXNvji1dR%2FIJ6f64NR6SN9tG6c6yMhyQm7WDy0RZ0kCItkDvBZO%2BC4SscA4%2FIhc%2FAGfjjpQJMJvaBTyPnqfMGa3WtBfIPfe0gtWTwQf65Yef97DE%2B7vnDRyDifngFOXkGUPojr0bYOZ4M8LHv7K06nbqS%2BV3FKbputJXTbpbCWUazZJ5Lp10di4K5r94NMeZ06CS%2BilsQuXKSJknb6HDkQozfYkoIRo8BHXA0GrIbMVrzZhnbpAs5hIGVNzwQiFNQAZAWfrWF%2BlXA7ZjyVwNIMbgX6wN1G6qmhdbDO3WPSUy6m3ihRSzsIQQGrIQuQoN4T9c2%2FdReLu2XHxpTG0AV%2Bm3303T8inUpQfuQnPNXG%2F%2F%2FNLScmbG1XAVHxMZjcB5HU39jAGNWY0o8o2t%2FRGaYQ6KSqciKI0Oe2fvZRkaipjng2%2Byf8eeCqqfXLxYmC9GlxGRGOUQXZo4p4hT6nVtQ%2FmN1X3kQh0lgUlvAFdvg%2FnBMcEf9i8zz3l8Wd0hKJ65FErG1wxchZDn%2FUPLZOru0icUA7CIo7y9WFFttz%2F3nR5v2CddQTOmirbPet8kUKFnMgZAj%2BNYw5HMKW8zMwGOqUBw8oy6EvTohxmYr7xY06JYGWqMl5ZCoOjJqzz3tjMXE3TJwA6bpXGfD2kjE4hviL%2FoYYtabP776EW3hhDY%2F4XvGkeM%2FDDsfA6HK3KCUYp9IbwAJj2%2BKlO1up1yuY5oZYBmz0hPmGNdwGAMd9XV5gJ4DLJCG8Y6R2BOVG0BCOobZ9QmdRCYDsM%2FGbA8aFd3QqrF10gYZueqBs3va90k7%2B42%2BLHBfs%2B&X-Amz-Signature=c93f2c116579a5e34485782e3bc1f552ebabe6ca6f6f8d65c098bdfff5139578&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4R4AMNK%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T135654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDJCdjl3kX6EiH%2Fvz%2FaLUYMObBsIz5Xf2m6YBLwZ0RMTwIhAJBU%2FN5ZuwG087YbAJVETbeOKtP30wlDKJx66%2F2E%2FhWRKv8DCDcQABoMNjM3NDIzMTgzODA1Igzu2SIgJb37fllT%2Bysq3AO8YOOrwZYeorAMmsT6%2FHBGw5ElcvERDn0n0gS%2B7rvBjKOSNllOUEUzSizQOc6aUDTSkpxuUPmRRjAnh5c%2BQKtG%2BaNVs2jifXATBhsTh6APjeMXulecrLnDxQj%2BmsGWTSo6wyhNFkvh0FbDzLVC5sFRPE0R2BvmOJZ7VmxDzAOg19yFMD2G9NK1%2BGSeKXe3X%2BoTbdR99dxOiOq4obd6fDu9IPtQFvL7%2FrhPMTl%2Foh3%2F1ZnGNNBPsnPiu2pK%2BUho3YI6rGckpQEmFvNrqDMFM1knzirtFdnJN33cbUZofQDRMseiVH3XPnLMj4WlW7ulRnBSM%2Bc3APKW14yc%2FyK8dBeJwIn1wPPRYjgCnx91rj0vCrfQkXB6bOnmTkcnwIJbchZExZRgK8YbANcy9WMj%2Bs6ECgZPWiCvQJt9pn93pg9pCgXoeKLO1bJUXyssmHJ1Fd4ZgDbdHK2CrERJ45mgUUqBVWPEBfJ2UE3b%2FXU3KGCMcglD%2BFdAsTU5wiC1ZCuetMPyldvpk3Zvd%2B7cL6zmK9yLAkb%2Bry%2BRLelgvmYyB9fe4L2Cm%2BqNnRZ8zD2rDdH1o%2FcxfkYx9lsoy5Xx5T6DEXUmyp%2FNITGl%2BAUbRB2BmcLUxDhYZRhVSecn6xClUjCBvMzMBjqkARThgJTSaA3dDbT11UeuGqlPDkkGZp1NmVu4UlQJpLTgC5VgM58cvANHv6EeDkDs549cjIjav%2FSHjze4p9R3c4woiAL%2Biih2AAnAYHbZUaKJIkIy4D6rEDCymOCNNKIm7IAt%2Bc36O4GgkeJZlUH4qC8StoVSfCa72HBLotDnlpZMoPxVdNR1lV2CMqhK%2Bsd98lNcqMjVbvaL%2BzRpybT%2BSv27XPmi&X-Amz-Signature=df999fb3595ac0e56eb5bc3dc22cb5cfd2651fa80cc272f7af77638ff5034a68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

