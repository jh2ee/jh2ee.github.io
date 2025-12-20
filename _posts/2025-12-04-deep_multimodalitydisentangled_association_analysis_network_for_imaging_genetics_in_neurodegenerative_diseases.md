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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BKCZX7H%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2BxMHK7W8N94BDmHDWq3I4hd2phky8CaEXyPURnbRmbgIhAIZsUHhc0Q4mxZRIgaRKl5X2llqCqc%2BF4KLqHcYpYHHKKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgweRZfcTFzOT4Wp3bAq3ANq92F07GH%2F65EUDCWPdv1bjYV6r4wff8lb2IxNR4LSmjmdtZG6DTOESycSOUPvuQBitG1pA129Zq%2Bh4rhVdxiMklEnQUKXJlDZaf6zDfS%2FQOghXUToTx9G3kz7A%2BmxwfUew1DJH9rpq3QA2cngcMODokKvw6fo0UsD8deW%2FAgjHjcIW%2F8cKp%2B%2BVBI9hI8jj60aWBiGSU8Ue%2Fbf%2BMQk1kDjUoaaAZ3tnio4FsqWsfvvVDS7LOdQR72rwX01RlZPYNpOoA9Tyh%2FeuSLIPjHiEg9NerhbORIyrI%2BRee5WF3ObrjplIDeNkRO5yG4%2BvHqRZulotTsU223cobFEFeQtZjaESb3Jc75uoOn3T0XYJU3WTMr2VxLiPn9hg0ZggFcNeNYiWkwNya4jtGGtIik8NQ8fYr8CGJCAyNK1vSWvGF%2BiHbRBlAeltWrBV7SsKKebRDufw7Ul9FLWJClotxshRgET0RAwy9cjSoRJ2vgKt%2FP2raBMGAOhjK2MFpfBFfEoUnA5TpSna15Efaq79FEyVnvQT3FxyiM%2FYFEOofpjMPax1dHaxxMxuQEfol%2FPGH6B%2FYDlNKoK3OR4lw9LICgnSapQJj9bFUIBuiqZt2lperLYwBi1TFNJvz4ELwA93jCBgJrKBjqkAfF6PC2Xs0qzF2i%2FF4hZ2jn7a0KrATK2yzGMcQIB21VGAi2iD1Nz8ncg3DY3qbia155HJbDjtDf7vf5CHmA2izEQxm6nOoMMojatnYnnk3tjzmJ%2B3DMx7tzjg6aZHTER4fDN2vlt9PgA%2BpcHkomWo2Pqmuu52B0vOulKHex6Z0l5tlv4n0havoNEK4CCHl4HqxkRypB3Cr6Z%2BmLKLElChBws0TCc&X-Amz-Signature=ee59e81fd6a5f50cbf809b8c31ac3f8ab8f1dc84650c138e26e7059a89ccbbeb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BKCZX7H%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2BxMHK7W8N94BDmHDWq3I4hd2phky8CaEXyPURnbRmbgIhAIZsUHhc0Q4mxZRIgaRKl5X2llqCqc%2BF4KLqHcYpYHHKKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgweRZfcTFzOT4Wp3bAq3ANq92F07GH%2F65EUDCWPdv1bjYV6r4wff8lb2IxNR4LSmjmdtZG6DTOESycSOUPvuQBitG1pA129Zq%2Bh4rhVdxiMklEnQUKXJlDZaf6zDfS%2FQOghXUToTx9G3kz7A%2BmxwfUew1DJH9rpq3QA2cngcMODokKvw6fo0UsD8deW%2FAgjHjcIW%2F8cKp%2B%2BVBI9hI8jj60aWBiGSU8Ue%2Fbf%2BMQk1kDjUoaaAZ3tnio4FsqWsfvvVDS7LOdQR72rwX01RlZPYNpOoA9Tyh%2FeuSLIPjHiEg9NerhbORIyrI%2BRee5WF3ObrjplIDeNkRO5yG4%2BvHqRZulotTsU223cobFEFeQtZjaESb3Jc75uoOn3T0XYJU3WTMr2VxLiPn9hg0ZggFcNeNYiWkwNya4jtGGtIik8NQ8fYr8CGJCAyNK1vSWvGF%2BiHbRBlAeltWrBV7SsKKebRDufw7Ul9FLWJClotxshRgET0RAwy9cjSoRJ2vgKt%2FP2raBMGAOhjK2MFpfBFfEoUnA5TpSna15Efaq79FEyVnvQT3FxyiM%2FYFEOofpjMPax1dHaxxMxuQEfol%2FPGH6B%2FYDlNKoK3OR4lw9LICgnSapQJj9bFUIBuiqZt2lperLYwBi1TFNJvz4ELwA93jCBgJrKBjqkAfF6PC2Xs0qzF2i%2FF4hZ2jn7a0KrATK2yzGMcQIB21VGAi2iD1Nz8ncg3DY3qbia155HJbDjtDf7vf5CHmA2izEQxm6nOoMMojatnYnnk3tjzmJ%2B3DMx7tzjg6aZHTER4fDN2vlt9PgA%2BpcHkomWo2Pqmuu52B0vOulKHex6Z0l5tlv4n0havoNEK4CCHl4HqxkRypB3Cr6Z%2BmLKLElChBws0TCc&X-Amz-Signature=ee59e81fd6a5f50cbf809b8c31ac3f8ab8f1dc84650c138e26e7059a89ccbbeb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UQ6IUDN%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHRkv8HT6M100hqHa%2FCRCb7rwhv%2FtnkZLBhCyCGTY1jIAiEAjNYvt6moP74mJ27iBesjbddXmRbHPFw3pV1RxyXkBh0qiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGs8gU%2FLaM4FXqsw9CrcAxWjnp41ReiC9aAQjRR7MnMyeqll0AHFTzSdcUOEFAQQh1v3mY%2FVFU1nAy%2FpN72qx8BSkwlvqug9sfWEbwSq2lOfpzZbZxnmdObPVaiPufSKSUFcl%2BsrRKOyUEuAHGPFk26zjMLzPgfF0wVs01F%2Bqa66HkZ5agNfF0a7chW7kwM4nGzDSIVpae9PB0R57uDi10HZxDtMgF4TV6rbo7I9ghfDXBaZ6lGqIxAGX633d9mkmpWkM1K1XxbKGdi4nHKVVAozPw2XXqpFZemE2j%2FOYrdhnpMdqUyqBWsFknd7vt%2BzrkmVo3Wv4vs1LrMK6TuTGWdXZCnN2E842t8XqDxhca2Ffx9510Ps2tM3ucpcF7wtRNyb7B2A3qrzKz73DpIt%2Fkk83X9eP%2B5pWsC73QKf%2BNlvZxCVci9u0%2F2HNLO1%2FGzcxBXTcQv1OB7V5hBfrAyJEPOsc2Gf%2B1PUPAa%2BG1KecAkTCiRa5hCDZ4QWEGE%2Bz9vxxxeEaVu5G4RRB3wbR%2BTmpGF08ydEnqjOV8OiK3rIHnCeIamMctePjI3GaUEuSRTvZaj%2BlZ3%2B8hmMrN%2BndIxYSDH%2FbJN9jcCy1wbLTchrxXov1zMk%2FIBId9jaut4HL5LDl23HPMPDT0CMjtl8MJ6AmsoGOqUBTYHHVDgdmLCRNO%2F5SgrrhGn%2BYeRZSFI%2BADqjy1Q9%2FhLxNDQf0edNqNUa9b1LI86ZX%2B7xGXIlHW2BgfLgsSEwqsm4y0eHMqwjfcdc%2Bw0I%2FwAXGAYcorW%2BHg4SCxrMH7867%2FdTQ3mwM%2BR2P60LYMuCtEuhN47gGoSyReDHmo7bXy%2FvyLeNdIJo%2F%2F3QNuExKUthJ7ar8oEuBD5sYnY3078NdFnvWhek&X-Amz-Signature=68ea2b6d7f624a8aed204f44a59ed4dc84b6dc5f6a4329e1fbc4cf0da6b20324&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLRJIKTO%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGj2849kCqIp%2BUrHqdW9Rmnkm5hH2oGMCdmFLH%2FWUbeIAiEArQit82jZEgefvAFGbHXS0FA3weq%2Fy5Mm3Ud57RZixIwqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC5fz5aTN3FPk%2BskRSrcAx2tVn4L7isNFikc6dJHSSg0KZbcD%2Bwo5L9DxNbZ7t8OnTawF375kB3AvaDtuQ58eE%2B%2FC1ebPAXJKKVpM8hbu5V6vRR3cGzg26YSTmv31voRsQXQyBYqA%2BRuTkBZSS3ZNOqn2egqU21FkOO1GuGSCh3R4q5kmWIbi%2Bbo4PGdPFzcPWV9KTqgMeCmdr0k2KAm%2FtDDedateNo64Xa%2FTLodaUJY5%2BKFcReHpsuGe%2BaicJ%2B3fx%2BVoJ%2FLzui0W%2BDpAie1hqDdCkplfXeouJk%2FoRH5uwB%2Ftzl7IA%2Fn%2BxdZ8AFI7ce%2BbfYOFUxKmESIV6VIr%2Bq5MyHqfJRcL%2FGr68Z7CZx9JW9uI0RmlgC8wUnIOyZeXyQ2byT%2FJdY3Plbz4zIYmQCT7vvJHD4h4MY6KNOoE00sHOnEvLjxuE3DRwIPnxZ0GfPeBzhpSKj5zRweNyw5bLTbRRtKfIYyWReV1u%2BvGbYL5v1xrXxQ8Kj%2FeCU2eVr3JZZnhWa%2Boc2PfkidunSJ50DttiRkw9LooY9g9Of%2Bg7SVcaGioQ4JZlfP8ULvtfXFw3CnNbH%2F73HxenmKFyAjGv4zTENpPUg5ao7JBr6Jz4fGehN2ZQsgAj8Njwi9v6dEKRsE9A0tz%2FVlCS%2B8mkQEMKKAmsoGOqUBcnpTWqyidYbmlFfKAHyuYJd0llxJUQYiNCJCmmXUqUZ7fKtG7EvyGoXAPUpphmg4dLIAeP5ZFqDQwdtWnfKsuRoKTIpCRBT7lKDNeesSl5UtCglEMcJEOShILUpbPs8GAdAFoNYuxqq1ZdtI6IF9cMbl%2FDwLfzcwa4MDzpBGcZ8F0XkfpG%2FpBdIXFig7cDi0s2n0%2FAAFND8HPuJCakyfbe08sPrS&X-Amz-Signature=87bda2c79bba3f5a993cf0a3241ffba9b60414a1140fe550c4b6a23b789adb16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLRJIKTO%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGj2849kCqIp%2BUrHqdW9Rmnkm5hH2oGMCdmFLH%2FWUbeIAiEArQit82jZEgefvAFGbHXS0FA3weq%2Fy5Mm3Ud57RZixIwqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC5fz5aTN3FPk%2BskRSrcAx2tVn4L7isNFikc6dJHSSg0KZbcD%2Bwo5L9DxNbZ7t8OnTawF375kB3AvaDtuQ58eE%2B%2FC1ebPAXJKKVpM8hbu5V6vRR3cGzg26YSTmv31voRsQXQyBYqA%2BRuTkBZSS3ZNOqn2egqU21FkOO1GuGSCh3R4q5kmWIbi%2Bbo4PGdPFzcPWV9KTqgMeCmdr0k2KAm%2FtDDedateNo64Xa%2FTLodaUJY5%2BKFcReHpsuGe%2BaicJ%2B3fx%2BVoJ%2FLzui0W%2BDpAie1hqDdCkplfXeouJk%2FoRH5uwB%2Ftzl7IA%2Fn%2BxdZ8AFI7ce%2BbfYOFUxKmESIV6VIr%2Bq5MyHqfJRcL%2FGr68Z7CZx9JW9uI0RmlgC8wUnIOyZeXyQ2byT%2FJdY3Plbz4zIYmQCT7vvJHD4h4MY6KNOoE00sHOnEvLjxuE3DRwIPnxZ0GfPeBzhpSKj5zRweNyw5bLTbRRtKfIYyWReV1u%2BvGbYL5v1xrXxQ8Kj%2FeCU2eVr3JZZnhWa%2Boc2PfkidunSJ50DttiRkw9LooY9g9Of%2Bg7SVcaGioQ4JZlfP8ULvtfXFw3CnNbH%2F73HxenmKFyAjGv4zTENpPUg5ao7JBr6Jz4fGehN2ZQsgAj8Njwi9v6dEKRsE9A0tz%2FVlCS%2B8mkQEMKKAmsoGOqUBcnpTWqyidYbmlFfKAHyuYJd0llxJUQYiNCJCmmXUqUZ7fKtG7EvyGoXAPUpphmg4dLIAeP5ZFqDQwdtWnfKsuRoKTIpCRBT7lKDNeesSl5UtCglEMcJEOShILUpbPs8GAdAFoNYuxqq1ZdtI6IF9cMbl%2FDwLfzcwa4MDzpBGcZ8F0XkfpG%2FpBdIXFig7cDi0s2n0%2FAAFND8HPuJCakyfbe08sPrS&X-Amz-Signature=20b01bd5bfab7250a966d088dc9be628054ce04ebd2424d03f01c436e28e6900&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVBMASZZ%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC8VAHEIvIERtkwuj41Ck7cs90IndFag%2FsX4zTBwiRRqgIhAORzAoYEyACtUDR3y6JsMleskq2TwVV3HA44SjinVcbvKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzVS7c%2FyM2vIpyofBAq3AMT2Yt%2B4V5qxAXEbsGDe7bMvikd%2BnFzKE%2FWwgdMDAzS8eGpwMQ7j16ysMV02YlD5%2B0PKGp70djqdTaOBBcE7N4sjmcfO%2FGHpc%2FHD9ur%2F5Flwo2jFwYl5qbLgujVrnKtnMCy7kliKgqPyuOsPTqrLsA0gW7xKkyvnSqd5MkBZhQ8fvIM19JOjrQvrieTJ7Lbm6GDmkpsvh%2FDt97mGSM%2BL4LUpWSXlY0mArC1%2BiM9jJAzbfkuO8n4tERA0l5Q80syWYVcbIRp85q2cxXvf4qt55SR9W%2B6LdgbAaXdLtjW4gQrB6LP6NHlD1P%2Bxn0vNWGmSdL51o5gT635K55srLcnTfDDbC4to1Nq7sLNCMbjc%2BPcNVZ1SxKa8TBvmSOL%2B3j9iRSw%2BCT9uAbQczvxGCofY9trVsnGfwUIbc7FB2V7eB6y1YoecIHKIbABpFn24hQan2Um%2FuUGgWs5n0GEAsY4uuUOrnAF0bcajbsCBw2lF%2FYJazVlSan0fgMlDYBeWakHohPV5ZHd6lG8N2rssawaZGkdSF7xs0davF2c%2Fp4LJqDR%2FFnSvH1nFRLO974UcsdZDCtHFV9AqcHC1Gpvtq4J02VDMaZGas%2F9V%2BCPGIqcZ2%2B4dulUUm2CQ1NA0%2BfVvTCUgJrKBjqkAQ6mmMqRRERLQhHE8e%2BpaO%2B4%2FpoZFOm7WMqE5Q5w3XQ8OOBHvAbU%2Fm0W5KMJfic7wP%2F6Jn61kx6UWr5EV310vHaU00B7DEME%2BFpkkuqhiBSUiPKeToDveFGmODmQJrpPGuOvae%2B%2Fqrh64xY2oHumMZ2NTPNuzw5SqhUi9KLPRzoM3mhqXO%2BBVR2mWVachh%2F1ev27lWbHPEL8GgsX%2Fhg%2BNeNcwJ9t&X-Amz-Signature=d94475049a2f41940319b19e7ade85fae8971b8275765b60b7cc60e12aac98e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UZKCXVL%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCZR2tJ1XWhh7GIzsM4xGPK0k7WmwfA9vfAmLhWlQ6oAAIhANz9SLSEV9sROdZUpKJJxhThIoFZH3d7yx0I3esr7tPlKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJSDG3ZM5%2FMPl7itgq3ANlq29C5mvQEaeYDjYQqUxnHYXxj0VYC05SNtYmIs5GhUhKlBdOEukJNo6cD2X%2BUiejgf3jhbxbPVUGqAQBiGYKw2POgPob836scsMGuCneyJ%2FPPBM3HzFGKevr2ZALOIhbtQxZcBNlKGpf9amcRgq1VDBQ72tvMJbWdHgs1GRzyVKyqOSbztFm%2BSyIZB1kPMOH6CanL8rmm9sb1PieQIqxVq6JJJPbgFBJc1ftxZv04Vj03DfYLFfnpPG1qTqXjYMQONRl6WvC3XWB13LaQ6m24B4O8St9Loo67nKA2ZbBipzTVwYecuri7QDAebVV7Q8QCRTIiwHv44ehwCUEheafFGnfAFjlJWA6T6E2%2FLLdT7nYdCZqGyVExbdqYxg3Jv7t9KiD2UKyWvQ3JGxKMANy2BAk2HpRTi8YPKxVt13RvqywRonDVyyQXoMPHv%2F9YEXUEjD4qRrN2tEknLa4%2FDlJFIF8R6hDt8OFp7gWlkJk1iGE2fixHUS5woWFFpsynQjfQf3qUcVKTjKmP1rvh%2BzyM4wp9151MlJffOBc5HLMq%2BZmr23G2OsM5v2KKCIV92RFx7c9cGFGh5xMBGBoLQQd524VxCLGIXTeQjR0WGYPvJkM%2Fht6M7OSVwXTvjCBgJrKBjqkAUnzhQ2vGu90k8%2BBuCwcx4XzYQpw9RlmjTCjH0DwyL0n0UNNXIYZzmklywxLbu5vbxcQbeH3Gxx2zevps4gUVzI6nIJisUoCAnOjqyTHqOMWqKQNMdSV%2FNNTW0uU2aqPlbxq3I0tx2Gq7EEjRoi33O0OI%2BhoqaJl87tvvgcZ0mdsp5jzZtzbmz%2F5uHCKQnxpZltnZgqyeJT34ohbt%2BxZEHlX399N&X-Amz-Signature=0508613e0e4aedc113c565dfe313024d8ceaaca1e997098de566520c2e7e11b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXPFCT4J%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDNPjqqh6aGFFSoef8TfM5Sze4f2dnCHBNbS7zIk0MhzAIgTLdWoasQLzGrhcPasguUIpluUp%2BxQcapvUli7RLGdT8qiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBlBAQOKmJ8NsDY6GSrcA8q2O5Lo4h2p5VrE2ABV5rBZA3mmnzfmFx9ZdP1fWmcjgS4Cy1cX1ThncQEqVjd1RyEX6rg88r76sTlt5QcQklzg68GNyXR9J1VoM0MWSW1AdgQ28zAY46ZeA8qSn4w6RY5tlvolZI8HXw2N1%2F%2BJWDAzZc08f0UpEEdhyGd1Z9BpBz%2F6HeXiEX3TZ%2FOuJEkzibY2vWpjOtVteZM4hsQao6FI56O%2B9JzVXbRUkUIdvQ0mEGfvDb%2FF0eSamWKH3EeBIbLJZuna8xCYVmF7sZTFFsHSXDXhqPvV2Bta3RMo0u7mhzyBRVHR57X4%2B%2BsiEc0TiQysjbT5IK5EQgmAqNHuYk8yHxJVKH9IRZcT1ec9xtAV78ehr9L%2F02XOoQEd3pLsEFz%2FrKG56setmigWd%2BLBY05r0gfQUi71IqsQQP6%2Bj51jJTmEsGT6P%2FzRiFoRPKnLzUN%2FKQhD7pORYGokpxLvQG8Dq%2FA8wd5BlXUdDescUO2T8ouS0NLtmTbacLM32RmWfiMrGBkcNcRF0XznlfTQX0by4DvSslLBh2bAyhk1FNy7JtjkGDnnbcj3hlUzjF7hgqYe9xo0ytzN2eBxaCi3BOoVbccS9JwUo5a9Yp4m2MUTp7kziEjT%2B%2BJFXUiPMJ6AmsoGOqUBXp%2FX862uxSUZuhQpEo6aB6iwon47BqGoaNGuvT02CDN5UK%2BHLAmRpUx5M0wt6liw2I%2BviAt2TwWi2uI9zGTSsM%2FZpEzY8udKH69aZfuXnPv%2F9Pi3HXNYN2asYreFN9W8UmfgT9rPbo%2BeWlOXCKaQTFp4t3PucUP3XYogVuMWYJOMVoJ37Yctp4CC1MFp%2BSbnOFWLVZd3kv3AwVmUIaNo35E9966J&X-Amz-Signature=64f8e1373d4a55d828dc14b0df6a73cbdfe44a657a0f9d63fb06712ec6dff3d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFH44K5B%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHhy8%2BFBqXFlEviSTIv47hJcMGkf7v9bQ60d4Y3dVgZNAiAFIRmr4I0BhWEg5aTIxgfr%2BBxTZ6teFTyKk%2FO06FLFhSqIBAjE%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2Bq9nlxipYzKVc23lKtwDSWOp2snvtEWtQrdt5Q5HK1yBQ9q8EZT3IkDNu48d2kL8GRqy2sUUsnGAxRPlsq%2BnLxnOuCKuC%2FyPI6BH2CN0oWt8jbKMNk6BLX9dVumcV%2FCPMrLt4EKlKrrD6YK0Y1EMTb8yv3A9Tnvm7u6RCHp5BMJGUZRV2634Q%2FLRtvhCR0Z%2F1nD4wSJOSgGEtfc0g3m2h7He%2FQKDvzhtDkg6w0ozmuve8JaIdRE27QrO1aWQ0FBR7KyjSR5AgPGBety9Mg%2FGV0YwdOTd%2BKfNgI10KYFPxLOBd%2B3erpV3TfHMJ1Godgo0%2BrWOXNNrt03AtnfWcSrNxdhX%2BDzljJh8ZP6Bg8S%2BdC%2FIwfk0SuWo5DhyFNJWrUnyX4pnMwb2OcRCOSfq6VrwHY9L%2FAklS4YGAIdsiQ9o7BleNPrp68hUbqJ2HeyqG8Dd4nTM%2Br5s8PvuxmFKGv1pUcJi1zUnLD3FMv7S82xK6TBRCYCeUnnV2YG8J4XJvaIXZx2D4pEYcPeCHUkGjxvTc7AwIHA4Hd8r96d7s6XnKt9erevkRa3bJnOE4r2svC3sLRPfJCAF%2FQFaV6L%2BMg%2Bef4uqzUbyaeXPHLP3Ty3TGATbXaQ1fo%2FyhJttUHp0CV5nEwTd94T4vALZcLcwi4CaygY6pgFGt1mFZfZ3DlmO8ciydmrj3n2kjsWJp65l02jBB5vJds2LPGWgmAujcXqeHH9D4yhURmIk1QUtTMQyG%2BrCDRfFMoU6scKkABg2G2PsU9I0f9czHqEFzWr2iD3wNHr9khIDmB4DqpfVCdVJ2shmcKoshKisCSk7PA52ChzcqI1U0998BSJhsA9Og8s%2Fl6TAtG8hy1GYKKAP%2FsOk5qvUCEEBvcNC0OZ4&X-Amz-Signature=bab79ec8bb2680f726afbde226a48229b0668cae4adadae4b95e66180d1ce071&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFH44K5B%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHhy8%2BFBqXFlEviSTIv47hJcMGkf7v9bQ60d4Y3dVgZNAiAFIRmr4I0BhWEg5aTIxgfr%2BBxTZ6teFTyKk%2FO06FLFhSqIBAjE%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2Bq9nlxipYzKVc23lKtwDSWOp2snvtEWtQrdt5Q5HK1yBQ9q8EZT3IkDNu48d2kL8GRqy2sUUsnGAxRPlsq%2BnLxnOuCKuC%2FyPI6BH2CN0oWt8jbKMNk6BLX9dVumcV%2FCPMrLt4EKlKrrD6YK0Y1EMTb8yv3A9Tnvm7u6RCHp5BMJGUZRV2634Q%2FLRtvhCR0Z%2F1nD4wSJOSgGEtfc0g3m2h7He%2FQKDvzhtDkg6w0ozmuve8JaIdRE27QrO1aWQ0FBR7KyjSR5AgPGBety9Mg%2FGV0YwdOTd%2BKfNgI10KYFPxLOBd%2B3erpV3TfHMJ1Godgo0%2BrWOXNNrt03AtnfWcSrNxdhX%2BDzljJh8ZP6Bg8S%2BdC%2FIwfk0SuWo5DhyFNJWrUnyX4pnMwb2OcRCOSfq6VrwHY9L%2FAklS4YGAIdsiQ9o7BleNPrp68hUbqJ2HeyqG8Dd4nTM%2Br5s8PvuxmFKGv1pUcJi1zUnLD3FMv7S82xK6TBRCYCeUnnV2YG8J4XJvaIXZx2D4pEYcPeCHUkGjxvTc7AwIHA4Hd8r96d7s6XnKt9erevkRa3bJnOE4r2svC3sLRPfJCAF%2FQFaV6L%2BMg%2Bef4uqzUbyaeXPHLP3Ty3TGATbXaQ1fo%2FyhJttUHp0CV5nEwTd94T4vALZcLcwi4CaygY6pgFGt1mFZfZ3DlmO8ciydmrj3n2kjsWJp65l02jBB5vJds2LPGWgmAujcXqeHH9D4yhURmIk1QUtTMQyG%2BrCDRfFMoU6scKkABg2G2PsU9I0f9czHqEFzWr2iD3wNHr9khIDmB4DqpfVCdVJ2shmcKoshKisCSk7PA52ChzcqI1U0998BSJhsA9Og8s%2Fl6TAtG8hy1GYKKAP%2FsOk5qvUCEEBvcNC0OZ4&X-Amz-Signature=f6ba945c8e28276613ecb2215be4cd3eafe2e4f14af084fa08f29d0a8712921c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666PKXJIO%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD7qIjQ6giasNE7KrmM7fv6AYDaHyRJ%2B3jB0ea6YoalTwIhANdPduX%2FDVh5a94zYnl1fhLGpyeAwwCbyn8W0K2EmagnKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwTx8u6nuGqzGI2U3Qq3AN%2Btx9Go8Pvalj9fPsxoiyyeWgBBPbaVEkb5hcTKhThrytIMr48sW3Ys6ilyXe%2Bt5pneQ5Ve%2FI%2FY27tfzNfcyX0hc1Ddmd1IC0otHyc0xn2FqdWDpTSHnsXkkYF1pe6k3ftMxa849okMNiC%2FZLuSO6pUa4VkspvAzBeoHhgAiBcg2t58h%2FrQ67XAxNncNpqd2uCfNA%2FjqI2QVd3K%2BK95X4mT70Tg55XOGwb0tcK0MGG%2FlBapS7Ri5KhSAsF88zQ9WgXIz0TTN%2BJZkNvS9T3tYK6DbuF68%2Fu1kZac295RXHQqWt6lfgx2NRUvL9VgyeN7LRQ2MfdkWQE4ljfJDLEQfHn%2BpI1ypvSYwgJgf%2FIJAMtHvQVUZolErLXrvJRuVSVqiFGj63IQA%2BxA6dz13CL6GLf%2F77AzjkWEqOkBMMZtv4zGBkZRcCRvOTGSGWvpfK0qrdGlFWjNHsVLK1cnbj0e7bSc4kCMHLHpKvaOex2tzt8vLs7L6KYnn%2FeHb1cVgVmqIw68svn92ctYfjWuhrubOfDIryMlus%2Bw5ATvKN93veIgON%2BSb3iGASMJofpIRmL7Vm7uwsMPRIG1CsNsIH9zPBpnatGRutihTT2aYBSREXsnJpNmOZJMge3Bel1uzD4%2F5nKBjqkAafWDxEl3FRkifpK%2F8%2B1t9HkiGtN3xaW4rJUHUWg9v8Q%2FQfoJuLJXxNlPpzSF86AWB6RGJcRX3b9HOEuezMeQ6fVJvLneA3Q56o4je8ri4bpylK7HcoCfGMPAAlIrV8QakAYp7oAXOASyq6mxq0d8MwOhMNtri208vctXvn5QAcqPNcvJSfoM2cR4Uy8Ac%2Bt2zXky4PX9W7jhkv3hill9WUuTVI6&X-Amz-Signature=ef525c9f3d5d73c0b5e29911517736392e1e6f3a082560cfd63ab2f61cf5c0fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQV3N5SB%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDhbAg2tQ3MQK9FdIBdLNo2%2FMFOBk0MWqG9gkK3eHClGgIhAL2fIZbUGVFk6mK%2FH0ALb%2BUmeFpFmmYfV8LaC%2FDgK5ieKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyWw0qZEN29wcvDcaUq3AMZtOa4J6TJ5X7aWmnsAQv%2FPFgRVVfuiXMTT629rcfmF0Z%2ByPjiZJ%2BAMvrtWNf2END%2F%2Bm7CW%2B7d8rELYvA3LocbptXmuLWUngttv3sf8pPROdh6PyBO1iu4SP0KBoW2imJtDO%2BJjbB12MYaVt%2FeS%2BhIRs0L%2BqCpKFzOU%2BHZwc5hilEd7Kty5%2FlzCPP4EFA2BOLCg3PW%2BXzJ8R5uushekZMV%2FoHmGDJZ9w%2FDZluTIfwjZA6alDC2vxMrBg1CN1MOnbjxCYe2YYcZxnoUq0xthOFg4hyV%2FYzfFoKpVg91ds5rd%2FF4V%2Bn5XYnrBQx45fOesiB5oPiBGNnKtHpVHaUwcYita24huQynkLKpA1LYuI61i0ZYNwzbVOOaFkW6fiS9HAmvl8k0kqfqA4TfQmarCwj5b8J0wIku9oVz6DgKToo6C8tmv%2B0ejhr7z1Wp2%2F45jRsPOjtIsk%2Fu%2B3Qvt6dbS5L%2FCB3rGwGJgVsPx206%2B5dFXVZHgLUHITdRUVmLzrwq8vYKFXDSpn5GuYtFclM9Jb7hl4XPd8bAzuj1b5QhhZWDo1JNh0fs9u6hwZ7g6vJrRZU5g3QkvzPxDGPkE5qGUO4mVUGL01BRgf5Xnm%2FkM9mqAv7cKonBTqFc1lpmezD%2B%2F5nKBjqkAbeKc6nWPazr754E%2ByqeXdpRaQ42Ds6Itl5Onykg1VmB1rgHKSCVqbOkLmVm%2BHktdkrOPLu2Shv3ScepG81mitIrd%2FnG5IpEVePNmJBj07mmYEHtYgMEWqZmoIxVyU6j%2FiwE8E8oyhhr50Px%2FBBaFlWqPe7diEhufU3iUZqjG%2F75Y7kPDyWNWSyqED7%2BL%2BVW4vxKx07YWscs3FORJl1jbO4wCexX&X-Amz-Signature=540cc8f9d3f3f34829e1fb9625af80cceb5816a6c5784c575da5d5894f5a6d77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQV3N5SB%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDhbAg2tQ3MQK9FdIBdLNo2%2FMFOBk0MWqG9gkK3eHClGgIhAL2fIZbUGVFk6mK%2FH0ALb%2BUmeFpFmmYfV8LaC%2FDgK5ieKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyWw0qZEN29wcvDcaUq3AMZtOa4J6TJ5X7aWmnsAQv%2FPFgRVVfuiXMTT629rcfmF0Z%2ByPjiZJ%2BAMvrtWNf2END%2F%2Bm7CW%2B7d8rELYvA3LocbptXmuLWUngttv3sf8pPROdh6PyBO1iu4SP0KBoW2imJtDO%2BJjbB12MYaVt%2FeS%2BhIRs0L%2BqCpKFzOU%2BHZwc5hilEd7Kty5%2FlzCPP4EFA2BOLCg3PW%2BXzJ8R5uushekZMV%2FoHmGDJZ9w%2FDZluTIfwjZA6alDC2vxMrBg1CN1MOnbjxCYe2YYcZxnoUq0xthOFg4hyV%2FYzfFoKpVg91ds5rd%2FF4V%2Bn5XYnrBQx45fOesiB5oPiBGNnKtHpVHaUwcYita24huQynkLKpA1LYuI61i0ZYNwzbVOOaFkW6fiS9HAmvl8k0kqfqA4TfQmarCwj5b8J0wIku9oVz6DgKToo6C8tmv%2B0ejhr7z1Wp2%2F45jRsPOjtIsk%2Fu%2B3Qvt6dbS5L%2FCB3rGwGJgVsPx206%2B5dFXVZHgLUHITdRUVmLzrwq8vYKFXDSpn5GuYtFclM9Jb7hl4XPd8bAzuj1b5QhhZWDo1JNh0fs9u6hwZ7g6vJrRZU5g3QkvzPxDGPkE5qGUO4mVUGL01BRgf5Xnm%2FkM9mqAv7cKonBTqFc1lpmezD%2B%2F5nKBjqkAbeKc6nWPazr754E%2ByqeXdpRaQ42Ds6Itl5Onykg1VmB1rgHKSCVqbOkLmVm%2BHktdkrOPLu2Shv3ScepG81mitIrd%2FnG5IpEVePNmJBj07mmYEHtYgMEWqZmoIxVyU6j%2FiwE8E8oyhhr50Px%2FBBaFlWqPe7diEhufU3iUZqjG%2F75Y7kPDyWNWSyqED7%2BL%2BVW4vxKx07YWscs3FORJl1jbO4wCexX&X-Amz-Signature=540cc8f9d3f3f34829e1fb9625af80cceb5816a6c5784c575da5d5894f5a6d77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHJUGXKN%2F20251220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251220T110043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDM1SGG1VkZhkz7OpgYeRRaQiMq6KCSpirMh1PMOVUBlwIhAPoqpZr0VXh66kzlTgdSUtv6Tk%2FRLZgZYfZi93NHqwirKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyHGvKf3qnxoiCgHVgq3AOrzGaB31hM5Nc%2FPTWRvA%2FuCwTvggcMPaW%2B6OQKbA3SmfgFp1xvgd2bEX%2BRcbo%2BzeC4PgXUQESw63q3dCkPDkR7kIGKOsi9fsjJh9ZelvGxvTBjRrPyyeIFl%2B8vEgiztSsQwKscx8toILCzzOJ5DzxMsUKjyLDLtYdjikKmRQheViqdPUtPQ7nXODV5zhAIG6I79ptc%2F%2FJlhn0Rr4kFQgMxhpU7toPGS3WPIjP96uwGnx91UJI4aI1coH7vVPezmcweTXMKG%2BAoFfVX%2BwQgV2nMcZ42EwLd0NboZvaPCDjYjyUTHOO5fdsEEqJbQw8GuJty1ugpqphQCLnGQm%2Bf2oUOAmkoElWvQUyRKkTGFMPn3OFfuWNNGp6f%2FDdM1cD%2Fperxeg3HTWsKaaCZjfars7vh2S4gItJLtIGA%2F5ykGpligpkhFdA6tsH8tdvaxH%2BTJea3FwtfL5kLrrg7QRsrpMeDeDU6n7wXHWcJvImaXfmIF2ozVmm5Sk5ZShsx8UHx2e6G9nYfBjaNqJltaWWRdEFshXBQJLXK%2BOFzLdpEYvBw7%2B3U%2BkMoXm6ipFH7qmMnv05X0W12L0EVHi7cfT2tJQf9JDfiOsKjZwF7Z9GvnZ1AnBxgu0IvEHmK74d2mjD4%2F5nKBjqkAZYOFXZAFzRZt3dKs40gklCdvVhFCg8yW0mRaq4Uk%2BFjKfmTyp1n58zclrMGe4Pw5KIunAOdJASidGMYtAhM4us9SjmjTyGO1zD0MJFqz6joQvv5spTb04ynJiQELNikYa%2F25tDzljcH2elxzHk159bMarveeYk8hGo4s4g0SVcHSZLzl%2B7Kz7DbmHHUfjmdO5hSDdSwTGfqnx%2F54J87BHrw4MSn&X-Amz-Signature=07d0b5a1a0f30826235d4fa52502038149a9a2032c76aa670d1fdaa3c6823c6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

