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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K2WK52N%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQCNuHXYXtIuRKmoHQ6sngT97j7uyUXDEVAnM3NvGsKjEwIgJ9%2F6GIWYu96h4nc6X%2BK2RX6kHFSyoZz%2Fi1s01OKS9lwq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDBSZXjUIPYcIwnjzSircA3c3Hav22YJSSeVDnhecj%2FFutf2YWhAEHbZbfz0IHosZP2%2BIaz7hrgCgWW8IaYRHqJcsD%2Bfe4r%2BfrnapUIqPC1mt9Ov0BaxaLHTA5lh9FuNKz5ApFBqLSrEWLar2oN4%2B%2BsvVFP7%2FJ91T8%2FnoQhHJHFiZjVZH5M43KHZEdrIwo1ocxQceEQFLt1ku1I6TvQjWqtcAVj7MpXTweCvAazTy8ogKBwdLRfe%2F67lJSV0Wo4KCn4dkZCMVnoGQW7U3Sr99WRn0aBf8iFUeU5rzYA7e3fWd1IezWQEcr7y%2F4OG7Ejl1pGQz3%2Fu3S%2F1gfCJyEqgSbWfxvxM0bSDMQr2iGXKJ0IWAauuo8o2DkzF1vh2ofdTYHZv9U%2FrWUCst7OY47x2Lmm8SM8gu4Es072M7qJMzKcIDV77d8HcjhL3UG2Fm7rCnDYRs9ImyKE%2Bb4P0vvOJpoK%2BmmcdTCEWzwsqy6TQiOE9LmeJpvFWGc9kv%2BKa4AZ%2FG5TZpUY9tZLwpSIy7YwlYXV%2BP0aihyp9e8NTv%2Fai0sxrvKeic69j1zD89xO%2Bb0Vy0Pmrmz1GXdwvE6sQYZDRL91AcnaAEqJIlELL8gIz2QuQWHv8KhfvycAYaFsmWHn9W1LPnPVOZGughK5PFMMbGv80GOqUBao%2ByBqNqzPfxKPDKQF5zDIzAz%2FeJ36ds%2Fv06sPo3MuizKt5qn8Vaz%2FQl1aTDTHWNXGLPaQ00kFZLzgod8PN7AwhLnN1mBtGLIa%2B7WMA4VPwaT8BbZUyc3X5MNPcBV2EaNfOehHHNa8Nb87hRnF8ECzxucY17AjOeMC9cH66%2FMBonvb1FCEUKT1ccEClZslACme0Am%2B6OD%2F%2BolVoG52J400d9l66x&X-Amz-Signature=a671a8e8849301bbd2ca83096a712f8cca71fda65f0384bc36a0082079267bbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K2WK52N%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQCNuHXYXtIuRKmoHQ6sngT97j7uyUXDEVAnM3NvGsKjEwIgJ9%2F6GIWYu96h4nc6X%2BK2RX6kHFSyoZz%2Fi1s01OKS9lwq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDBSZXjUIPYcIwnjzSircA3c3Hav22YJSSeVDnhecj%2FFutf2YWhAEHbZbfz0IHosZP2%2BIaz7hrgCgWW8IaYRHqJcsD%2Bfe4r%2BfrnapUIqPC1mt9Ov0BaxaLHTA5lh9FuNKz5ApFBqLSrEWLar2oN4%2B%2BsvVFP7%2FJ91T8%2FnoQhHJHFiZjVZH5M43KHZEdrIwo1ocxQceEQFLt1ku1I6TvQjWqtcAVj7MpXTweCvAazTy8ogKBwdLRfe%2F67lJSV0Wo4KCn4dkZCMVnoGQW7U3Sr99WRn0aBf8iFUeU5rzYA7e3fWd1IezWQEcr7y%2F4OG7Ejl1pGQz3%2Fu3S%2F1gfCJyEqgSbWfxvxM0bSDMQr2iGXKJ0IWAauuo8o2DkzF1vh2ofdTYHZv9U%2FrWUCst7OY47x2Lmm8SM8gu4Es072M7qJMzKcIDV77d8HcjhL3UG2Fm7rCnDYRs9ImyKE%2Bb4P0vvOJpoK%2BmmcdTCEWzwsqy6TQiOE9LmeJpvFWGc9kv%2BKa4AZ%2FG5TZpUY9tZLwpSIy7YwlYXV%2BP0aihyp9e8NTv%2Fai0sxrvKeic69j1zD89xO%2Bb0Vy0Pmrmz1GXdwvE6sQYZDRL91AcnaAEqJIlELL8gIz2QuQWHv8KhfvycAYaFsmWHn9W1LPnPVOZGughK5PFMMbGv80GOqUBao%2ByBqNqzPfxKPDKQF5zDIzAz%2FeJ36ds%2Fv06sPo3MuizKt5qn8Vaz%2FQl1aTDTHWNXGLPaQ00kFZLzgod8PN7AwhLnN1mBtGLIa%2B7WMA4VPwaT8BbZUyc3X5MNPcBV2EaNfOehHHNa8Nb87hRnF8ECzxucY17AjOeMC9cH66%2FMBonvb1FCEUKT1ccEClZslACme0Am%2B6OD%2F%2BolVoG52J400d9l66x&X-Amz-Signature=a671a8e8849301bbd2ca83096a712f8cca71fda65f0384bc36a0082079267bbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPHELERA%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCNGcZDb2P8VOaTVE6gZgSmicc7DOylMktHPrseLUO6%2FQIhAM4jvbi6BQ9Y7jOy%2B%2FKbB37Azg%2B7ubnMMDVFi5QgIvDwKv8DCEIQABoMNjM3NDIzMTgzODA1IgzkjC8Ey0ODXtELmGoq3AMHZGKFpeq08ARvZ68IyuO88VyhSrXUF6fRw%2F94MUluO%2F5pqTAE8IrV%2FcjNM6maFvmvtEz7RWwDttEDehOyrw7LIwJjOl8K5SFSSYtuO0%2FKa91sAgSCI%2BF5fvkFq0kTccYUJtEEDfiKhlolpbWQ2wRYDqDBJaMLYyeRplsWYIkXlMuRow0ChpvTbVyq5VM3cUzHmDtR%2BFBnXrB86Y4wL0vwtQGb9QbDMO%2FxCaK93hmv110T2iELUlXk6bAvMNmJ4y15Dl%2B4p%2B6I6A%2FAV%2BTIxxN1Ad1RiPs9vN2l2SeAIB7n%2FuIMAnMNukUQraQv76rnRJkfWTrJ1Zn26BYjKzJtPw6IE%2F3tdwbZyPvdkPpS0k%2BkZs6wakJu6RBsfYsPrdgV9mUYHw2jSNk72g2wnHQr10TS0rrfrcR5SJm22%2F7BQXOhueEPvTHrkQeGygKjfQmUlVuZ%2FTuQqRfwvzquubOwjf86AU%2Be%2BNJunldxK4%2BFp6HKqBDgHpl2SOhCe8kAWkMwDGIb%2F9fBfxc5vNmTJej1ZyyGOU0z4zUdaA5JxexHNfqVNwd%2B4OuypYZjhRuZ6irC2SqMJ2DuxmZir6Pwy5ubimhHa8YViSTyMGOVIdGN351%2BDM7Qu9Sh823PYH7KrDC0xr%2FNBjqkATvMJ6ZQA409R4xO2LEyf2uQv3hWMccyue5%2BdNI1LvoUKoqky9ONEiLgY7mQuEA1vfhX1I%2BM9TvhtI8bQqCqCcI%2FKwsZ5l5y2kTNzmfnq9nJ%2BnggVmq0%2FLGc%2FcofLTxZ0L%2FoDQ%2BOwwbGdgXWjc2ED8k91Dl1IaTJnPU4v4xFFW87knXveRfOu7B0EGsXFtixJwZG6C3jYop29HSp%2FjQsPUHlg4Sg&X-Amz-Signature=f54f8f3a7e6eb70440a8e70a69c164a1a7fbb4f996acd388769f220f3f7d0f3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUNLOSAE%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCICLcj98qqkH72TIWtzamA%2BuowJHNcYbergl56sdsGwzhAiEAzUh0%2F3XGmXuhrCrhnu0xPP14XbHDXM%2Fg2nWXfp38v90q%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDKuZK91AKG7ZgSA8EyrcA5ywFRqv9hsWLlDGM4WH%2FZv67ib9IVoYQmdCxcfigVNuvM9H%2FbL9WmIcSbSVTDSEVr0Jx5ZnKuETuml3X6BV0ZLEP0YN5R3MF605p2fX4jDqZSY8JgBGiSqVD9KTUpq2nIFpOGm3mugd83deSEZmQbkNxWDGVcms9lM8utFlntiERypGDsbhHwlBjWXjpevxWQ5euyX1XpENM3KIz92FFOjvjpm2SIzNpvBlVBTA%2F0cb0qy9eWGTBO0wOTR5mZnAo84uyQLGyMPGaue65XRRbXfs83qrVVs43HuzA8w3SRtZEbh6B1IrZ6H2MqlMiT5Gl0I5TyIhXI5FXprqw7TBS6HwfqtrJEdWh2xrw2fwHKC2JqtL1Lxe89aU%2F8iZ7vttTO0XViDLvh3s7UV9whH4bZ7PbRiBH7t%2BevyhSGvjPEFHv%2BMQ1tlNsfOoCQlJthHQrr4WNmpNzC28VBHWZl24UwgkNbV6tKw6R4Ddv%2FKzus39FfbKf4SK5smp7B3XSvEsi5WfNH499x1sQ2lI4tzBxPRIh7WQpEra9ECoBZxHFjL1dU7HeQNZKtzVVRVAHj9OvSgqCautYRNMHz%2FD3fR0V%2F69B7K3qcDxJm4uGSZexh%2B2VJImcHRprMWvx%2FEdMITIv80GOqUBdG3x6%2FehV3%2BxDmINjSXiqeoRTCSmRVR0TS2ThhRbxIKLz0878Q3lTyX7OUZZdJbdQc9%2Fq4vEy5oS%2FRxJpDSKpsoZl7735hUltUHN6ematZNbJW1ZWXQ%2B9TR8a7%2FEZ8OBu4uqfIrlizmqSxINq9w1paebQhbTO%2BuVveQ8wct%2FPQWKr1Z48nFuOZ8UTgp4kfM0bquck3EvtefPZpdiy8xVUt98qCfC&X-Amz-Signature=d6956542a81c3c90a59e032f99c2cac16ad62a9313acc358fcf24f4f9057b513&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUNLOSAE%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCICLcj98qqkH72TIWtzamA%2BuowJHNcYbergl56sdsGwzhAiEAzUh0%2F3XGmXuhrCrhnu0xPP14XbHDXM%2Fg2nWXfp38v90q%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDKuZK91AKG7ZgSA8EyrcA5ywFRqv9hsWLlDGM4WH%2FZv67ib9IVoYQmdCxcfigVNuvM9H%2FbL9WmIcSbSVTDSEVr0Jx5ZnKuETuml3X6BV0ZLEP0YN5R3MF605p2fX4jDqZSY8JgBGiSqVD9KTUpq2nIFpOGm3mugd83deSEZmQbkNxWDGVcms9lM8utFlntiERypGDsbhHwlBjWXjpevxWQ5euyX1XpENM3KIz92FFOjvjpm2SIzNpvBlVBTA%2F0cb0qy9eWGTBO0wOTR5mZnAo84uyQLGyMPGaue65XRRbXfs83qrVVs43HuzA8w3SRtZEbh6B1IrZ6H2MqlMiT5Gl0I5TyIhXI5FXprqw7TBS6HwfqtrJEdWh2xrw2fwHKC2JqtL1Lxe89aU%2F8iZ7vttTO0XViDLvh3s7UV9whH4bZ7PbRiBH7t%2BevyhSGvjPEFHv%2BMQ1tlNsfOoCQlJthHQrr4WNmpNzC28VBHWZl24UwgkNbV6tKw6R4Ddv%2FKzus39FfbKf4SK5smp7B3XSvEsi5WfNH499x1sQ2lI4tzBxPRIh7WQpEra9ECoBZxHFjL1dU7HeQNZKtzVVRVAHj9OvSgqCautYRNMHz%2FD3fR0V%2F69B7K3qcDxJm4uGSZexh%2B2VJImcHRprMWvx%2FEdMITIv80GOqUBdG3x6%2FehV3%2BxDmINjSXiqeoRTCSmRVR0TS2ThhRbxIKLz0878Q3lTyX7OUZZdJbdQc9%2Fq4vEy5oS%2FRxJpDSKpsoZl7735hUltUHN6ematZNbJW1ZWXQ%2B9TR8a7%2FEZ8OBu4uqfIrlizmqSxINq9w1paebQhbTO%2BuVveQ8wct%2FPQWKr1Z48nFuOZ8UTgp4kfM0bquck3EvtefPZpdiy8xVUt98qCfC&X-Amz-Signature=cb12b9907f4d1cb69d1b415cbe6255a280b9c63681f35e34239fc9cff5fdd458&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655GDPUV5%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIGCNueehdmvYrYW0%2FfvII55rKX6CkB29IYQwYYsnHzneAiAPoc%2BlejT1wFi2WrrSXMnhd5VLr9KvW4gg22SIlcrz0Sr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIMXLdY%2BsxMwQfe%2FCmWKtwDKjZQenrWUx79MadEAh8tdUArOhD8uIThFD52L5LIz0Ri8T90eZbMSQXCTAegdliOm6Ar3shraxc33eu2mkBkDxBvDSvsnG7Roou9KF19FgOEAo6Jmz%2FK8kIomuo96Zzsu15PhRXakx%2FtR6Cj%2BTYkXFbZ3RtaqL%2FOJpbRWkltXNpLaUYEpLXSlY24jRR1RpP7K7reKcO5qGroYcPxVuwuyjYgYC9wTcwqFfxV%2Ffe%2BsKUAnezCwKRzqVgMS6yzcsJbXF7iQFr8crMyYxpEPB5ar7BWFPCD%2BO4bJ1UR6fsPwjdgCbPbnmk6fZvQAJhgD4hPqTyGI5FwkXkOfeHzE3F1Tb6NTOzNSvFUMPXdWnAdFxI65Az0MVTw%2FsSgfiJUAHxeMFRzMbZC1J%2Ba7hOQT4KTulvpFgdaG7Aav94ZlE4%2FKH6sc1IRKhBDCIkbfSChccteeU3nppCq1T2yJ9g5cd0so40%2B5rXD%2F6NIxMcoOpG6InsH7ml561t9zXh1EjxmpLUB%2BtYGqq42GLV1ZZ4hg6oPGYC6C%2FaV4pW%2BuUTu8hwyTbUmDJhKSEWAaPHUmFuhzNAjXEKGltZ5JLKH3hzSEN3HVl9xCdhwLgjZupNpkvSPJk0bkUoBGtG6APNBMS4wssa%2FzQY6pgGkPtGN6CnIOZAWVIOLBiLScMKuDb4SmVmj7sBSitaGz4tc3nlQmNtBrTwVRRwV26m8FasqnNUTKjHQ6LOez5P%2BUo3%2BlZpxerxoo6lFGOZgmAmW9%2FagBpqsF26fnb7KH%2Fd3adNM4Rl3rP%2BFZrJf14mwEZ0BhMniXmcg53Vzm1W0j5rXTg%2BPGRT6wRTo9SBjQ6BpVtnHEeUHXLFSxGN%2BfFzvTBUGCpFH&X-Amz-Signature=d96e1b1ce9a907b67facb877ef7c24c1c405d507f027c3e5ad64b211da074857&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BAQJCFA%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIBAD4tvdW0eEtht%2Ba8GHZn8mcDNoIlU4EDaScunLM2OVAiBNwfz6mcfpG5TeWdAHZELjGXNJ%2FExy6nr7HlzU08hfgyr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIM6uQpU5gjnWiF83xmKtwDthymt3Z7gTb7EOcDSTeGxmS3DzAPIFb3uJdiKWla%2FviuzavUlK%2BAzpavJIaWmucUiKrp4fJNm8vH6fSmNRMb1NuGBOGAMgMzidrYRBL%2By90GQdkm3CKG6GiRIJL%2FZIJ%2FTv3ESVDPVoy10KsHKsOfoFhLGMlG5o3trP0z%2FuCcV9YuBuKgt9bBj2mHM%2F4yU%2FRuFjozoY54SSDZ4JYuyYmIYiQth%2BQ%2BW%2BswzcD18J%2Fd0m9uMwEP0EVzm5uN6iEgW4GBBU0fSsVyZHji%2FKMtBdFbQB4PMlTOXR%2Bn7m%2FJ6P8w1g5hRE8zh1zo1zBqmIJzSe9nKIhceM01dNiqvunCymbqDENnvuUFp0Gj9ulvyu%2F7MxWU4HTRh4KYwZ22SpAH7uOfb22MDJ%2B%2BdXYsGdGaE%2F8QLD%2BfbpFNA6g9s1xKR5dQ0ddfMS9%2B1sLL8WVpFPP7%2BE0LQxKKBgbKBhzglukANJYv4V1F%2FM%2FI6zKnW79LqtX%2FlZojgh8WRwdszxlFk3J2%2BAJ0x0qd8BQo2QDrRXtcAQYg6eC%2FNyCYX16gBbIXpObqU1tOjkioQ4uGqF3%2FIR2IjPnDyY6IQBym3CyZzkXLM2LPqED8F44nxYbDYNJ%2Fd0frloV%2BFHIz%2B4Fe2rk28H4w4ce%2FzQY6pgEVJ4lOfE%2BLCk%2FPkiJtC0dXlQ8t6Ppdyyga46Ko0FBPKi81%2BqE1T6tWNigDI%2BlK3ogR%2FXiXligvwWXfH6eB1z9lb1rIDUfO9QEh5UWc5NjWcdmXTGJ2s%2BRYM42UnwQWdr3cMX0xmHEs9L3diqBw6yys0qUjTOm3YQ2UbJL%2FPGbDdFeQoU3iNUJbypq9bVoNAugz2Dah%2F5mVsz8597TnTdkwkYfv4OVG&X-Amz-Signature=9860d8b0a42fb979357226381fac52d6434f48de57e4abac1e64ff0cd8cf3d2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FS53UM3%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIHLzzoEEO%2F20FeswWhLRu9or8nrIlWWe1XgSbiKtmMLlAiEAtojamhAr%2B%2FR7Q2jG5rsCWIDS3y2uB2jb2Zf3QfDtuAwq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDKE9zKvZNMqUeJG%2FWSrcAwMANAyIgiyURuRdZzjWopwgnn57WuCS4m7Q8G%2BaMRQ0VPGqGN1I5mittNvsZsRRxq29l7lEPCICi6kwc7eaDbyZWridfuQdUYE%2B0ChZjjWWZ%2BnqmO3iWerUed9kWi9N0fOabg%2FOsuIYd5Z5GGTIVTJm6%2BkEqT8tqsnYAIpEl6Jzk28GIjtTWjB4N%2FDaImlw5HzS0a5I9uO62VBMtmSxV2drdccGolhwPKxSqAViXPV97MmncsSGhOqTRBFzIUN%2FbSGWhEAwCtJT4LOCPoVsRFyBzD2lYKFfFDm1qcm%2BdmptmlSd88G7azMNvyeqln52HGDOtU68ChiwSea%2Bt3fItJw25%2FYDD2Z3aE%2FZfr4w%2FtX9aCLJpA0O03sAlz445QkTTCAYZjloGO8mT6%2FFXxKizXG2jSQpc%2FP5MazaH%2BtVm8NE7XrkBFvi75PLMyBz1djaiq%2F07hl4Abo%2FMO2GsclNhu6BcAFOgjIKtE%2BbxWRzorw6EHS0HMmjEBfcb9OSLgnDJCFiNFM8luWzWBVWkTF5egbk98oysg%2FAOBxKJQ6h97Zl8GeqEggLOIV6A85J5Ijlkhc%2BWh9BRzwHcA0DIVp%2BBe3b%2FO%2FNlk4u0HhYZYabKflvxftAC7IP190ZEdeRMOTFv80GOqUB4%2BEV71YRMh0MPIOmVlTWAC57me5TyOY3UjKVm%2FiLip%2FnCS7ftAy%2BM1DTlZH8vHrsJIYApbXTBA7PI4pKNUoUi9kUaNvP%2FZqBv3S0HEjggE3eQrZxtOioM%2BpjyjRpPE5Ql61Xg9iupsuOIX4DRyExoDiivZmUcT8NtWoFw%2FCFqPJUh%2FKxxA4hefyIUK8PEmmG5%2Bo2Jo860NGrTEBI6SmhBLerX7MQ&X-Amz-Signature=185833ad7366ec83e88f704f146ac7c135ac591bfc8e2b033735c3e368e077e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEE6LQSG%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDriu7aFgGmJHLh1te7CwHs%2FJnwE0z7YDW7dndLqTasngIgT8yaraoHPmPkurMgnQjmmv%2F34%2FkrabGy62S%2BSLmySMsq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDIya0tPdMN%2FU%2FfW1kSrcAxlz60%2F80Zid%2BBDklJkITYnegjlGXucqGhXxAM7CDft7OtFeV0in8xAvQmD%2B58PXuDSR%2FaUaOGTh0QSjMbtMyLdY%2F6hFvpkaokjFJ2nbQwatGU3Dgun5tKwUs2SPh6rtacDN2cdfJ%2F4g%2Bbad3rsQA0f0K1v3s1NLO%2BSk0HziP8l2SxyUKXUb7s%2FYZa%2FoC4MaE6C5PJbfVgRJxcUwSyCFOOmBShNEVF%2Fp8yzGYR0P7dpnO8tvM8Jjz3MF3UAV9f8TItI488pjBwLDy4wQcoXK46XjH95YEI%2B%2BKL1IUmrh4NvS8APFttaKTOQ92bo8DV4SXhiNuPQroQkDlaM%2Bs3N7U5%2BybBNbkiPOaaYvRaIjHymbVL5E4T639Qrv982zfvCE9lbjhVQ6hB85q4cYmSTS%2FkbytdTKTu7mN7AVhptlCjXaQQ3Z641OhtqFWfpJtP%2FFfSXMRNqH3RA%2BUzuQyZCvMaq%2FXyfPKMq44N6mDBdkjA6uR%2BLlvzDqK7S612mtApLqtqUEMAMuTlN8AMQNSMEHVPwlZsqmbnsAGqRBdlgmfxxJdysJt%2Fm2fNlR62WkWo1xUbOnRRyeu25COxUpS3YP4ETaiZ%2FZ2JRfTYMoBxO9hb7vVVJPGqHU5nGc0nvgMIzGv80GOqUBYhLAlLan%2FeSzTiFNAeNyR3yEiutvHfMlkLk4wKJ3AXGrOC33QS7VcJBg9IiUB41hKqHP79AB%2FvkhrlNnom886J63gAZfMtC3Mhd1grtiR41UH2gggjoowP3vXNuRcAbIAcm4ylVvNAmg12VbOWk%2FrlUdU3YEGT18JTagM7dEh97WjEFXoOLeXjl%2BKuYg%2BQV%2BBXte%2FCizHQifJp5Eh9emq0seL4MB&X-Amz-Signature=db4e62432b850079d10c3f4910102a195cc82c87cd5d62bab625cc1d6490ad96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEE6LQSG%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDriu7aFgGmJHLh1te7CwHs%2FJnwE0z7YDW7dndLqTasngIgT8yaraoHPmPkurMgnQjmmv%2F34%2FkrabGy62S%2BSLmySMsq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDIya0tPdMN%2FU%2FfW1kSrcAxlz60%2F80Zid%2BBDklJkITYnegjlGXucqGhXxAM7CDft7OtFeV0in8xAvQmD%2B58PXuDSR%2FaUaOGTh0QSjMbtMyLdY%2F6hFvpkaokjFJ2nbQwatGU3Dgun5tKwUs2SPh6rtacDN2cdfJ%2F4g%2Bbad3rsQA0f0K1v3s1NLO%2BSk0HziP8l2SxyUKXUb7s%2FYZa%2FoC4MaE6C5PJbfVgRJxcUwSyCFOOmBShNEVF%2Fp8yzGYR0P7dpnO8tvM8Jjz3MF3UAV9f8TItI488pjBwLDy4wQcoXK46XjH95YEI%2B%2BKL1IUmrh4NvS8APFttaKTOQ92bo8DV4SXhiNuPQroQkDlaM%2Bs3N7U5%2BybBNbkiPOaaYvRaIjHymbVL5E4T639Qrv982zfvCE9lbjhVQ6hB85q4cYmSTS%2FkbytdTKTu7mN7AVhptlCjXaQQ3Z641OhtqFWfpJtP%2FFfSXMRNqH3RA%2BUzuQyZCvMaq%2FXyfPKMq44N6mDBdkjA6uR%2BLlvzDqK7S612mtApLqtqUEMAMuTlN8AMQNSMEHVPwlZsqmbnsAGqRBdlgmfxxJdysJt%2Fm2fNlR62WkWo1xUbOnRRyeu25COxUpS3YP4ETaiZ%2FZ2JRfTYMoBxO9hb7vVVJPGqHU5nGc0nvgMIzGv80GOqUBYhLAlLan%2FeSzTiFNAeNyR3yEiutvHfMlkLk4wKJ3AXGrOC33QS7VcJBg9IiUB41hKqHP79AB%2FvkhrlNnom886J63gAZfMtC3Mhd1grtiR41UH2gggjoowP3vXNuRcAbIAcm4ylVvNAmg12VbOWk%2FrlUdU3YEGT18JTagM7dEh97WjEFXoOLeXjl%2BKuYg%2BQV%2BBXte%2FCizHQifJp5Eh9emq0seL4MB&X-Amz-Signature=cc63f93a76303ba85d593ea72f7d3a77191bb2353b5881c5b14537857fa7df8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YXF2ATN%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIFZTtkmjm2h74J%2Fawug293EgVdJ0MmTjSgccPTr%2FizvoAiBPaJdN0zkVitw99fKhZXb8FwuSHYFxF3Vo6OVrBrsAtCr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIMV5axR%2FxQ8KyqgTI4KtwDpoOKZysvn6e0K5CoJ7xNo1owFUdeaHV9HAjmZ5Oy4YLO03YaSkZAPjPIeZ2vFv9FKebgDU%2F9fWauFmGFgq7mLGAgazo45D2PyfMN0AKcR8M0wP2tfZjuqjYjS1L0djcoHLyZblbs7PATTwvuIhBGRVGHFfWZVaKRqzMn%2BicJZZrA2DN6PA3K7tvCmLXizSRY8cfgMXg%2BYR78b7ZBj%2F0%2BR%2FdpGJ11n2xcqSp9HP2HCIL0dJXvTFZS877G5GhioeQBHVKC18XVG0HqIK6gJCu4jLNjxu%2Fme19aiGUN8q%2FXB1JhOzt1VlENRSyaBp2lgTM%2FFZuXuBm6dOm9ULsWDnbri1L3C7%2FDkwq64TxHyw5tCjZ%2BBGyZgPnwmlKEfURAGAMWeaxhMBHJRBot2EEEUYfvbztqw0Xzd6eZaghOvj4oJ%2BtiFSrkog%2FvAOoAHGUEQEfXLY%2Feog80gk4KGYpaOtaUAhQu2ghe6EEvMfYzLqsgyC8cVnKXAYuZTisa29%2BsjtdEvJOkecq2F0R7jns0uGwxQk24fYFotAKa1HzMKHDQvEfT%2BisHLoVbzWLF2TFNx%2FgI%2BZwe4BPphX4QWQCI02QCpa8w%2FljIBaQGBt0wwnNpXAvotONnighl3OPx7kMw2cW%2FzQY6pgFsg06hGz%2FUYiKMmoANnGd9i3ngj98zJsy%2BAAjTGgkUXge36Zb0H3xq1%2FgY555Y8ly3WgONQ4Vp8rl2SKh4z2%2Fp4uvoDSMcmq6ELb5WahN3pbmdmuiTxVgmNB%2B6JKwagWK4LGIm1RVik3l7G%2BXcL5B7EjCC7LQXTNJkuZnYO%2BxVrUxKHUjOZQ0xoI1al4aqJL443aV2ox8Mmtd49csFac5%2FXHsg0gwT&X-Amz-Signature=9c85f429e9b89cf7630a098c0e55511ce01e55c0dbed7cccd1deca2ebcac42a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPOGWC26%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCMPpAlMLz9CWXUgRwe9zSEUwNsb4O09lDDlR75MChhsQIhANodhZaGysoNmWdsh1x4vyLQFOeEYxWmiHY%2BLjnFAk8iKv8DCEIQABoMNjM3NDIzMTgzODA1IgwVG6G1DB5ZYP2nLC8q3AO%2FxlCzH0VbZKI4jXC9lDfQbLf87wcULuLXHKcHU8YKAbE2TKQWr1eHVWJybojNIuuJ4VT2f8Z9DxYFxmYVzpVM5WihoGvsVTKLy48aD7RvHYRQilCWDrbvh4qEZMweVZBe1bRIvMCX8LsN6KpjpCLRWA3YDPQPUuWEaFBGqO29YA2%2BYow8S%2FW%2BvTYqsxPIcftGVbVmqGU%2FFAZGl6nfNeYuoiUWHRWmumnhpQ7IBEsKTRWb%2BML1au7rr6Qy2iYAO9qbATGXt5NjVGkZrpvg7qEn7i5mXZpPGX8K1G1kesBG9S7fUsMqkNwOSJZk4DThy%2BBFnRijLKs2j4qAS3Z%2FVOs5uxdf11iqAFkg14b5Nx7mAa2TGb3hvoF6Jusy%2BO8B6fx%2BFfHwwJmp6rPRvgItNvQwmK3BUqh8uJrUq1XJZySauwyBHi%2F%2Fr%2Fz2zNpNbFkokiejNPE%2FKgh3CYqE8Qjgl8475Rk%2BlGr1zHKOFExs00DZdOL3f4Tvu7NRYOU8sfsmH0uYAa0O5q9FUueAZ7pci7C4djsQ43SrO0RKdT3WAkJoRG6EYVb4oXzDZahmbXOQ%2BkA7zGgs0hKjLgWjUF324BICRlsN5K8ujMIXTlYlbgKfL%2Fwmsttwpzl%2B7FVDFTDaxb%2FNBjqkAY5Tu6pwYad02EdxVGomaJSLJJt60iabT%2B4eAUncDQ29Rr%2FLNgWpZJQQqebJ4QzFMEG8cLYZ%2B%2FbqmZ2q4YMsJswe%2Bp%2BdhrotGlpKe9UbTJROaj5l9PoOe%2FkL5EKXOn5MHzFLfs%2FW8IdpTpbqajwdiSWg2tvK4sXfcEZJDq4NXEPKE3z1lNEqyCIz7a49FRfKIZZOvAlROxC43mcd6Hdqe9isa6WX&X-Amz-Signature=63dbb1868126f8aca7acf21cd2bda799282128becf4a95a00aad0f45d8f811bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPOGWC26%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCMPpAlMLz9CWXUgRwe9zSEUwNsb4O09lDDlR75MChhsQIhANodhZaGysoNmWdsh1x4vyLQFOeEYxWmiHY%2BLjnFAk8iKv8DCEIQABoMNjM3NDIzMTgzODA1IgwVG6G1DB5ZYP2nLC8q3AO%2FxlCzH0VbZKI4jXC9lDfQbLf87wcULuLXHKcHU8YKAbE2TKQWr1eHVWJybojNIuuJ4VT2f8Z9DxYFxmYVzpVM5WihoGvsVTKLy48aD7RvHYRQilCWDrbvh4qEZMweVZBe1bRIvMCX8LsN6KpjpCLRWA3YDPQPUuWEaFBGqO29YA2%2BYow8S%2FW%2BvTYqsxPIcftGVbVmqGU%2FFAZGl6nfNeYuoiUWHRWmumnhpQ7IBEsKTRWb%2BML1au7rr6Qy2iYAO9qbATGXt5NjVGkZrpvg7qEn7i5mXZpPGX8K1G1kesBG9S7fUsMqkNwOSJZk4DThy%2BBFnRijLKs2j4qAS3Z%2FVOs5uxdf11iqAFkg14b5Nx7mAa2TGb3hvoF6Jusy%2BO8B6fx%2BFfHwwJmp6rPRvgItNvQwmK3BUqh8uJrUq1XJZySauwyBHi%2F%2Fr%2Fz2zNpNbFkokiejNPE%2FKgh3CYqE8Qjgl8475Rk%2BlGr1zHKOFExs00DZdOL3f4Tvu7NRYOU8sfsmH0uYAa0O5q9FUueAZ7pci7C4djsQ43SrO0RKdT3WAkJoRG6EYVb4oXzDZahmbXOQ%2BkA7zGgs0hKjLgWjUF324BICRlsN5K8ujMIXTlYlbgKfL%2Fwmsttwpzl%2B7FVDFTDaxb%2FNBjqkAY5Tu6pwYad02EdxVGomaJSLJJt60iabT%2B4eAUncDQ29Rr%2FLNgWpZJQQqebJ4QzFMEG8cLYZ%2B%2FbqmZ2q4YMsJswe%2Bp%2BdhrotGlpKe9UbTJROaj5l9PoOe%2FkL5EKXOn5MHzFLfs%2FW8IdpTpbqajwdiSWg2tvK4sXfcEZJDq4NXEPKE3z1lNEqyCIz7a49FRfKIZZOvAlROxC43mcd6Hdqe9isa6WX&X-Amz-Signature=63dbb1868126f8aca7acf21cd2bda799282128becf4a95a00aad0f45d8f811bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XLADIEE%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T102534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIGRG3DkokdafaqautysnyAaombDV%2F8KZKrbFDAxOyEzJAiAjy0Uk9thaOH5EvA9cqexbnLzS21NjdttL77vU8%2FZQuCr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMtXIZntDZQ7z6MiEAKtwDAuK78IJfPRsJRTGH4fPNJHOcEQRT4PHfuEibLu4n3Jjp04MGvqxn24366HiDxCBwjt%2FGXqAob5spnlbMcvQzdy4U6sLyPHgEkUzxaL%2BSpW7XXe0SUPGUTL8QXAL5LLzmusemfIEPJzPvEezb1dGlt9APBTSTL6NJ%2FpElu8t1mJwE%2FCl1M2hLCr8kdJ57m4laX69nGTl4D8bgc74z3%2F2x%2F42gS7Tcg25wJMYFD%2F0u2q8c8b3XeSkAFd7D61HxCVMfe0n7pRm6W4fcA4VwL%2BS1IoLj4I4Hf2U%2B47qn0Be1NypGq34gavjUZLQAtZLRZ%2BE5yIVRJrywb2XH8s36FVlGIJN74xjsNpSjM1jinZMh5wlloQM0NCqtC22oEj5fb%2Bggzal5aEknzFcra%2FePs3%2FjAHMombO%2Bc%2FXCi9Toy7wvXgVW5WZMd7o2JVly8Ouuu2%2BNMa2FpczV5yCMqNjQhXmYDWTmZjzi%2Fyx1DCClvn1dqRYkOtPTtVgDlToryX94DTjSQx1S8GwIJzXuygLIvH1wVYWjN0V2RxjF46%2F%2BfqvCCYN08IQOXWQhw5njyV2SUs2H2jBZgcaKqbPYVFJG%2BwrtO0a2tSEO%2F2doUf%2FrYYnEdOaDMbZzoWaIrVLGByEw3ce%2FzQY6pgFYCeDeOgvV1dB8Bx8HrvpEHaMAz5ihyphgXvzGzc0t4vGNPK5ouiw%2F8GizDh5cweL6XUCZ350%2FEx8S0YNtQ8aqRYUajyn9SmN6RHgIpicB7IZNUoZpJMB33HkiadWVz47%2Fb%2B4DSG2Ju4dPiqgBwk1JwId5S0LLSyzuSLyxJHFWkBUKNR2xEOgzUSwBewDQGGXWKBRQuPkOd2bf9mir0JNETAy%2B89mo&X-Amz-Signature=273603925547fe938a98753cf6d973be280504fc2a9d5be884d19911fbef037e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

