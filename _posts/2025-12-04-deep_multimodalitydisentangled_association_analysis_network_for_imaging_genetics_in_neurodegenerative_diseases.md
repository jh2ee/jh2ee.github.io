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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q55XRBPQ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJIMEYCIQCA506BuEZSx19ooaMm2ZtPHzwaCyPCcbm%2BTswg2OkwkAIhAKQa0SxQhlK%2BjSp1Z1Mw4r%2BAEKtH6HaTg6iYWhgqHDQSKogECOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzJ9uayISkUPZbJAxwq3APgzKq1sr91dA3mpeO%2FetFrpCmxXr7RnCQOR74zmi0Gc5wu%2FNX7ViO3768o0tBR45wVKOVBGrH0hkXNGNPFqtEnffTNshyJCWV6owbZFK0GxWxdAhjbxZhIZ3VBvPXDpDjMOdgwGk52bSltxhDTZofHN4DaJ0O%2FSMfKrfWHsSL8NbK3hn3EMqW1t0Arf677PB0FHTARB5Roq972jTKo9C7UQLzmw26LeGEkAt%2B6VlET5ZElTaR67ZzIs5H9ylyviURcC7U4cerSNcsQZAcrdiT6Pm0%2F%2Bair8dO8EFezT7WrX1pBnIJ6nLTpwmQq0nYSH1lkMl6WkHfZYKDq%2FeZP4RqvsER0PcN00HFig6WhGuzPUUeE01SGgjE6wpC2f0yXeV1gFVUM%2Bkt47crfY2GYDiQY1cj5vQkw0RCT2vvFUyNh6SCCW%2FnqzdljxnzxirH8GQyxtvbboU9tFHZr7JKHNELjUSdKfuuLaHfS32CVHZb5CGw1aMS9wA4kutgAjLfDW5JZNQ8ljKEMvFujM3juTzsuTKEzT7tY20JkvwCJD9%2FcDICWQNid1Yjz9ZH%2F%2BL7iRg%2BXxxBTaUVRQFFKlmd5f230F9MGF3pAI%2FMSdGNtpbFMc47ANVH5favOnxG8UDDtgKzNBjqkAUdTmv3S3IS4PZbIWyu4pNUTgg4f%2Fn4gWI2IwAYcHAO9H7oAFQCyrgCFpUYidv42hZamJX%2F69NHOhtaHhlROE%2B%2FgWmvQJiNvADwHaa06OPHH%2BGSR2wIitz9IDJXT3h6y%2FraitufHw4TWdxHHA0ms6micANTioX0X99GPapgRHcLrjrPeqAA0YTklHYZbho8X87eWW%2BTBuSa7yR1%2BKU3VkdbOmlLO&X-Amz-Signature=4d22adb9184dee617f1ecfd45edfe6c5e70d98de4f362fb3003d5a67cbce31f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q55XRBPQ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJIMEYCIQCA506BuEZSx19ooaMm2ZtPHzwaCyPCcbm%2BTswg2OkwkAIhAKQa0SxQhlK%2BjSp1Z1Mw4r%2BAEKtH6HaTg6iYWhgqHDQSKogECOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzJ9uayISkUPZbJAxwq3APgzKq1sr91dA3mpeO%2FetFrpCmxXr7RnCQOR74zmi0Gc5wu%2FNX7ViO3768o0tBR45wVKOVBGrH0hkXNGNPFqtEnffTNshyJCWV6owbZFK0GxWxdAhjbxZhIZ3VBvPXDpDjMOdgwGk52bSltxhDTZofHN4DaJ0O%2FSMfKrfWHsSL8NbK3hn3EMqW1t0Arf677PB0FHTARB5Roq972jTKo9C7UQLzmw26LeGEkAt%2B6VlET5ZElTaR67ZzIs5H9ylyviURcC7U4cerSNcsQZAcrdiT6Pm0%2F%2Bair8dO8EFezT7WrX1pBnIJ6nLTpwmQq0nYSH1lkMl6WkHfZYKDq%2FeZP4RqvsER0PcN00HFig6WhGuzPUUeE01SGgjE6wpC2f0yXeV1gFVUM%2Bkt47crfY2GYDiQY1cj5vQkw0RCT2vvFUyNh6SCCW%2FnqzdljxnzxirH8GQyxtvbboU9tFHZr7JKHNELjUSdKfuuLaHfS32CVHZb5CGw1aMS9wA4kutgAjLfDW5JZNQ8ljKEMvFujM3juTzsuTKEzT7tY20JkvwCJD9%2FcDICWQNid1Yjz9ZH%2F%2BL7iRg%2BXxxBTaUVRQFFKlmd5f230F9MGF3pAI%2FMSdGNtpbFMc47ANVH5favOnxG8UDDtgKzNBjqkAUdTmv3S3IS4PZbIWyu4pNUTgg4f%2Fn4gWI2IwAYcHAO9H7oAFQCyrgCFpUYidv42hZamJX%2F69NHOhtaHhlROE%2B%2FgWmvQJiNvADwHaa06OPHH%2BGSR2wIitz9IDJXT3h6y%2FraitufHw4TWdxHHA0ms6micANTioX0X99GPapgRHcLrjrPeqAA0YTklHYZbho8X87eWW%2BTBuSa7yR1%2BKU3VkdbOmlLO&X-Amz-Signature=4d22adb9184dee617f1ecfd45edfe6c5e70d98de4f362fb3003d5a67cbce31f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYRXVD6A%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJGMEQCIArPZNHxyHVdCAaLNuutpyEpCABiqWOMN8afhg%2BcihENAiAvgzme9Lyw%2BW0xLD9mTEyMZljMV3dDR4muXk0dNHxMPiqIBAjq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSiUI%2FGT%2FLSsYhf6XKtwDlj%2BCb8GYMjpVdeAmV7AsXoG8AM2TYMuslq0YQlwPTV%2FWXH6i7fHkNmg8Pbw6tsWawf96CDEthqbED5lbXBUhp%2BwqftJBAadCplutjIqNo%2F2jSD0C4MVGBRei94RXDB3%2BREjQwb9Y2DK6V%2BC62nSgBzUDQBG5MMawEllUaB014p3N5jOS4OcsCODh2GTuUMWf5edr%2FPCISaJ6iGd0LFkXARyhqljSDUodgSlWiHlOVebzeyW9IzbZLBh%2BEPIb4mrK%2BGkZxLiezi5RroKXz%2BOLHKa8TA6fxfaSaep5WEIOGq6Ie%2BO%2FfzCPIQUrzOpMXLL5H2upAUeZ4H6tWcZdooWU9dLUWCzdBLo07ydYiRwn%2BC86loiFNbJni0LzvtwEmOCh9p1QtmkbXpu6r68FJaveFsC7CvYK6lCT85vmnAWdLEI5iSJ8XM2dLFzymrgpBWwSEU2Lm0mN74hCxiDI%2FPUsHO0cB%2Bnr4sS7yQ6Zx7%2FUjgZ55wZEHdqaJPvPDkqxN9YurQbllb%2BG%2Boph0XRLkEp3AUOjJzUu6j1dsIJA2Lz%2Ffut9wAZ0HbD16%2F2xqgDtA1UJHN%2FfiKodBWAEvWnL62RrXCjMt6f4k%2BMVnoL%2B%2BFKzGcmj2KsnUhRCZXf07Aow44CszQY6pgHQUQAaS7dniPpAoebE61DAv59383yPacvHm3bSCwD7D4j2dApcUMi7rWtmLZFzwVm%2F3vYI1d%2BaNo1hEeTj3G1ZPk2uq9Etk40ReUF%2FvXHMHga7aE%2FO3pH6JDcKEI%2BQU3FILL0fGX8trAl31DCbqilr03x9oN8CBLMerSZuM2sH9EuT5tA0Yc5Ocnk4uSz8hLfld%2B64mp0bjtzXYyZPWT1h07qeS0fJ&X-Amz-Signature=78bc43335dc989366c7a61732e8551ede587227a12f01bebba6ed05977de199b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZUEEYZR%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIQDdX6cWOxpljdicS%2FAw%2BOuHW1xm7izI9YdItHGqzRzj4AIgQuSNHnSRF3UZjtOh7xlBn%2B8p7YBjImXFf7BhruhqAzAqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK3e34Z1FxUCycjSfircA0wxc1%2B0uYBeQfQYox%2F4V0OAzKg6Ne2oqpGTeKIz4bhUDgUBP9I0qItgP07nokW%2BsN0UwMQVeys6CsnmlkpeafHfIxn0Y4hzM2JYS%2By2nbojOVPaF%2BtwEgrjhYs%2FCG9VdEQgpeop9AkupBbbARa%2FqLi3QV0mjvODKsiwSb26T9QAY2cgxtBf5V6it9KZgVw3WUj4xro92GIF1DFkz7%2BgPB3QGD%2F6V9JYNpRQK82eLxmaQX0C5S5AMt7ZhMka9bPlu3KZS6m%2FMiaYdQ2TURA6YaolWI2Qr9e2eTLvI9IOjwed211rktk4aSpG9zWs0JIXVsAgts8XbSwkfhCOIiVFdv%2F4Nq6fyDpm3krGW1KJxMwfKDiwZyBv02vwsXZWWBsVPI%2FtryiMVBFPT1bnETxhJZPJPa6fuFOuEM64txxQtJDwpxitL11M3l%2B6o9NNt5H9B6406Rlon961hLNpzO2sZbZRWjuePbxWDg1xBiAsVxCbWbiDYNo8LY%2F8n48ZfQutrPkxuhHAY9gFplJYmjKjT1CorSq7U26QdNXDCl0TieeTbt%2FO9AkvKU9pWWflZ5ZKqhwjROLgHaqbS9XRcfmAmvIrqLPyEkN3d8vU9g93Qn7FvHFo2Wm51sU%2FevheMJ2CrM0GOqUBwv35SLjaXfGFLsBpXQzox4ByaizpgguzpKuoaOtLaBaLBzFeGvgT4qTYnpAAosZyaQTAbRZrr2RC5WU4l%2BNQN5hDDvHXFdHou3lD%2BLTA7GH031BL3Z2aN3%2FM0A1C%2Bx14exnOP4Xt01L2aLwepRcxHU636zboVgON5WKFrslkmu2RzRuE0rKnTg0SdvQcQ8UbnQZoBxURNQ%2FiZmhTtx2ZecFA4Lvc&X-Amz-Signature=85701749cf6f3150e3b533c4386677b6246cd7f18be872f9757266dabcc12cef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZUEEYZR%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIQDdX6cWOxpljdicS%2FAw%2BOuHW1xm7izI9YdItHGqzRzj4AIgQuSNHnSRF3UZjtOh7xlBn%2B8p7YBjImXFf7BhruhqAzAqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK3e34Z1FxUCycjSfircA0wxc1%2B0uYBeQfQYox%2F4V0OAzKg6Ne2oqpGTeKIz4bhUDgUBP9I0qItgP07nokW%2BsN0UwMQVeys6CsnmlkpeafHfIxn0Y4hzM2JYS%2By2nbojOVPaF%2BtwEgrjhYs%2FCG9VdEQgpeop9AkupBbbARa%2FqLi3QV0mjvODKsiwSb26T9QAY2cgxtBf5V6it9KZgVw3WUj4xro92GIF1DFkz7%2BgPB3QGD%2F6V9JYNpRQK82eLxmaQX0C5S5AMt7ZhMka9bPlu3KZS6m%2FMiaYdQ2TURA6YaolWI2Qr9e2eTLvI9IOjwed211rktk4aSpG9zWs0JIXVsAgts8XbSwkfhCOIiVFdv%2F4Nq6fyDpm3krGW1KJxMwfKDiwZyBv02vwsXZWWBsVPI%2FtryiMVBFPT1bnETxhJZPJPa6fuFOuEM64txxQtJDwpxitL11M3l%2B6o9NNt5H9B6406Rlon961hLNpzO2sZbZRWjuePbxWDg1xBiAsVxCbWbiDYNo8LY%2F8n48ZfQutrPkxuhHAY9gFplJYmjKjT1CorSq7U26QdNXDCl0TieeTbt%2FO9AkvKU9pWWflZ5ZKqhwjROLgHaqbS9XRcfmAmvIrqLPyEkN3d8vU9g93Qn7FvHFo2Wm51sU%2FevheMJ2CrM0GOqUBwv35SLjaXfGFLsBpXQzox4ByaizpgguzpKuoaOtLaBaLBzFeGvgT4qTYnpAAosZyaQTAbRZrr2RC5WU4l%2BNQN5hDDvHXFdHou3lD%2BLTA7GH031BL3Z2aN3%2FM0A1C%2Bx14exnOP4Xt01L2aLwepRcxHU636zboVgON5WKFrslkmu2RzRuE0rKnTg0SdvQcQ8UbnQZoBxURNQ%2FiZmhTtx2ZecFA4Lvc&X-Amz-Signature=afd6c3fd793161e118f74ee6f017e366566c0ff8cadf2c6fd42add6b2fd17f1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4GNFT5K%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIQDpJKf4hB664Zcz7jzKCtsDpQ2E%2FkD3MoTKf04wlfv4AQIgQKf8Dz7ZzY5SoVVSVF8y1hS7BVJopAlzpqDdRaYCRKEqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF1yJMdVLw3W3%2B%2F1%2BSrcA4%2FK9vcmgUb1madyLHUMiW0PFcP%2FxIW0JWGVesHXhj%2Fz%2FhUwnjEKVkDey8onLTQfNbjIF8i%2FcZxuTe3P7y%2FZqISj4kA%2FqxiuBQzGHOCPE5Si0hMkvOiIVHBiWNNZxJGGvrpkZALPvOFoiJw%2FSBLqqN72uHhUtacW1%2FLVRN6s0tY28flPwDStxgv4HLWGaQyiR9i6BeHTWnVU1n1EoRxUHH%2FeFcQKKbgphYdsXjU0p%2BQx5A82De8ZIghngUriblEVE87%2BlgMLLgurIgOTg0sMpyrM59MvAepbNgJ5yZbIlwFFzvD%2F3M%2FeOe1BJbyIV1MHqKBie4CKDwnCDqnMRy64pa8ya3PIxS%2BxiaxgRwy%2BxlkBEKooW2GeDd6MeBYbqdeoudM0Hk1jUhXaLmiM%2FP87AVJT98mQvTbjpDSFuwGkBLtO5NBuWkQwvyA3H0apSXdF2S%2FPZYXnr0fziiQ14nbtFXMPCnbYW4ZtS8eXzdRDo%2BOfxs1KSlIycQaYYp9%2BV7Fnx8Vg%2FdZHB1R2p%2FLOh5ls8uWAhy7il8tNQKwHj%2BIG%2BbOLhQlZuV6gtQcRZPh36RMuyvAWUzmn9vTD8WPzYVPIklnmOmUb8nvRaPJ24xqA%2BLS40qtSUvXxQb7WPd%2F8MIqCrM0GOqUBdgfnIX6SBh9G1igq5M%2F%2F7SOS7e%2BGxKUcmGVq%2FrwGmh8gSbEPWNdNfsF3qprCEWAKRvPXTg%2BfkYa80Hd9QrXYSR3vEEorzY3HA%2B06ygV7cFfOt9O3I%2BONC%2BC%2FVJc%2Bnsxm7cS%2Bg%2FZd%2Fxr9SQxz3H4s0ZAFNmyOg%2FcQAHSOm09jbSixC4dLHluGvWOz%2BI6GTy71Pha51DGRpPCIEW2331G05C7y%2F75j&X-Amz-Signature=2ee8c26896bfdde098238b946c87051140fedf2dc65d252633b61c49e747434a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JHU5OVP%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIQCjlZ4VhvD8gLJMBRpU%2FA5jbP%2FCnS9pIz9%2BABL3zu%2Fz6wIgE3QJB2lqL6b1pC6fTI7AvlQWMmA36vE7RYIHBIfQwXUqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCyvYq%2BVQbTKH%2FRv8CrcA7a0pLoXCuTWVmbIyDxURIe3OmrgE3JaRCxuo1UqRBrngXpjVSA9TmCjK9LQN4XFoyiZ5I9NPqXzfWiqc%2FIeGX6GElt6MVtvtoHCbwEARpflC6TJEfQzIwi%2B8d28TuN81sZJxvUBFmOrRXuDX1hc8Vrhcjav6mYPlVACfRHlo9I%2F3zYU%2BVxQncMP4kqFz5FhK7trcs8xCodJOSBA%2FYK%2Bhes0fOv1Xd8Ydmz6xNED%2BXCJ0RfnwdorAkCgFwmV3PXYXLYw%2F1%2Bg4V89FLiPB1PxogV3dbqIxphCHPf8JBnF04v6Zue5TlkJLPNJfHDhNvUlCMl6iNUJCg8Y56yq8LbvAOXHSWtpHQS3iycehaWrLX%2BRC4vJAtP5pIH0VW032WtUzS%2F1n7oKSi4hd2VCG%2BBVbro08PcrPNFyMsHz6APLgxff%2B%2Fo4eaXzMBN2unabgpaBiYKRGO47aUdPIgcUa0%2FPrL3m4cXZylAq1YzkBr7XLZ%2BAuv6xMJb5j4Wwz0jyfEP%2FNMxHjTl4ne0LWYDHAeukqwaeBTgFORpSbi42m6gIALHq%2BKs%2FThPZwhe723b6xb5gY3oc3%2BGAy8fzN1ODOxJbSu9GxbTIsLUwHYktIXrpn4gHhFguEUMXWr8FsE2GMKqBrM0GOqUBeEz9nxwViVOD%2F6qF1KbX%2BzcDTgaVX%2FOetB9gS8tDYj%2FtMCKoAVTTH%2BEbQpnp9jLSkt2gQBwnhvnPvI6x%2BzAdAaiv9Ra%2BW1l3%2FluuQmDTpET%2BD%2BAuaXCQouPSm53WBDmRKsdqQ7kRS6iv4JFL1%2FebGCrXZid8MPe9ofQ8U9JWI0NRay3HWlBwKFlXyallJcoqGLps9mWSWhz%2FUHassrIUW9jawM2E&X-Amz-Signature=d6259a83dc3eba2382d75f483cd3898ae35272389c64ca04c85c8f6ae687ca1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLWE6BMO%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJGMEQCIFPC%2Bf2YnKEXKEQBcdMoQzVASBl42BT%2BDN0QIe2p%2FZt4AiAcyFs0eHgfOt2jpviIKvhuzWzyKvdoB%2FiB103UtpeFeCqIBAjq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIuLHmeUSRn%2BO7fpYKtwDB6MELZeYjhXf2lbli2l2EG%2BzLr%2BpsVIBpYfWOuRrrdZa%2BYFFr84TK0fuWFeYClNYUPlQ1oHNqxB3dEyosKGzYOk9Ig2XVBZRL%2BewTDB%2BxtmtWfTxIxr%2F0k%2F%2FjoBMZHjGlthWuaBGhQJa3smvn8dQ%2BHcY%2FBF4cbsduo6iOS0uI%2BS1jBzISLfwdzStV6rQv%2FbjJChX7nbKLnbEVhIUWQX2PCeTjr5rslbLkAOqBRt419PPjaraAvdaSlZOdIJ26EwVh96Auvoi%2FvOatqjO%2FIgq%2F4tyVgOmWzl0dBqj0LLki5Jh%2FuuyGXJFsUCgOPNnx4Jpis7f7ImJCMEUHH5ESBta4K1BchOaamQ8ir4yNFT1oLmlkEXhUcpYklkFr2pF3HRgFnWblj6bT7d%2Fm%2Fr3JVDhZ1pwIylx6B5jObriwYjNOjrV7K86YxRle1f%2BsZTe4%2BPnNJpqBTFBByXyMctlKDtdE2DuzVj%2FTSrM%2Fjt52BO8ftY0WoTQ%2FrB7YQwpOdMjxC%2FKM3Wf8vmQltEu3j7V1jhna%2FT6YM4ecSNmMPrBzY9tV6TTowm%2FOdIViKmp7f3rRr1Gh%2B%2BZjuls4N1Fj%2BGldtYlIC0f9t7ZbiEiZI508OF1ghCKT7IDuabnsyucD%2FQw8YCszQY6pgE%2BA45FIfrKkvy33cqLITAzTveN1PwxHgPmY0UuvfuxmV6fIep%2BBaPxrk2h9YXtvIrfSIer061dKqTiz8k1zLEdk42NMt4L8cElLQRkCAes4FTJconJYFFBnzsYU86ZoKl4FhNePMn8IGbWSnCO7DjVpTtC%2BG5gkbai12hB3d%2FVHIrQXp3csOpaQ%2BVF2DFIzP0TpAKF853%2Bm%2FpAeUT%2BTHq5EZ5ddkes&X-Amz-Signature=282594087571522d35ce9a70abf118fa7427d4cae801b99a052127c65ba4a530&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z63QNCVB%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIAGfkX3hEe%2BtGCC9VoyNuP%2BsXKBgVZbDtwDpNsepcMEYAiEAmqYv%2FoVF4XCtWAYvw%2BmIZj6o0aDHVmmw72I0LdF3NhIqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAO1W7o69g%2BLcg9lqircA8woG5zB6QX6MQ2lCwKy4OUaGzlngbeb5OYwwOt2oqGZgsJA1dY8OXMO9lhBSANbRlpZyxnSe5W%2BCbnLrEFN6u9qCzYe9Q%2B4b7ECUMe0KVSBF4pqiBEWaGGI4PGEiDcLsOa%2BfulKAGSRCq0pmDScEMOKHilYMdxM4Gki05HxSrN50S78c3dNOcrFr14S2zclRqaQwoi6H5ylaIsG6hvMDqKLuGZNKO6KdJhrJ0TK6iXI8vUcT4bA%2FhOsC7PCHsL%2FANG3aPInMzdVzxZA07d2BUUvVjRpxoU4qmqQaA%2B5kdph4SLu48pD5KegQCWTmUgHjvZCYbBgIH0NGbdx2SaYhUPFDwg9mpKQd2NvZJhcNsPZ%2B10S9ATEErvlc2i63mIRs70TVHV%2FSYcXmadbiOwDO2YwW7wJcPKyOELzzgLdDuq72%2FhTnIvmpv4DIonSKXKBkDgwLy87db%2BELwn7CCTCqBoU%2B3KK0R5FTnlH7P8MJZ0i4pIA6eF49OyTjmcUreXPAuVUCK9jslgrsBnUizcd3UCQdgCzTnn6DDZr0Hv3ANqh8f5YucTtnUqHoU1r4Jc7dcDBWmbNuDlcRUhJRib%2FSmeGHu3KiKB%2FdH4NH5ncEIipZ5%2FOfh9Zap7QnYxBMLKBrM0GOqUBW3hi9yZthVUol8J3oAjxwpHZTFHZRhnU%2FkytIrHSiN7VUR3wWdwc9ubGb8vEGJ8INQl56qWUnyCry22nOW1ebZCwWyTqTvQEISGLxso0Adj%2F3BetUrlLVRzq%2FTbcd0TmArfDkSh5%2BXYaD25eJuUJjkOFheoZPVqPX2%2FFJLCjRBI0xrtHjc2i3T50eoGQfbnPrfLC538uLDZgcgiUlsFJrxj1NWpr&X-Amz-Signature=b2ee726f3368292bb3dda42549512245ba23eb3f3d50b15c48fb431f27053851&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z63QNCVB%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIAGfkX3hEe%2BtGCC9VoyNuP%2BsXKBgVZbDtwDpNsepcMEYAiEAmqYv%2FoVF4XCtWAYvw%2BmIZj6o0aDHVmmw72I0LdF3NhIqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAO1W7o69g%2BLcg9lqircA8woG5zB6QX6MQ2lCwKy4OUaGzlngbeb5OYwwOt2oqGZgsJA1dY8OXMO9lhBSANbRlpZyxnSe5W%2BCbnLrEFN6u9qCzYe9Q%2B4b7ECUMe0KVSBF4pqiBEWaGGI4PGEiDcLsOa%2BfulKAGSRCq0pmDScEMOKHilYMdxM4Gki05HxSrN50S78c3dNOcrFr14S2zclRqaQwoi6H5ylaIsG6hvMDqKLuGZNKO6KdJhrJ0TK6iXI8vUcT4bA%2FhOsC7PCHsL%2FANG3aPInMzdVzxZA07d2BUUvVjRpxoU4qmqQaA%2B5kdph4SLu48pD5KegQCWTmUgHjvZCYbBgIH0NGbdx2SaYhUPFDwg9mpKQd2NvZJhcNsPZ%2B10S9ATEErvlc2i63mIRs70TVHV%2FSYcXmadbiOwDO2YwW7wJcPKyOELzzgLdDuq72%2FhTnIvmpv4DIonSKXKBkDgwLy87db%2BELwn7CCTCqBoU%2B3KK0R5FTnlH7P8MJZ0i4pIA6eF49OyTjmcUreXPAuVUCK9jslgrsBnUizcd3UCQdgCzTnn6DDZr0Hv3ANqh8f5YucTtnUqHoU1r4Jc7dcDBWmbNuDlcRUhJRib%2FSmeGHu3KiKB%2FdH4NH5ncEIipZ5%2FOfh9Zap7QnYxBMLKBrM0GOqUBW3hi9yZthVUol8J3oAjxwpHZTFHZRhnU%2FkytIrHSiN7VUR3wWdwc9ubGb8vEGJ8INQl56qWUnyCry22nOW1ebZCwWyTqTvQEISGLxso0Adj%2F3BetUrlLVRzq%2FTbcd0TmArfDkSh5%2BXYaD25eJuUJjkOFheoZPVqPX2%2FFJLCjRBI0xrtHjc2i3T50eoGQfbnPrfLC538uLDZgcgiUlsFJrxj1NWpr&X-Amz-Signature=eae4a725039c4758bfb4c117647c3ae62e0fc3f0d9122027d67fbc8980aeb956&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USCMLV62%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJIMEYCIQDZ3cmwvSHo2bTGH7u5MAMk3m0VvmHVUXtRJ33OhTognAIhAJPKdzctGDPbd42p%2BKGCSQBup2kQfLgl%2BSTBqAX%2FLhREKogECOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxzqzm5XZle0ZIjRbIq3AOf4WFTDRGKRIfGaeC3fZZuJ4%2FhQEmgEk4H6QT%2Bele5mv9D%2BL7TLxS0ZrixzeMYp84lRurVyfo0knjup4q5DmjV02zTJjzUYHoDCuE5uMxXyk1NKzq0ZjKS7E0QKKOrl950GroqB5S3W0KvALEetA1Rifx0XNRiHhKWiQpwwBxL3YY28zAFo1kDS96VqguY2w3ZiKeGq4nq0BurextI6LOFWzSC8xhxQ3BJB4JcwbTwhevkMiF3%2Bvv7fUNJv9DBvdp7uTOW2SBdFJbgaw4Whr4Bg5aOuElPlAO4o6%2FO1VaCD2MDkohdB3GsvRuBJIWR1hWayHUWDHMwLcXC8tGzW9ZF31x8p0meccH8TfW6wAxN5E2PhteA34kS6s7MLXo8KZ1oc4GJrOClVYZ0HSZ%2FV2MJw6RQemLLvCX%2F67sBz1t%2FNeXXquAGW9oakoXxWdn5eYO05cppMKUR8xzQrn0YhuZeMYGVnrLL22KMm9Z9zCZZVGwN39SE7X3EWTrnU3basarobNknSToMFgEoOnhoWL0RBSDqMJk8kYox1Qbi5RDDXA8o4hH72YxhGXgYOA%2BCg1gw8Zn6OvGJxC2P%2B%2FvvRvXE6Nq0CMODZO4X6RdK9muBcaS%2FnMAAxabvDz1iPzDPgazNBjqkAWOqGMPEh%2F21H3nqeQ1GM03okaSnQZMCIGxt8Kc926%2BCrmT4Z90mLERNNlUongG00IzCYW%2Bzp%2Bhe%2FDocoaL7N5RdIzfjwZs77HFP8Js1iKAFCp2kBgRdeNu8DTSqqKeP4tLpsePpR88u%2B1hjwFbj6Lm9Lmgv5oZ6Mv%2BOcEQrgcW1YE4b%2FVtlA%2B8z2g0Ir%2BMztB8BVfOZVVnzvbYyh1HsBIvBDC1T&X-Amz-Signature=570e1fc0dc59a4bb682de216831b4566bee2327277d57d881d4d940b2bce5304&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CUYPU6E%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIGFy0RCxejcdUBC0%2BlafGgXhbe9x781t2ukrnkZOELQ0AiEAzUBnLhiJVNw%2FNsi%2FKdGkXNNoEbYyBbTJ9Pf2T%2Bb%2B%2BRsqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLgckSCvULMN6h%2B5SCrcA20objrnKLTmumFWVydhy4Mm7hOuz%2BHuPUX8KqrwG4S0Y5aRb57%2FdUGiKsivb%2B5y6ErEoZcLErLZCAQEgsAUBc23JDqNTKHE5vijGUZ6V8NmBrygLFdbo7dlzL5otQIlPbVuI%2Fk7N0i709I2VGXhJnDWHUIg8EYodPF8m5O2fuT4GovBVRgeLt3zx%2FYl55UeZgcoLCJc%2F7Ys6gdHQbMCdcV9V8gC7hOBMyXFVYxvHpgzfSzHEa%2Fs6xCSEtP%2Bl7YLIHFU3am%2FNPuz2jCzU8Xm%2FZGjrHEyE1QsXMGB4ummsQnuKIqjABs8DLhjdntLJdTDYqQydN0uF0aC8GsQTwX%2Boi4WDMBboXS4K%2Fgs0Fg%2FJMeKFi7T5L%2ByqLIebH%2B8Pug3uPuPI8xiIa3f2TYY4PWgep1zx8AVLbXKQuNpOWbFbwWqPivt5f5l7jMZo9UWlzG2SPLlQPybVk6vZ2vCYDLN6%2BmH79szzXeJN4%2FeFcjfe1T3ZXqSC3tEJMjEbdqqIbn14oV7aBHAqUHj7f9%2Bc9T85vw7wxre%2BtA4B2GI0Yx%2BEAY3DfaQcwT%2B%2F9uE8VK6cPdZNK97d0gCtb%2FpwWV8M7XpYhPWVhgMWlTKdHW5n0qOZSsqLPYERR%2FNZ1en%2FoT9MMaBrM0GOqUBWSJmwgCMm8h8ssIM48JPizI7XqJlU%2B6Vp%2FH7evWHa%2FM6pzOPiiE1cJ%2FhfSj9u6cL2tAb6Z8eUwjaaw1ElOld7Aj7wNlx7huNAtkrV9m67omT5QGxRpvifrNtacHFm0EVUCyR%2Fi2imUGlmylbz0B4Pa65bRQhWWRjWmtMKn59F0JO%2FvdkHMEAXSaofRnaDRRk96Kc8qj5kI3Hayy1UIVcBUvrc754&X-Amz-Signature=10319bc680d340aa9382af77569d4ccaebfc6749e55ead8252079133a9fbaaa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CUYPU6E%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIGFy0RCxejcdUBC0%2BlafGgXhbe9x781t2ukrnkZOELQ0AiEAzUBnLhiJVNw%2FNsi%2FKdGkXNNoEbYyBbTJ9Pf2T%2Bb%2B%2BRsqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLgckSCvULMN6h%2B5SCrcA20objrnKLTmumFWVydhy4Mm7hOuz%2BHuPUX8KqrwG4S0Y5aRb57%2FdUGiKsivb%2B5y6ErEoZcLErLZCAQEgsAUBc23JDqNTKHE5vijGUZ6V8NmBrygLFdbo7dlzL5otQIlPbVuI%2Fk7N0i709I2VGXhJnDWHUIg8EYodPF8m5O2fuT4GovBVRgeLt3zx%2FYl55UeZgcoLCJc%2F7Ys6gdHQbMCdcV9V8gC7hOBMyXFVYxvHpgzfSzHEa%2Fs6xCSEtP%2Bl7YLIHFU3am%2FNPuz2jCzU8Xm%2FZGjrHEyE1QsXMGB4ummsQnuKIqjABs8DLhjdntLJdTDYqQydN0uF0aC8GsQTwX%2Boi4WDMBboXS4K%2Fgs0Fg%2FJMeKFi7T5L%2ByqLIebH%2B8Pug3uPuPI8xiIa3f2TYY4PWgep1zx8AVLbXKQuNpOWbFbwWqPivt5f5l7jMZo9UWlzG2SPLlQPybVk6vZ2vCYDLN6%2BmH79szzXeJN4%2FeFcjfe1T3ZXqSC3tEJMjEbdqqIbn14oV7aBHAqUHj7f9%2Bc9T85vw7wxre%2BtA4B2GI0Yx%2BEAY3DfaQcwT%2B%2F9uE8VK6cPdZNK97d0gCtb%2FpwWV8M7XpYhPWVhgMWlTKdHW5n0qOZSsqLPYERR%2FNZ1en%2FoT9MMaBrM0GOqUBWSJmwgCMm8h8ssIM48JPizI7XqJlU%2B6Vp%2FH7evWHa%2FM6pzOPiiE1cJ%2FhfSj9u6cL2tAb6Z8eUwjaaw1ElOld7Aj7wNlx7huNAtkrV9m67omT5QGxRpvifrNtacHFm0EVUCyR%2Fi2imUGlmylbz0B4Pa65bRQhWWRjWmtMKn59F0JO%2FvdkHMEAXSaofRnaDRRk96Kc8qj5kI3Hayy1UIVcBUvrc754&X-Amz-Signature=10319bc680d340aa9382af77569d4ccaebfc6749e55ead8252079133a9fbaaa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJBK4AZI%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T182630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIFviK05HJxVmX140yOZYhPOQuizSV7FxBQwZ70y1HKxXAiEAjkfo5IDvIm4PySBoFP2zk7pJvOtVLfxnDqoTdHMGX2YqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOsDOBysnUH3obYICCrcA93wX2MdZnbGvo5DrnhbzNHxsnBWqTdDjy0foympkrMssMKsh60iyjbsFwGVIpMLq%2Bq8MKecrIvSdY00mQUGTTPyDdN3yUq91laCzlGUMgsdCaC2Br%2FCrgDofQLoRnpFbbXMqAv%2FoO8oiWuB8fOx9p7O5ab4jAZpWagSzMkVoO%2FyFAicYiDPSLGvCAVKNeHXbf3fLKPH9jTpqXOwNqKgHU8WTagN0GSgZfFAU6aqH5BvjZLFcPbMi%2F98ULJ%2Fae%2BclufZzoXW0%2BoOgLwFm0%2FoipESTgWSN8bZucTJn%2FDe9UIM6Usga1JWhKz0VwcvbWoyMjCIJo1YPaTw2%2BBjBRDUoVmJ4e%2F1vsjQwGQoJjSCgWLN%2F8tTdZyLxFfHq70pKUJ0xCHhdmAIGmiTw%2Fs57nJXuNKfzWeYzlaDC4QE2al7PL5c3orkE4b0wtDuxUJbe%2BOGOpiNDK%2Bv29MsN9kyCRsclwgcqPceusgC2Me4qbQT04vzim%2BRO7Em6b3KggAsAroZUxBeR%2BQOzBdpEVqkhyBNY5Z%2BeFIuo%2BzDLHf8kBfXsC9S57lA%2FBmS6vGmYPgTbpghzMi2V3CYkIqCMjb%2Fa%2F48O5ZV%2F430vZIE%2BlRBBH9s%2BMqF92L%2FzYgrc%2BDuXBY0MISBrM0GOqUBRFzfyX4seQJQYbX%2FMit2L3RHj1A6WwyS%2F65bPh2e8aOJYKgLhzwWLXTQBkjsLyghEZXAaP7HqAqiPtZQgtf0OOaroLbplu12QAJxL%2BG%2BPl6%2FiTpRyJ3X7SfkY0%2B9Cg%2B8VNCtf5vray1WG1Wmrr5Cfd5mwAZdlAJejr6XgbOoIhPkBPbhS2u2G3gkdLJtk3abOH2deplDdnoeKYqHc%2FgM6cotVRwX&X-Amz-Signature=57e82fb7465de114863dfc84be18f1aa3868af5927ed338aba85418d386e20ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

