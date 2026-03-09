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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7D6F4GQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032945Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQD5OeF1lEl8Xtnt9t2djc%2FO9gw5vipQ7iDRTbvJVbDJhgIhAOtzAi47V2YEz%2FuU4RTsYWHzh%2Fzs8386vkMdU9M3HeVUKv8DCCQQABoMNjM3NDIzMTgzODA1IgyB7d6%2FYMBRRUosR3cq3APHR%2F5Lmfkj1mrx71Et4Fyj%2F31ifDjWg0%2BJdTyOgWqUsPBcKpIaOlWf9cX0pWxj%2FEjSN3dbzyt8oyVgSvIiZVHmq8nwZnroR3%2F00zTLL7eJGDicZMxmigXrvn5fBHpXz%2BET1DL120ZCCbanDO2mGCIVdcJdYEt3G2r01HoA0RSn17jZkUhe1W%2BzeMh%2FsfS7bvdwmnyMNNkiCpgp6sTHfm%2FbclTT4Eiew4XaQ6mEoHhhPgSy22rBFBwoJHu4aIY3SqtL3oIj1O0Bpc%2BDj7P6blZBuOoG%2FvgFjgp56euU0OJ49pIAkOpfGbTPEX5rhmT1OzbSenyROaVYyzFR1rm%2B%2BW8VSdz5mTmKxsNavDUAAOnDai1oAMnSx8xozdiwVy%2BHURxYueRrbV8QmGP2Vj%2BxNqWl8thoJaHrBmWz22hXeFpf5TtzJGD6sTncj7P68oFPDNbcEvDLzIUXj%2B4vb%2F6fJF%2FbG4ckacUyT79y2zhvrTLhc3m0LiioF0F29bkY%2BhHcATEOkbkF4TYON0VboAvZ8kJNK7jo32p4y3ZNu9FMePdZ167DiAXmmjDMQL4NXjpb4zzYrv8IihhoBZ%2FwbkhdIqLsIM85YGCX56toDxab4sqb9mMfjRitmLENADYO9jDR4LjNBjqkAbQy12qjWJZaEV2GhCxEVW5yZlr2QGBym4zUSTyQIf8zollROS8HaFNdwMwBKkm9Egc%2Bv%2FNAD0Cb3Tl4qhnkUYoJrBridhm2FZWTTD%2BwfF5eLPXxkYr1NvpJupTFuZ3kHVFu7NlPEgXG%2F5I6pHOJodH%2F7ZcFXLVPFLN72nAtMi4qiJeU1FUIwND%2B0LFdAOzC%2F%2FSbKfx5V8ba57qfb%2Bzv5vmVTbXu&X-Amz-Signature=03ce6bc9ae1e4e2f6ed7611dd9cced54807e4ae03965b2aaa57f218b7a0ffec1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7D6F4GQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032945Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQD5OeF1lEl8Xtnt9t2djc%2FO9gw5vipQ7iDRTbvJVbDJhgIhAOtzAi47V2YEz%2FuU4RTsYWHzh%2Fzs8386vkMdU9M3HeVUKv8DCCQQABoMNjM3NDIzMTgzODA1IgyB7d6%2FYMBRRUosR3cq3APHR%2F5Lmfkj1mrx71Et4Fyj%2F31ifDjWg0%2BJdTyOgWqUsPBcKpIaOlWf9cX0pWxj%2FEjSN3dbzyt8oyVgSvIiZVHmq8nwZnroR3%2F00zTLL7eJGDicZMxmigXrvn5fBHpXz%2BET1DL120ZCCbanDO2mGCIVdcJdYEt3G2r01HoA0RSn17jZkUhe1W%2BzeMh%2FsfS7bvdwmnyMNNkiCpgp6sTHfm%2FbclTT4Eiew4XaQ6mEoHhhPgSy22rBFBwoJHu4aIY3SqtL3oIj1O0Bpc%2BDj7P6blZBuOoG%2FvgFjgp56euU0OJ49pIAkOpfGbTPEX5rhmT1OzbSenyROaVYyzFR1rm%2B%2BW8VSdz5mTmKxsNavDUAAOnDai1oAMnSx8xozdiwVy%2BHURxYueRrbV8QmGP2Vj%2BxNqWl8thoJaHrBmWz22hXeFpf5TtzJGD6sTncj7P68oFPDNbcEvDLzIUXj%2B4vb%2F6fJF%2FbG4ckacUyT79y2zhvrTLhc3m0LiioF0F29bkY%2BhHcATEOkbkF4TYON0VboAvZ8kJNK7jo32p4y3ZNu9FMePdZ167DiAXmmjDMQL4NXjpb4zzYrv8IihhoBZ%2FwbkhdIqLsIM85YGCX56toDxab4sqb9mMfjRitmLENADYO9jDR4LjNBjqkAbQy12qjWJZaEV2GhCxEVW5yZlr2QGBym4zUSTyQIf8zollROS8HaFNdwMwBKkm9Egc%2Bv%2FNAD0Cb3Tl4qhnkUYoJrBridhm2FZWTTD%2BwfF5eLPXxkYr1NvpJupTFuZ3kHVFu7NlPEgXG%2F5I6pHOJodH%2F7ZcFXLVPFLN72nAtMi4qiJeU1FUIwND%2B0LFdAOzC%2F%2FSbKfx5V8ba57qfb%2Bzv5vmVTbXu&X-Amz-Signature=03ce6bc9ae1e4e2f6ed7611dd9cced54807e4ae03965b2aaa57f218b7a0ffec1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR3TCH3Q%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032945Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIE8D9jJ2YeUeKhGJp%2Bsy4lCJI6SMoALCPXoLYA3qsdEsAiAqUTOXSWTTDhbQmRaZuc2vJ8P8YLYdp%2Bzwdx%2BOGWBvNir%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMHpUfGclPfGeZo3qMKtwDpqmGeIvnLGpeFFWNByIu3xqdMHj6a4TG8mvGAvfMhZxRs9tGosr7woM3W4fvw%2FMWM6jJssVj%2F6GjVcv8Mo8iajx6yUQUr9AiWmfOqsTmv75sYIZIWAW8r4D05%2BeoJ90TBiNpFhMGW%2FY09YDzwpqJoUrLTb9cY%2FZg8ZeAY1ETx9%2BtY6nRJ%2FU4Y%2BKyVgGu9K5OnNQqbOmlq2GTzZMhLulbdIpsfk8ZDi3z4jkWjJisgr8AI2Po%2FCJtBTCZNbIpUx7w%2FkRY%2BF%2BzAZhBWB9l4x5rZidhGQ%2Bd5vX26PvihwTyse1M14uImydMDCDJoRWw6hrmedLOcylpE85XQhzZCj6VoJ%2BMBjNFJEK%2FyMC8qOelaFPkT4dY1cjYmJRkaVEswNQjbxbEEMX%2F2Xp8jIpdPgXOFDZe1c7BWxd%2Ff1YU95Hkj0QECugb8flwNCBOh9zpa2VOOjtF7LgvRXZwYwJVkBfYg%2BXtddptRAntjp3EGcvphFMSwaoFRStNH1yhFJz%2BTjSpZ30QDMt7o91kv%2BFCGftn2NTf%2FLVFW7glny80CO9kSmbT5C48HgB5ydOUlwigNNfA%2BVMNr%2FUZm71Zw8mfjmdBBHx80dM5Kz42eNL7pUWKxvAoA%2FAt%2FRgqlUGiGHAwyeC4zQY6pgEbR8VHMEX%2FRvOMTRyYC1Oo1V1LcaRbHeO4cDEF%2FmkXcUZp9I36aFC8d6kWThuNiJWnOkTqyq0Sz370D%2FCEQ0E%2FpNb33fVm6sZOqvBEzbrRkpahSUB3AdEYk18A3tpP6dyvBPV2foP%2Fg%2FAgxOQn0ue39YRaRuxgfFsJWD8iVQ5928CXn5e%2B%2BGhrfCyB28P2t50HR7zsBHF1tI5CN3XLd5dGM6Q%2FVWBO&X-Amz-Signature=b710c3c1c28ccfb6ad908e18f1f996c7123d40a0f592b0e07d24de8a908ca462&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYBUYZUM%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIDi1ulycOlYDQ53zjT1wIKQ4qdzYnl8CUyGMJhLvQL6dAiEA5aG9KZj30KamCLCNjBhUYPZ1xrC3ufLcOwB7FRAee%2B8q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDNfOup%2F%2BYYrR1LWfVSrcA5Ojm3mM0fyE5%2BEAGuzn1aTXDEj0Ls4QjeblQ9iD2FJ1w1A5MRhjNigVw9IAmlhXE%2FuAj1Tyk9KkgrHdOb830ZjxJOxxgCSn07zhCqQqK2woIaSACaDuAU1e7c3M7i8vhcaxvtsEPTssZk7y0FMcFInIWPY9rB1M3hwwCkIor9BbsePDFQG6Tfssk26NeiY%2BCy5pXenWqp5MwUkwh3uREAvta0nayY15TzLjPndU%2FCD%2B%2B8dW6eHmVYwnjLD5FkXNzx4QO%2FUcXMSLbBO84hW%2FZVfFfGv5UQlU7lzQIj4JmoiDpOSJlhmOyrUhodqD7EK6bNWNFfcCkvEntQYi54JIliX%2Bi0p4thuMRT6vPEqgCucKwJQnjWpcBjuRUJ9N4WGDISE%2BZxv3IfY%2BsAFT8E0NTwPcEJPM6sejQAooL9rmLqGCqqSVIHYEJ4qt1GKXolryV%2For%2Bq8%2BsVDMVJFWFo7j2KkShKW0r7VPCOvERMFlVqU9%2BdgPcGc4uOpkyg3skmPElFO%2FLIOCKRIUF3oiX4t61GrIMqw95L%2BasLbsHnb76qcOz6S%2Ft9MRMQvkxmoR5YPFntzITFgyY3dhOA6E6F51mStRI2%2FUvY6rxr3D5YEiwTGqrqQCfX8HX7LWx53hMK7iuM0GOqUBNZnbQP7wNJQEO297u21zorXh1tIXoNy577YIrMTHZKRhCCoRU5maYN3%2FpvPWcmCPiAXJ8V74lFLEyKLE01u5SwH%2Fkz931jzufiawVpKKj8WjG42KogPNjQcQ4Pc%2F5iGpNAxWL8CRcbB03qGpHSUKFvRM5XKashNKg2%2FrryG2Nu1JNpYT0chmMen1eusdhUrFq%2F6yTeRgJayioD%2BM2CTaVNuE0khh&X-Amz-Signature=4d7627de9959fd7b01e7626b78fee7d7d8cbc64e2322ab32ec44645613862f2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYBUYZUM%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIDi1ulycOlYDQ53zjT1wIKQ4qdzYnl8CUyGMJhLvQL6dAiEA5aG9KZj30KamCLCNjBhUYPZ1xrC3ufLcOwB7FRAee%2B8q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDNfOup%2F%2BYYrR1LWfVSrcA5Ojm3mM0fyE5%2BEAGuzn1aTXDEj0Ls4QjeblQ9iD2FJ1w1A5MRhjNigVw9IAmlhXE%2FuAj1Tyk9KkgrHdOb830ZjxJOxxgCSn07zhCqQqK2woIaSACaDuAU1e7c3M7i8vhcaxvtsEPTssZk7y0FMcFInIWPY9rB1M3hwwCkIor9BbsePDFQG6Tfssk26NeiY%2BCy5pXenWqp5MwUkwh3uREAvta0nayY15TzLjPndU%2FCD%2B%2B8dW6eHmVYwnjLD5FkXNzx4QO%2FUcXMSLbBO84hW%2FZVfFfGv5UQlU7lzQIj4JmoiDpOSJlhmOyrUhodqD7EK6bNWNFfcCkvEntQYi54JIliX%2Bi0p4thuMRT6vPEqgCucKwJQnjWpcBjuRUJ9N4WGDISE%2BZxv3IfY%2BsAFT8E0NTwPcEJPM6sejQAooL9rmLqGCqqSVIHYEJ4qt1GKXolryV%2For%2Bq8%2BsVDMVJFWFo7j2KkShKW0r7VPCOvERMFlVqU9%2BdgPcGc4uOpkyg3skmPElFO%2FLIOCKRIUF3oiX4t61GrIMqw95L%2BasLbsHnb76qcOz6S%2Ft9MRMQvkxmoR5YPFntzITFgyY3dhOA6E6F51mStRI2%2FUvY6rxr3D5YEiwTGqrqQCfX8HX7LWx53hMK7iuM0GOqUBNZnbQP7wNJQEO297u21zorXh1tIXoNy577YIrMTHZKRhCCoRU5maYN3%2FpvPWcmCPiAXJ8V74lFLEyKLE01u5SwH%2Fkz931jzufiawVpKKj8WjG42KogPNjQcQ4Pc%2F5iGpNAxWL8CRcbB03qGpHSUKFvRM5XKashNKg2%2FrryG2Nu1JNpYT0chmMen1eusdhUrFq%2F6yTeRgJayioD%2BM2CTaVNuE0khh&X-Amz-Signature=d56118d8800561f64a7c8560f2d33c6a6d7c27284bd237155f6c91e288ff2a83&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAMYUTS2%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDvl%2BIe1If4NNLZkgEJO%2BH0tboGJK7NIYVHu9uIVKvOUAIgcd8tQ8ilN%2Fo9mSCHEa7A1jB4YsSYMyK1Su%2FDo4KI9Soq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDPdwCoiTXMcUldJMrCrcAzW3JX%2Bzgq85WlI%2BaHF9WbYbHWV2S2tlAoKVRWESenKwdAZz23LQHaiL1Gd7rFGSy41rE6%2FALpLyfhB29XBe6luX9EZfSM5BpgilchAgcE0B17W2iHsMq%2FDKJ2CwMeJCV2cYKF0l070TZbM%2BVUstTFgOX8ocPbKFP22C06cm7XUOjHN4IggiA%2F3ZmIVOsRNulPsgSa54rkZDQSuPv5IQ%2FTJXwSwuIX1l%2B3yZwpLgrroyuEVFcUJWOyh73%2BfVekIiKFj89XTpzEGgh%2FMecS64e%2FptqakswVbvwaiM0G48eTuAK7enBJU%2FArr5j5UqaU7XCakue5VOkaQKbOEc7BJ%2FrfYm35HhbLJhpgo29R%2BKyqXhJsw7rfloeh5UZ9ISWl0cK3DKPdUVxm8SnaF533ftVVri8IhZR%2BYgUaWubeeTr2d3L2u2jYqzRlFPq0EDlwNKBe3bDBloItxV%2BG9k%2F5Rmj58EBZjwhBo6pxgBJgloEZpW4tTANybL3JPl0pZGRBQWUBOQMpOPRdE8oMC18cPL6vCy7y6Vm4njHmD1A6jN9amsRNjG0FNTgwPbSQf2PtWE6BKkzhJVzn9ysoLxWUNEsdl1T8bFNpcRTYNwAQA1fCxsv%2Fubq1e842ptzAqBMKzguM0GOqUBn0lqhac0hn6%2FzO3DMyk4UbPD66iY8gjNcGlbpuktNYynFyWS5czUs9CIEi9UUY7RuPleriS%2FHlepw6rzoVbwToBRZMYECDtAQgXA8%2B11UDHiw4dZt4MOu%2BicjXgT%2BV5RUx6yLaAf0ozW4%2BxatlVqH4wRVRdH70hKaUJAJxJdOCBwVZD9XAu00YLRAS4lrh%2BmWrwdG7GJJExZaGFWNDIZ53%2Fz4Ngr&X-Amz-Signature=a69c07b964de5f2b797c0b8a153a8df40f1c0b088489be0c2fd5a5cf23758e44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7T4GKMA%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDsmqyrLZ14QaaMfNgV5jm4ez5LyFro5XUUS%2BMVNMFBKAIga1E39mFLmSF57HCm82ixImeqMPhxhC5jdZIFrwE6lmgq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDK0oLF%2FlOPS9NFJ9ZircA1xSOMTu%2FnLr8mKdBCRZoccZzYb9pOLuLo2VpItPggGM9comwTkWqbMRtu0GClFiIsBue1YSBAYe3asKinj8sVlGCzlF42gt4IR5uN4VzGOwPWAtOxTroZG17yMc4r%2BOIBTubQjUrou4PO%2FxPwhKRRyTm2AskudBc4meSWqtqOWed%2BDx%2Fvu9xGqIF1QsaLpvGlQ%2BlGF%2F6ROrm85eiNGc6ijJVhFdExJz%2B0GnNIPVBNW%2FbknlreLoC78uoaCjjqX8pufcj1taIKRo5jNv7eQOY%2FDszeCppn0eOAxroKitD3Ug9XV474QzIWniunqkUHmaqoiAtUncHMIdSTgt%2FNJBqqbzrk0XctrJA%2F%2B4S8iKgc5fmaleyM00lcJSx%2FnyCTEU%2B1U4u%2Fi39shaIfInfBEqnEEOKLcIdGVAlSlwUpQIth6EiOdsN34lPDDfWL4aCwXU8CcYPGYumxTzNy7pB1rTKxtZR7ut5J8N7LrrEmiZONhY08VHeN6clxAB%2BmQ1VouzH9WjBpZFBLKRBk%2FWhVW4qGjQlPg9iZIs%2FVjn%2BnBcC68cP8EKA9JnZxJmxJic7bVuIXDVno0iam1x4DePGzn4gopwSb5nFJMnUsas9OxuxRzi31gziaYJY7csvlzYMLPhuM0GOqUBJnDieXxOQhZVbovObMfunrPsT3txQYIbOs%2B62kv4vYS%2FM3ZkFHTGMoUR50gI7y%2BBsr9q0hudNouDTQkRoviwtbjQcJS8LsSyQgVPQtM%2BKBiDpu4SFZVOl7TghN8pHdV5ysz%2FoAFE7RPXEDfcMuwQDb%2FDSmOugzAQ70IhXm6o5LmC0t%2FGqKi45ue2HQZ0qjbXkSfOscab5o5bZj%2FoJo5nsyoKAS7r&X-Amz-Signature=dc4e233138ecce5725ecc921745e391c723ab884e1e6edc9eeecb530cb9368a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBKUS3LC%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIF9ZCzdbgDnDkN1PXj2AbJIxDq%2BBsO75TypoIxBmFkYvAiEA73%2FPgS%2BEPHCymFABYdDei1MoZblLK%2F2svFOcaN9wxioq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDAYtvXInY%2FCydtfBMircA0V8fMRUE3TbCcDBHE9Fo0259mWQkmN5zjfnkmxBzklKo1ApSwjqWGa06iqDRef0j5sSUQK5%2BVBEDnl8ngrcX8qBQeXDAU9xD7x4OKuyT%2FdjAz%2FNf13BVhuLAbhfCbwjR7GXXf1wEIfOkNCDV9z73bnfkmOxkfLI252HszaqG5xQcAdLqcMZwcxYRpTyY5Caq0wEPbTDk2JhUJAmSrzTRxuddgTV4cqBC258XIvMvOadSfKRTVHkKH63MX%2F0VbF3c%2BbAM1qGzjrr5p07aQDfrJboBiMojJmJF5VklaF1k0VLJwGgpHv%2BDaMp%2FbguWke3dl2p%2BYujkqy%2B7Ehy7s75gv0%2BJgjox42FmYgCeXvjwHDCLa6ZlZ%2F93A4f43TSjLmhZ15KFhVG%2BGtwCxPKDPkHKfLA317RBg6H2FpRZxfj2EbesnK4w6B%2B5rZhH5iqHr1X%2Bs7tehSPS3e5t2%2FYFlyiRflr4%2B8dP%2BUO%2BFzuNjJeM3iauyDaSsOqnMRWuleP5t6fFxsrvRxhoHQEAqgrLe4DixDQFBt1dV3Pm6espMOW0Rfy1JCw0pPXEXXZmnf5iGCAe7E6rfRsF1waNpkR0rTwKCEz0XXg6Vyws%2B1kMYvEIrdrP1URGL%2FDN1tTma0dMNzguM0GOqUB23NBpPsz9hofj6YVoTNxE4KOvLAbCxgv2Vodd8Sb865FD2XmecmIHPt4IP8VzEOvXolwe1oc1uqSal83DdIp4ZddZnMpfWDjNQm%2F3SRSIIMKK5vcSqwp5QU3G1HiIYn%2B89l1xYKL%2BTipVz56o6DkdT3M%2BZeSZUgptQu%2BjYREMQpvCCETHIhq9ElnjTc%2BVvqM0MqVn5bpmrvpXIpUnmneR6AHtLNy&X-Amz-Signature=a6a23491736a9076943448c95bb80ffb38d49026f3dc78b50bc5ff4562fc1d1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBP5ZQCB%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQD0QsFSbT%2FU1V19HHgLoqqdD5oUNTJvQaO5QYA6lzZkrAIhAKBFVdbg4MXQ%2BX1V5T5GFrpzObXI%2B%2F9VNoKSEbb4APQdKv8DCCQQABoMNjM3NDIzMTgzODA1IgyLGMa2Gnsil88Iw2Eq3AOCAEVZ66oR6viX88CeHZQHsQ7MbvzHs0yneKCGpXBXVRMKxCKlqIfCljxCe7zRzTJizjtZMnbVYc5ntYhwRO7fEqF2%2BpmjrAzwMlc%2FH6L9cqp3gh8TXI0jiZzixvqNUlMb3vp97KtsgKK1G4IbqkWUhUpHnOy95j%2BCY8Fawi3wSX4u8iQnDeS5ddu9rNAP4MiMXiISdXzd%2BHk21%2FRRRZNyon8okoLZnSBAZAZblcVyBigzzD4XogP9RP7VjxEN4cPTHIUdYAB8vaaI3G%2FEFN1R4aRAWXnEjKSbNSXYxUzBun%2F0lQHQMvfSyxYyneN9xYy1O0YlCACobWAEu3AxKaNx0zqHd%2BkeQQTRJ2A6krYNgc473O3kfeQA3rYgl%2B279YdRTOwJ6BVmbt%2FfGOtgenraClNFGnXlTqrhQFhUhUBWM2NYcd0GprZg%2Bft%2BIVg54BFaQEwYmXyezgNCxoz3A9HpT1KFVgxkF93S1rcRlMdMxKiL9nKUrTuAazyMzvV93KX7xVXvBS0EErkVZcvwsAlDkSbPEiYchKzpubQlpfy0TKcq8afSsrAves4c8NEHb6Fz2wn6gIgTpf616hAMs%2FEraA7OJuioC0B%2F52zZcMxzg7FYSaO9enPMl8GvLzDe4LjNBjqkATXWADFvLhDQsd0o7cpqddAhpOX5lMjh7JUZ%2Bn%2Bqts2M3y3oN8F4QVKg9Rr%2B3Bbt%2BK31sFki1FbKmnLyOhO19pnQDeTt5ZDo7%2FafqvGswaaO%2FJ1RmIJb%2BWDJbsDI5BnCM8MqTmaiZ0MhGlSBaSS0eh94NuGflysbJUQgpASs1y%2F6dRwFvOKLX6XTS1al%2F685g%2Br%2Fxv9pZd9cpNNsy1ziX%2FtzkEEF&X-Amz-Signature=d94cc648d7357567a1cf78ad461a90fceb8b7b3fe15e94e9bc48ebfe7f1831fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBP5ZQCB%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQD0QsFSbT%2FU1V19HHgLoqqdD5oUNTJvQaO5QYA6lzZkrAIhAKBFVdbg4MXQ%2BX1V5T5GFrpzObXI%2B%2F9VNoKSEbb4APQdKv8DCCQQABoMNjM3NDIzMTgzODA1IgyLGMa2Gnsil88Iw2Eq3AOCAEVZ66oR6viX88CeHZQHsQ7MbvzHs0yneKCGpXBXVRMKxCKlqIfCljxCe7zRzTJizjtZMnbVYc5ntYhwRO7fEqF2%2BpmjrAzwMlc%2FH6L9cqp3gh8TXI0jiZzixvqNUlMb3vp97KtsgKK1G4IbqkWUhUpHnOy95j%2BCY8Fawi3wSX4u8iQnDeS5ddu9rNAP4MiMXiISdXzd%2BHk21%2FRRRZNyon8okoLZnSBAZAZblcVyBigzzD4XogP9RP7VjxEN4cPTHIUdYAB8vaaI3G%2FEFN1R4aRAWXnEjKSbNSXYxUzBun%2F0lQHQMvfSyxYyneN9xYy1O0YlCACobWAEu3AxKaNx0zqHd%2BkeQQTRJ2A6krYNgc473O3kfeQA3rYgl%2B279YdRTOwJ6BVmbt%2FfGOtgenraClNFGnXlTqrhQFhUhUBWM2NYcd0GprZg%2Bft%2BIVg54BFaQEwYmXyezgNCxoz3A9HpT1KFVgxkF93S1rcRlMdMxKiL9nKUrTuAazyMzvV93KX7xVXvBS0EErkVZcvwsAlDkSbPEiYchKzpubQlpfy0TKcq8afSsrAves4c8NEHb6Fz2wn6gIgTpf616hAMs%2FEraA7OJuioC0B%2F52zZcMxzg7FYSaO9enPMl8GvLzDe4LjNBjqkATXWADFvLhDQsd0o7cpqddAhpOX5lMjh7JUZ%2Bn%2Bqts2M3y3oN8F4QVKg9Rr%2B3Bbt%2BK31sFki1FbKmnLyOhO19pnQDeTt5ZDo7%2FafqvGswaaO%2FJ1RmIJb%2BWDJbsDI5BnCM8MqTmaiZ0MhGlSBaSS0eh94NuGflysbJUQgpASs1y%2F6dRwFvOKLX6XTS1al%2F685g%2Br%2Fxv9pZd9cpNNsy1ziX%2FtzkEEF&X-Amz-Signature=8eb9ab8733f2e4a1621ceff58e360765a46bffb622f8b64eead63a21d9a09132&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5RNNKWV%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDtwrkyyv07mlBlYvY%2B3Mxgu73EH%2BG0d0ZmFPHMLT7AoQIgBAmRrjQxPQqHDv%2BgfJXkIpNLa71qIXdQgLOBMq1g5A0q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDIv4Ney3aWJOPUNYjSrcA4HauyP0mkPTItS68pqveC%2FpcHnWtx8%2FbfZpqeYtyP5P0Y6mAtISxBfxo8JfpdxFBDvqH7gQfnvlfKp3OYKXps7O6pN9T4GSsaM8rcoCRUHbVLO7pS1lI0zd43xRp1d7sZThpRyC8Vgg2%2FiAiwMW5gB%2F2iQGdSPJqk0sZLbCgoyKQgXHlPPx2MVvDpuBevv%2Bn3K%2Bqxs3C2KlZiw46J%2FgkWzdKs%2FyZr97MfpMURbgZom%2BnvFSr6sUCeTlSiAsSjePHHz2fQz64I%2FETl5DlxsRUPofChfKPPAIenccgZKSt46%2BGUqldNLmyrm8HXt%2FYYajgw8b1AS9cFox8W1B4OUYDnEDqDqkdpeGBsOtQRr%2B7mCAPpnjiYyNpSSI8xivVwjA4dMsEp4Si0qKGUlnYkBGnhEgZwZI7UEvX9FqMwgiNf6dxIMH62R7c5hEKFStCE8SDf15wzQQPQNHo5I8jxRyG54mVYZInm7B%2BnWlZ9Poioqy0KYMEjWZNSLLdc6tAP5BtTnrGErtPPVaEicm0BOHR1D1%2F4I9ukvFUwA%2FPO4hrrB4o0HCdzWZSaQganZD4p8tcovzVmmeBrRFcU94jjV%2F%2BEoR53FRzz8ZrenrBuoRSDKrTC6SJWk8%2Fr9iQaG9MNbguM0GOqUBWDgEqKvi%2BD3jC1l8SmAYOCpD2vMDez4NJlDWt4XRRhSU3UVUg06b6wY6CzYmJ4f8gyqL%2FgZCC%2BJ%2FqIwN%2FVUjol3ajLUlkfTI3DpQRyfiOXYLKzeuwYMLQOmV%2FJyl1UTip8usBVgsX7Y2FXHV4AdyF9%2FzzFnPof0u0SX3WxCZ%2FWQ7tpKgmGLLCWOL8XceHXjGYdjSCJtrz%2BrYzxH1UC1NWdFX2Uax&X-Amz-Signature=f252ded6f0c50bf6e414e348b68e8a44af115585324d5070d0ef6aac8dc347f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YESIJ7O%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQDm49DFaxRaDZoXiKQ1%2BGv6i6pA6No8fRlb5Cac8VDOUQIhAO8N4mIKaNgHXffOmALt69cdPWVbC3XlhLEdCUNoB41ZKv8DCCQQABoMNjM3NDIzMTgzODA1Igw28s9d08pCn%2Bx8O5Eq3ANpnBZcy0OaxQxgdjLVXQbsk7%2BawYySnNgKebszt2uGUx2hItLALvBY6fRczj%2FxUxu5VM%2Fcte8Vp2zCE7ftSpz4RAKG4dZW5aQpzVW%2F5QhsxQEbKONeehK14UkwDU%2BKOzgWt%2FLcY2HHbCbSj9I5ANy%2FnZP7t5m3EYzKTfIVqQcAAtDUSyEYKH3SbUPvbJ3R7ZH5Tf74ngDIuG7IccsRu1bJaGRbEZup8Ww1hCg%2FS6Ifm%2B3s0ImWD3EXHoMXUEDF7C97T6m6DkE%2Fq6Z5k%2Bq483ltB6P8ypuU7R4iZP0HtKka%2FxguaZlDsfSryMizf0oKZH24hpMNSevqq%2FKpV2oCvygg2hEXPlSunJiVhYr65D%2FzEqg0p27ejPn8x4595pxoKznNvOOr8ok3pjF76VfcyaCDLdH%2FNgW6p4%2BtxpsV%2FTsRkVJmUiJyGmgne4NDhy%2FAkZ2KM%2FeAnYG51l93ufCM2hFyd8gky7GP5QSfj0J5g2sykd5pb5bpA9wWoEXrlOJuoRofa9Drz9wiPW2o1PhZ6dpsGjxJDRFwqkgvo9byUNhja%2Brc9hmvVFOnmzSGaru8DAfSYCnuNzRKtxLJpMafPyo6aEH9UY1R1HvuQc9%2BwMWDNDVsn3MoBHi7DujFHjCs4LjNBjqkAeKagpRUuGa%2FG8jyzjyIml31gKHOzCWM0HEfuRzKU%2F35ITaVRfJe46h1aX8%2Bu1WQ08BLlbIQqJNw8BwgRzV%2BqxaVBk9VwmJ781uSevUSGr8g2cNCY%2BjqSZnFGo49HKvZNyXoJE%2FSCk%2F26BfTpMlMkTLxxxDTgr7QDzscnFvDCEVrKG%2FOi9WANlXf7BzGTtMezIh%2FhDsxPmHPffDd7h5Kq8c1x4EA&X-Amz-Signature=822371971d8e688a334b7df4ae45b557472deddafe29d5382e6555340260e3fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YESIJ7O%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQDm49DFaxRaDZoXiKQ1%2BGv6i6pA6No8fRlb5Cac8VDOUQIhAO8N4mIKaNgHXffOmALt69cdPWVbC3XlhLEdCUNoB41ZKv8DCCQQABoMNjM3NDIzMTgzODA1Igw28s9d08pCn%2Bx8O5Eq3ANpnBZcy0OaxQxgdjLVXQbsk7%2BawYySnNgKebszt2uGUx2hItLALvBY6fRczj%2FxUxu5VM%2Fcte8Vp2zCE7ftSpz4RAKG4dZW5aQpzVW%2F5QhsxQEbKONeehK14UkwDU%2BKOzgWt%2FLcY2HHbCbSj9I5ANy%2FnZP7t5m3EYzKTfIVqQcAAtDUSyEYKH3SbUPvbJ3R7ZH5Tf74ngDIuG7IccsRu1bJaGRbEZup8Ww1hCg%2FS6Ifm%2B3s0ImWD3EXHoMXUEDF7C97T6m6DkE%2Fq6Z5k%2Bq483ltB6P8ypuU7R4iZP0HtKka%2FxguaZlDsfSryMizf0oKZH24hpMNSevqq%2FKpV2oCvygg2hEXPlSunJiVhYr65D%2FzEqg0p27ejPn8x4595pxoKznNvOOr8ok3pjF76VfcyaCDLdH%2FNgW6p4%2BtxpsV%2FTsRkVJmUiJyGmgne4NDhy%2FAkZ2KM%2FeAnYG51l93ufCM2hFyd8gky7GP5QSfj0J5g2sykd5pb5bpA9wWoEXrlOJuoRofa9Drz9wiPW2o1PhZ6dpsGjxJDRFwqkgvo9byUNhja%2Brc9hmvVFOnmzSGaru8DAfSYCnuNzRKtxLJpMafPyo6aEH9UY1R1HvuQc9%2BwMWDNDVsn3MoBHi7DujFHjCs4LjNBjqkAeKagpRUuGa%2FG8jyzjyIml31gKHOzCWM0HEfuRzKU%2F35ITaVRfJe46h1aX8%2Bu1WQ08BLlbIQqJNw8BwgRzV%2BqxaVBk9VwmJ781uSevUSGr8g2cNCY%2BjqSZnFGo49HKvZNyXoJE%2FSCk%2F26BfTpMlMkTLxxxDTgr7QDzscnFvDCEVrKG%2FOi9WANlXf7BzGTtMezIh%2FhDsxPmHPffDd7h5Kq8c1x4EA&X-Amz-Signature=822371971d8e688a334b7df4ae45b557472deddafe29d5382e6555340260e3fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642CVKKMK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T032956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQC4BVQT9eGs87ZAkrCrjKvD6uATpo9dywiIsu6gDrc6oAIgIJhqJycaujRCZn%2B6fKrHuw1sf%2FZK1DN%2BZ6j6GZLNHnEq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDIkz9%2FHvouZKkPYEESrcA2qPu5jPNDdblpZw3wt4S4uF%2FDK5DuSVr5ZlfLT5onUc%2FIFYliT3gX7KuDjuDnXY%2BrYR2Kn%2B%2Fu1Ow9VPxmodqwYkXTtwi0gqN25kF9ecLKDE%2BYtRju5dlGza4Ylp4cV5tanoHhPoi5Le8pUhixS%2B5rp6G1LBEJt0z5Lg%2BsPUZNfYGcGs5wurkgshRkudPXqnHC%2FVpWrlc4OiN7DJoKQBFsYOkFrwIblA0B42bl6htdBdUIDLpC8rBHWunklJ5F%2BnNMq58OQusZb5GICQvncEdXGX9%2Bi08OoX6imZKJgGaCS89%2FzSY1OvhxWQD%2FWcr4ISbQ0JxZ0wShEjBUmjBjo6KKm3bQnQZQlcV%2Bet0s4iGymJnAC4TPNp9ZM9MbL30iwzrNrfZGLo9BBZUd2WAG4pwNlrfT8W8B6toAGSr2fngSPccbHTzdtgRAGcjKFhDfDqfepFGTU2iRZORm2grZG51loPnQ0c7yEpqKItgP3pePMkl256%2BDPzv9nhKhLR57yuHHwCI0wtGhHv7jZrQ8rn7fCp8VrlEt39NmGerRrEgDr%2BKsVLrPR2Aa6o3Y4%2BXzxvz8YN155qeUs9m7ibopJJOL33g2DejRuWjddJSkKD6Jzg8j3AcKvvpJQczAMqMJ%2FguM0GOqUBkH8ASytj%2B2D0N3RC%2BnS1jayJHpOeOEvrV4cZL%2B%2B3SRVBiFFrOwQnDZRoZXPxMHjp4BypR8NA06AN00%2BOYtCvjkW1%2BWr86zsiJ1gcfkqopYvoCf7EwINxoHopl1PIk8T%2BqdRgnCkd%2BbSBWEjhxXTnpuT%2Bq8w7SplSylCGBnr79kMAhVrLw%2Ff1iGklJzzNxSaUMHu53Y2FqmfONx2zkZ8mVUYAKMoo&X-Amz-Signature=2df860ea1fe7be2b40a44c4b074c6a08be32e239e8327a9cbf1ddbe78a01b166&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

