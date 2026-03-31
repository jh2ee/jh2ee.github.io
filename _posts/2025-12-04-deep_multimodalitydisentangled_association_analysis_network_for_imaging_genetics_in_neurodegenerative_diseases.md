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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675QKVIHE%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCls2lEp7nguSsz0iy2pbHTufD6FUwfGUMnzJvxhKtaGAIgRW%2B%2Fj0vvHijrp3dYRrjQ4tYJjQ924fp%2FKD3reP9rbIMq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDKt9pcqt%2FjL97jd%2FoCrcA2WKdQNufm8Lx8xz5vyUzBGWvo51Mef8q5CeB3pTOiAu0adToP3uhIFSHFWCkXqIi7i%2F8ywEI4A9SE4PUxEe5qp%2BpNQzA46q%2FzSYqdNjR8%2B4n%2ByYypKnXL9%2FC%2Flj7sK6Kl3Al8bS2WqvPKNYQHXKxuCT7let6FXNkBxpHy%2FWgWGqYhc7SY8rw7wDyIYUZqOJ85A%2B6b2oVT47enjrCljyXYBAY%2BIq96GaC%2Fcu517begbSaVWsEz7Pr56r517M%2Bi%2FMv9QBY%2F00T00wWDkgyfahZ3feJugVCiD0SOWww%2BWIUbcAK4u8%2FwaCy4di2aDXS92hPuoFivxfmbQXDeLItUdNtxLU3YIAZF4E9JMLKEEwRv%2Flhg4OXOxdVwRf5rtX4JNHvidiK0tBZ5SjJG6gRTzR49yBMwSTwbS8KqhSMEqqoepxo%2BuL6dZ0YzdYWMFRx9UkoNA52U4szgT4Fgn7rdS6278BrRSvwuQ5fBuHs6MG1hQ%2BcQJyGdRLs1vUNobH3k47fCimmBGVLacMwF6Ta1NR%2BLBVfZEoi4DGY9c1AWfwqyMp7G8t4s2EcrXmC0q0omJAUtEtX4PUm8T7GGED9UeyMAio7U1Mrt7wOm9cei9P9w7gtIxNXwlKeT9HS5S9MILhr84GOqUBifX2KWe6eFjdg03JAFv7Bo4tfoNQfOfuI3y6jPbqguEcaBERPRO0hMl6vQzr2oIgoGAGhjDqjF%2FL%2BNsTtkRPYLi9ua87%2BPMG%2FgbWiQDhHtrpjP%2B6U%2B%2BgwzMaIQrLTcc0EBMNTb7Q%2Fs7HUKHCKykvrO9dMufcfScVjsJPDZvV2lwDHHnxP%2F9pm8ZRmcm%2FJRRXvFoKod8qDPfWWNMay%2BKMphkZHAxc&X-Amz-Signature=b5f1addf8d96c4a30f0628c2878ba62123807385d5d4d77b99b5b55433688324&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675QKVIHE%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCls2lEp7nguSsz0iy2pbHTufD6FUwfGUMnzJvxhKtaGAIgRW%2B%2Fj0vvHijrp3dYRrjQ4tYJjQ924fp%2FKD3reP9rbIMq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDKt9pcqt%2FjL97jd%2FoCrcA2WKdQNufm8Lx8xz5vyUzBGWvo51Mef8q5CeB3pTOiAu0adToP3uhIFSHFWCkXqIi7i%2F8ywEI4A9SE4PUxEe5qp%2BpNQzA46q%2FzSYqdNjR8%2B4n%2ByYypKnXL9%2FC%2Flj7sK6Kl3Al8bS2WqvPKNYQHXKxuCT7let6FXNkBxpHy%2FWgWGqYhc7SY8rw7wDyIYUZqOJ85A%2B6b2oVT47enjrCljyXYBAY%2BIq96GaC%2Fcu517begbSaVWsEz7Pr56r517M%2Bi%2FMv9QBY%2F00T00wWDkgyfahZ3feJugVCiD0SOWww%2BWIUbcAK4u8%2FwaCy4di2aDXS92hPuoFivxfmbQXDeLItUdNtxLU3YIAZF4E9JMLKEEwRv%2Flhg4OXOxdVwRf5rtX4JNHvidiK0tBZ5SjJG6gRTzR49yBMwSTwbS8KqhSMEqqoepxo%2BuL6dZ0YzdYWMFRx9UkoNA52U4szgT4Fgn7rdS6278BrRSvwuQ5fBuHs6MG1hQ%2BcQJyGdRLs1vUNobH3k47fCimmBGVLacMwF6Ta1NR%2BLBVfZEoi4DGY9c1AWfwqyMp7G8t4s2EcrXmC0q0omJAUtEtX4PUm8T7GGED9UeyMAio7U1Mrt7wOm9cei9P9w7gtIxNXwlKeT9HS5S9MILhr84GOqUBifX2KWe6eFjdg03JAFv7Bo4tfoNQfOfuI3y6jPbqguEcaBERPRO0hMl6vQzr2oIgoGAGhjDqjF%2FL%2BNsTtkRPYLi9ua87%2BPMG%2FgbWiQDhHtrpjP%2B6U%2B%2BgwzMaIQrLTcc0EBMNTb7Q%2Fs7HUKHCKykvrO9dMufcfScVjsJPDZvV2lwDHHnxP%2F9pm8ZRmcm%2FJRRXvFoKod8qDPfWWNMay%2BKMphkZHAxc&X-Amz-Signature=b5f1addf8d96c4a30f0628c2878ba62123807385d5d4d77b99b5b55433688324&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SU6BL35%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIBbfaIGcLbOjo22BNkHHIOmOJNmFsBX%2B060SRsrWBgGEAiBUJer1WbS8J7tj94J5pPGWh7XhJ%2F%2Ft9DDz67RiCjWyBir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMuN5ZSt4hSvprsy3KKtwDPP9EOA0Xr9bv6Fc%2FMAAy1fMn6p%2ByOhbfDbR%2Bzu0UvlclW5HP4eNHIzIA6iZvmHQtqnAmwmWIanNCuzNFh%2BaPFd85YTvw%2F%2Bq0GV2vV%2B0dxQ9o4QmHewXaix5MNYSAJAsqglekbfKMELc3soxfRI%2FtqGdJJaBINXVxFXChARRo1o9hotcQJIY017%2FtosZ4jHHdwNLSV5tgElhVkJdL4RkZsDeSgJv%2F4zKivPwTPGUHdgcf0gxmzthuShd0T7PqmwU6JrXaPHQobhfmvJOzbZR%2BWbHyp1XcMHj9o74U%2Fo6l2Ok50cIVRH9tPIWeIrdKcOCzq3CzviZO%2FjUIix7n2i7pyM88h83dm5ImWh3CPiEgdNQBuyTWcev5PBeTPBkLLzvWDK1N0ZIJc1e4Hxi1SUbdaWceP3wlZElnT1dquPE4ZoJgs3GKkWYswtvHFvy38ImlL6d9ml%2BUGEkTtYrltM52BtH25%2FeSdCJgHMmFy%2FK2Chl55HJmueaj%2B%2FsEMxqXp%2FSgY%2FWAT4zwsN%2B4J01AYbQYkSrAloF1q%2F%2B8EocPhULT7kiAJ3H6QaZVieLszPM%2BICf%2B62YBZQ3qVMDwlOfK5rQt6d8rjk9oRisILNhIuoM7bAol7qWYZFEr022sF1ow1%2BGvzgY6pgE3P%2FeQcsvsKZvjYgS9vhz%2BFKMBWmcmiKZh1Zrbx9RhHm3363t0TC1DTdNL1FaJpDaA6i%2BdcZtu5BMs2GB1J4sQDrruDtOlDO3aNNR0427LZh1HykLy4CYWNLiS%2B9OuugTOMD5szdnXybZD538%2FMmDprCXTEXGFrSjgr4oXiiI9COEgI%2Bij8LKGI%2FpDD3PI3tLa48fauuPSUwyZaNGF%2Fomj2Tyq4PJF&X-Amz-Signature=8ee578209640a5ab099b967c9d2fab83af9f3ec775e78e997957f1d32b789ada&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRJ3H2VK%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQDgPRQc75g4RS58Da4Ruw6QDUMx%2F5cXS5EZHCMYJdHhQgIhAKBY0rZPkR6pjaFroeFuPZ8LONgrumIBaQVu1UiHOD6XKv8DCEEQABoMNjM3NDIzMTgzODA1IgzWn%2BmxoTVXp7hW4Fgq3APu0Ng8KUfCKdgjEfsSrCfdrIgwBbyQAFAgbfiVlQZOegu5vfRC2PrcLylN2IA1KBEN3CR5BQcviJZ6piJznRg3QAUtvRaT7ixBZoso5vBHoxSlevD8awLy0pYf8K0B9LBfzm3%2FcqP8lguVZUz0FxOMt1tJm%2Fb2%2BFM3ree3lnyNYznICVbb0%2BFxygx2Pxezh1HGO0Wq6r5pSWlXc0T8ULHsF7XA7fnwyTpfpk4kLR%2BzY7gTxGtHMDfe0MnAp%2FdSANh7ieOl7A1c2JZLgypal1VzM%2BDEv6d5H9NJJafDmcde0jsvSrz3mEiyOpAX0TFuq7FgD%2FQd%2BJ%2Bye1s81g17OJQ9%2BR%2Bw%2F9vBd%2Fwysa8iS1h1ovNALatnnezZr1lONYC%2BLSOfTvrNPj8FLJf4GwB5JgAyMB811Alfv6V%2FWU9HFQYj7fX2yixX%2BkUzTlVZErLBrxgSYqRJN3U6Fv9JSzZMa2LqTcbFPL%2Fr3UkyDctS3Khgv1%2BftiLlwBIEB8abf5Y1Gt8q8N%2Baxt25Lyma9C2z2tas7W8C4j2peqnYNsYdIt10s8fYb27H2lbNKRF0bUk5iKZZhIK0jfp94UQ2XW6AKGzCpGJMc63reHzRr0M5YXSKgetBQwLjA1sl%2FC8O5TCk4q%2FOBjqkAV%2FAatuo82sppro3sa1X8jxNeribnMDo0vUS%2FmS8psOvlHZP3t5un4Woq4UQV6dYMBFC5Jdq5cfLpH3kWVsUARfHR3JAyAWnk33t0KkfkpzNl%2FgA8VITdGTr8IPmBeInYm516UuDsO0cUlBUkw4XmjdNnQWmJZtZ2GggkjDO1Xj8COBPJ%2FfgKFn4xFuVBecAvXsqP0yn3inA7T%2FafsViuvNhhosM&X-Amz-Signature=20227512532ccb86350c420c10a391ce945df7eb7a77b285cda0ddf90c2577f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRJ3H2VK%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQDgPRQc75g4RS58Da4Ruw6QDUMx%2F5cXS5EZHCMYJdHhQgIhAKBY0rZPkR6pjaFroeFuPZ8LONgrumIBaQVu1UiHOD6XKv8DCEEQABoMNjM3NDIzMTgzODA1IgzWn%2BmxoTVXp7hW4Fgq3APu0Ng8KUfCKdgjEfsSrCfdrIgwBbyQAFAgbfiVlQZOegu5vfRC2PrcLylN2IA1KBEN3CR5BQcviJZ6piJznRg3QAUtvRaT7ixBZoso5vBHoxSlevD8awLy0pYf8K0B9LBfzm3%2FcqP8lguVZUz0FxOMt1tJm%2Fb2%2BFM3ree3lnyNYznICVbb0%2BFxygx2Pxezh1HGO0Wq6r5pSWlXc0T8ULHsF7XA7fnwyTpfpk4kLR%2BzY7gTxGtHMDfe0MnAp%2FdSANh7ieOl7A1c2JZLgypal1VzM%2BDEv6d5H9NJJafDmcde0jsvSrz3mEiyOpAX0TFuq7FgD%2FQd%2BJ%2Bye1s81g17OJQ9%2BR%2Bw%2F9vBd%2Fwysa8iS1h1ovNALatnnezZr1lONYC%2BLSOfTvrNPj8FLJf4GwB5JgAyMB811Alfv6V%2FWU9HFQYj7fX2yixX%2BkUzTlVZErLBrxgSYqRJN3U6Fv9JSzZMa2LqTcbFPL%2Fr3UkyDctS3Khgv1%2BftiLlwBIEB8abf5Y1Gt8q8N%2Baxt25Lyma9C2z2tas7W8C4j2peqnYNsYdIt10s8fYb27H2lbNKRF0bUk5iKZZhIK0jfp94UQ2XW6AKGzCpGJMc63reHzRr0M5YXSKgetBQwLjA1sl%2FC8O5TCk4q%2FOBjqkAV%2FAatuo82sppro3sa1X8jxNeribnMDo0vUS%2FmS8psOvlHZP3t5un4Woq4UQV6dYMBFC5Jdq5cfLpH3kWVsUARfHR3JAyAWnk33t0KkfkpzNl%2FgA8VITdGTr8IPmBeInYm516UuDsO0cUlBUkw4XmjdNnQWmJZtZ2GggkjDO1Xj8COBPJ%2FfgKFn4xFuVBecAvXsqP0yn3inA7T%2FafsViuvNhhosM&X-Amz-Signature=8d87a9f63e84c3b465dd14e7512e02940fa36aa8e8e6a68a89589908539dac70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUXFZV5P%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIEfNlSbVwXcQaqSZtBbF7drF6rkv%2BB%2BdRqvp%2FBAP9FEVAiEAim9ryHYDScUgBxQSRM8uxnK7z5UHcS6dL2TZV9wIE0Uq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDNFfil8jjR20SsPDYyrcA3mPUPzQyBrrLV7kHH44IElNj6MoJb2IW1aKQYupk4gEr5Ar2xQyW0yXE2xJYVYYhPVyB7PVBlCKjx7lgzY9nKNK8%2FyD4Fl3YuW5e1UjPzSVCPm%2F4sqsxO1OGTPSUSyamQ6YM4A4s12iAYVVdzLk0z21ANmmVecpGwmOvwxM6VUPfrG%2BSJG6pI%2FiQDBnXWXBq4DwjPHSSSP5mWPew8P9G%2BhKbVciwsV4j8xNPX5v5QMret553dnSpqRvDRaP%2FoHlhTP4jy2ahZ1TXcvuENWqJ%2F8R5tcoAo4UZg9fCcNGwlUi4NtMV7pXjSoiRvVKE3bRW5cfLK4UFnH6EDJy0sKe96R06xcqPDYLmbXBO86Y1qERFFajaneBgd7XOkG4oQB8EkcKHymGNPLsay7AWtG2LyF8zFZX2J2VvnHWPP8Lbhis29vxeQ4YAQ34qFd8RdsM%2Bg8yFQfZs4hxgNOpzVCIT5AesXCJGC3Pf9NVI%2BWEGNoqpxIfNIuKb41BApBdgw7lhBNtcH0R93TxplwTau2mNnKk8gHOFaFT3wqmAtnAP%2FtC5AlqCrGdAYrKTv9okBN%2FGVdug%2BvzfWs7vywFTjNBXd8ndlKUdGm2RDpoXXeMedatMSaXX7LyHRYiod4cMIjir84GOqUBpAVuOqiuNdYBn2irL0F%2B2G08ROMop%2FqvjnspllpZPH2GHXjCSn138lXfNqD3YLf50jD2CxtH2Z6uHZL97fYajXccMP5RRx%2FowpZrfuA1STYIQI%2FQDghdFhIt74xK7rQHbaGR0Z0xXTGAvif875siQ2JvrKWyZEzwrfhzs4fnS52kvRBJHiECdzc7Sv9EgTUC1tjswzYQcQtInX4HUCLT%2F293IggW&X-Amz-Signature=defa9af949f1b1e9b90c5e795080b2ccf1209696c4debf152e09904ea7692f1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ADJEGPV%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCICd2x%2FmqnI6Q1tCobH77ewj90O1VFzv5%2FkbcJ6Yi60CNAiEA7a6yhAPSrFXhksdDSLvwpqB5KBKaDH8BngqxhKqP0kUq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDM9%2BZANsbuadtrnIzCrcA7CUGHiNVcypwVoPZGhHnGt4NVhWFVJmEk%2BwY8ArK6r7Xgh8An%2FjViGgmdNsvd9tUHriBfWCdSFblFxt0WD0Ap4jttQfUCBmbXCOZUVAMOnKSF53MBVSp5qbOPlezp0OxQiEqTzP8OZtS9qsfwIjp53rV4HAPMpFY2oVtsYfpoAS6MoY1v3b9UvD54u0cU0m5KtY%2FOnWlCmrN7B0VP32rVezS72N5%2Fqu3303chh4lxwqIFH%2B3ZHXVUCkr3UKIR9bVL2CLmqaPPR0V6rWrjlpCNpz4X0ep0vdrfchJcptP2A1AajVPtd8i1cumDdSEOkEJYEwS3hjvMQS88xQ%2B0VSEJRvNshTsY%2BklQbWm8s%2FpBbQteNa%2BVxdXDp%2BgXyW%2Fp2sjJtOgBU%2FeNVmaaL3CCTTilHqkGExF%2FckZHWKM7KeR9HVgg%2FNgWknhNAs50j8nmxvYegfkpt3c8sXUHHdK3dLQbqK9wStXZ4OOrBn9o0JhS5hzoJyTTjGUNSDLLUHgjHe46WlGfhFCXGIbmB2OQlPpfeYVlFBAI67JwG4m1QwsExlmlPatC6Wpd8U7pF7NEy586EA0HwvVBDozDsnb4iYxpE4NA7YomTwVT21Kl2Af8dO3IduDKu%2BcjZPR1orMNXir84GOqUBXMgqfiIlNKLAQFkeIIoN%2FuaLiFhJe7urf8Z5NhpmeBV0KbAhM1phm%2B%2FtiCH9JhLhdT06PoOv2F92MkQ%2B4IUpuchzheSFniCTmjw8DvYTbeHtxjy9uC7w%2BLqhVx1e65gYrqBLG1RSHC4IbeMtvSWvHPmTjl%2FMO10g1n%2FE355cm4mlAgbK%2F0ZVysuKB2lZqdwArrYZxz8TiBpbTQDPLJxjg6q73KNn&X-Amz-Signature=e4971e4481e4fe337229112c079efac10a86dae5f11c1545c55203aeaeb749aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZULGYVA%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIGqKZlOUD%2BJlA9MyTMGa5CWpTmAsBagmSrtzsapd44osAiEA2iYiTANHwtMtndgt9mndVpqW1GKIVZjDr7smQgJZxf8q%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDGMUh%2BT25UiHnMgT8SrcAyo3jkJX3aU2NDHtYVfD1%2Fo4MgFW%2FA1hjIufPEIZtl0wO3FJOWsycFDYEXYwKF07WV1rvycXDSBdW578BRnpBe5DRTYDePG5ApYG54xwx8gWsRsOe8dYKXNEPQSp1LiFL6lqxKC9FZ2QUUrRyUHI0igpYSqEXKIOwyzlAE52tiU%2Bp%2BlS%2BqMYe8H6iFZjKeDyiEG74IhGH8SSXEB63fhJKFH8flrUU0kSypiKH%2BWT89H%2F%2FUVM3K2MG7UobAV28YwOdEQ2gWD5fJjjOjm41AZlHQRwabdExUmoY3ZCk4wH7QjtFUHEmRKKRuDS92nm2K4nUKkIFbasSGap0rJHRfznOMlFoPBF8c2dZOrU9NxJBALuEQ%2BRlYX%2FhpEe3OGfRiUgsLF6qUaNJJ1Eb2eS32EQWQ1mkgJvg0OmDg8W7MUEvaj9%2Fzx6O62XmpN9LeDXhRsMNg8SU7GXcA%2B%2FktjA6BbAC0IFZAuyTBNs7n7D67Yw07oQO%2Fbv2dJ0RNz4HUoTOO7gbHIEhUGhHLe%2FyXN%2FZVWa%2BsXMIYaPQkjyDRFHqJPlMo%2F%2FEoYa%2Boe2kPWHyDEMp%2BKrs7yspQF%2Fzifi1eBJI%2BQLKCO698qID8RVye8zBvSHrbjU538bVdQ%2FOcpPVFnbMKbhr84GOqUBs%2FUGR7Nby4Ew2mL5ZucuAAiqVe3VFHLqXii3pBcnaZH7GwLW6LSSUxKQ9OH9BEuXt0nCq%2B0v8R72aUVAFgtkKTX5SebWZ%2BYBYb9qztiMMhREfTTGVlWwopjEPDzOlVMsYaisZ6toX3TUdt9ESvBHoKrswGBcBJWWnbCtDsQeKdYebhY1aXDvgYJ76Fg5EZINUWPetqAihC9T7L%2B0cTQG5bHWobwz&X-Amz-Signature=e67ac890b192f0ede4a51926ad43b2d7ae760860f144801eaab0da7be4c9291d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TD25VEFN%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCIGXybBnnyqnZUcaLu0oEwpQ0GO1CRyw3ODIuheDaWOgIgV7ah5lxqlB8XqovDMZG0QsyOy2J57the4UkViRxlFJUq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDC5QALVKdA3Tci7A4SrcA83eXQygRo14ihzgjFO%2BEZprWWS4jhYeApGAYau6vPbnO%2BlMme9KLRh7KNL2Z97Jf0dDxnl%2FvOoY4vFr3VKJDPg0JobP%2F7z9oFKX5MVq6MyCzyzdnpPHtb0CkjEBZkNMtw0ZBCsw68Q6TMWkZmN9uzuv0dehlr7l7VZlnlEBgXrdd%2Botw4uDfqDPYx2yl1l0QxgEBtMhObsqDHirjg2IJZ0ob5QZmTDNLXniFlpPL5Qq6jjTrzuuh1cf82Z8drM2b3xOdB%2FJMchejd9c3TnzMG3dLG3PjbYIEQCSNAYl8j4GpCp%2FqsqKw0jvhO5QxCkPjALky%2BrKd2dHoV0ppY9ws3x241BGZe0CzFyh%2FMtobGdEiR2LEj3LJfeBPiOsKXyDGEwvJOOwfXlQRm%2Frj4a0ynYUf2e6XQFekYbLb7h%2FuX%2BZC8FbsMLh5KOq5t5lTHdCqihnUyuXnSLPb9uDYICPrlOiES%2BEB2ARz25J00CInkhN0gFFXdMw5%2FC0p3J81botq9jTCykrzHtoAwrUVYqrdPeM5h1Z0FDupzH00VrQBXB%2Blzwy2fHLUWjxnTE00itt%2BIxCIQyAqkghQ9JSIFuxaCV%2BRFkXDfuI1sytx1jJLZYErhhtQ3RSD62sfC2UMNnhr84GOqUB1px9iv7CAqAUZS6ig7ItuxuDZvV%2B9M6fr9QxCG09ZK7rkOab6rBvF02phyNzYiDyh14qHkcn9EhDIgNPPL3wf2WBIVMfJYWJx3VfSR7869FUGBvd9jXCN8fb6P1mop63Ft5yYIeY6HMry095s5rYhTL6vNgHCX0zXC%2B%2BE4CVZnUYfByzeSjuzDCRBH4G%2ByiCVUSvgBV4f0COzfa9pbfL1GEsa9zR&X-Amz-Signature=ed2526a9446ee0f96ee69e3c945d32d199229f53f290530d406482037756f579&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TD25VEFN%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCIGXybBnnyqnZUcaLu0oEwpQ0GO1CRyw3ODIuheDaWOgIgV7ah5lxqlB8XqovDMZG0QsyOy2J57the4UkViRxlFJUq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDC5QALVKdA3Tci7A4SrcA83eXQygRo14ihzgjFO%2BEZprWWS4jhYeApGAYau6vPbnO%2BlMme9KLRh7KNL2Z97Jf0dDxnl%2FvOoY4vFr3VKJDPg0JobP%2F7z9oFKX5MVq6MyCzyzdnpPHtb0CkjEBZkNMtw0ZBCsw68Q6TMWkZmN9uzuv0dehlr7l7VZlnlEBgXrdd%2Botw4uDfqDPYx2yl1l0QxgEBtMhObsqDHirjg2IJZ0ob5QZmTDNLXniFlpPL5Qq6jjTrzuuh1cf82Z8drM2b3xOdB%2FJMchejd9c3TnzMG3dLG3PjbYIEQCSNAYl8j4GpCp%2FqsqKw0jvhO5QxCkPjALky%2BrKd2dHoV0ppY9ws3x241BGZe0CzFyh%2FMtobGdEiR2LEj3LJfeBPiOsKXyDGEwvJOOwfXlQRm%2Frj4a0ynYUf2e6XQFekYbLb7h%2FuX%2BZC8FbsMLh5KOq5t5lTHdCqihnUyuXnSLPb9uDYICPrlOiES%2BEB2ARz25J00CInkhN0gFFXdMw5%2FC0p3J81botq9jTCykrzHtoAwrUVYqrdPeM5h1Z0FDupzH00VrQBXB%2Blzwy2fHLUWjxnTE00itt%2BIxCIQyAqkghQ9JSIFuxaCV%2BRFkXDfuI1sytx1jJLZYErhhtQ3RSD62sfC2UMNnhr84GOqUB1px9iv7CAqAUZS6ig7ItuxuDZvV%2B9M6fr9QxCG09ZK7rkOab6rBvF02phyNzYiDyh14qHkcn9EhDIgNPPL3wf2WBIVMfJYWJx3VfSR7869FUGBvd9jXCN8fb6P1mop63Ft5yYIeY6HMry095s5rYhTL6vNgHCX0zXC%2B%2BE4CVZnUYfByzeSjuzDCRBH4G%2ByiCVUSvgBV4f0COzfa9pbfL1GEsa9zR&X-Amz-Signature=3a4e6b328d8a2068222bbed566bdbf872093863deae63c13382c7d22696581ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKPQUBGU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQCpTTP%2BA%2BnKlNCtWdaLHJMFmbeZyrtgBDOdnuWcAUaODQIhAJQRcCTIFQOlcF0uYxdKnjyl6%2F3367BlFRtFYI5HFuIqKv8DCEEQABoMNjM3NDIzMTgzODA1Igxp3cslx8gH7rx2TXUq3APdjqbipxjo3oRTuG8QKGw1df%2F%2FYpTpYsrTUrBvXy5Z7sVQl%2B8vlAfut3hsaVmovz4J8P4BNNtCBZlnuI9eSR43T5Tip3BhK5teFvxnq2a4nIL2muIMoumZinrgecg3wx7OuKHm2NSXe%2Bc0iee9c%2FjlZtdkA3HIlOdRgw1XFSbyxMi7rbCUs42tpFAZTf68esRy5BkpVZRhjNjSgMCxAH3%2FFN6nqA9XNst7hX2dDyW9tEpJZa8WRbr%2BwjG0mppFdflmBTSS0yEd14Nxite3P3dz2NkN1G9VptryLwEreGOvQYFd5ONHLyBz3uBT2E0r0vvpTkQPuZu2XMMlZNA5xCESAi14P%2BU8pZgHlM8JmS4Kvukq%2FlZyMRjplz2XKoNiyiAWW8a%2BkW6CMeKvUj8mrHZqTV3qtn5pWW%2Fvfvr1PxD7MB9Wr0JPxLykVinN61x4lqN%2BGHpZKAWCnxfHqWS%2BTxA0UgEFdF2%2BJqwAQrgyGpPp0RFwGZhqerkcOKtRpwuKQdFzwVqqI726isO7OCBJidG1BSEJ1x6gXe%2BrnPQB3p8Z%2BPGfC5RzyzewuaybCnudxIBgNN7a3oMB1XHcPYEh%2BYwgtkSa4y2Dj5pgPhUTEM9nyNFzfw9FNet%2BBdsUGDDU4q%2FOBjqkAYBLoSMBZyMyyvQoSqJ%2FjEbYUGh34viEyDu1w9Fn80r5%2BihMYCZ%2Frt8WTAtpnlrhFlqHFkVmueHoIfKrn9%2B329Bv3g90xjmpEfkuBgGsFxeTAKmy8kH2fJR6oAlCTKiF%2FqHGh%2FDBYHab2q4GfkslSSYXLcMlkjsXAVj%2FfdRQ1rcPIUn6HzCMQcHhckExwlKmQbXpFNIHyNxv75WA1AQDeeH%2BhD6v&X-Amz-Signature=0af22a3ee6326e11c96b4baf99ebc93a43eb1d34331a1075bf1523aa0fdb5c49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RS3FGPVJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIHuR4UwXM1uhVIN0uMl%2FksBPEY0CWJLJ1ZK45cAGNrTAAiEAtHE9RwmzpujSvcfLXlFXZRq0h7os6JsMLen8d615p%2F8q%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDJz2UrRJITMPdR5PdSrcA%2FvMKWbcjWLanOkrGYMq%2FPlvNkTebO%2F5wuG939qkv64Fp5dI%2BUgVQp6qh7sb2PV79Tseepl0IhOiuEKUDvpLL5Lo8gOjbiz3uwnDGS7ywg76M48P0HL0s3y6mtoiM7rEJ3i4gJBQ3%2BTPYWN9SjiwIxqmGWQv8s6WvkllY%2FbMLJbmTZ%2FXOl8GJ93MT1m4uRtbtfms4FV%2F0Bk%2FDd%2FSIEu3X%2FS90RcEejtDR%2FLCtEjW5P0EBaNTVS4Evh5XBpzVhOrHop91nbKkdF%2FsGiBi4C1OnYxzrJ0m5WcyYfns%2FHU7VigWmb0ZW0Qpi1diUt2BgCJvmHlQ3l9%2BJ%2BWcCehkgur56E5%2F%2FRc8dbGROhBvJF0GopTzj0kmC8xkGiQP4MuM5BxgfXgmvphVILifeoQnUI4Adr2xuCOd8qkhrNVuUXhqxhxI0DBOcTl7ac1kviygoA665GaZGWCmowqOqmOeYiTlIlK4kmmst8q9PL%2BCqwC4%2B%2Fw1Fm8gWoyiV%2BNf0Dq6UKJBH2z275pcbGut028%2BGlSUOeumeGryMJnoIxiO1tPtL%2BPeOCFUYgVUwMX4IaMSH2EPyHimGbazADUYYW35gc0tYwL4whIDjh6mxh%2BEOHY8eQ4pGkad%2FBO82bVz8cwdMJrjr84GOqUBzNro3psnGSOLpFkBBte%2FyYDPC9lS9cQ8AfFwzWGO%2FV7I0yu%2Fd%2B7oeORxKyyE3xR9DvDIDvQGyFN%2FM5vrG8R8esTXKZT8J0kWFR%2FBBOM%2Fft8iA8mqIwjeg1kpf5B2i%2FzjBoBca1gH5pK86ESs%2F7NsHLydC6%2F6dEOvDG%2FfYHj%2F1K6j4QEMbAeawdojCAkXqQ%2FQBY0pnW81POtxMpEzc%2B340rXaFwRl&X-Amz-Signature=c202b797b761c06c4750a6f9d7e602bcd55b6e9b3cf8d77b8169718209d4b4f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RS3FGPVJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIHuR4UwXM1uhVIN0uMl%2FksBPEY0CWJLJ1ZK45cAGNrTAAiEAtHE9RwmzpujSvcfLXlFXZRq0h7os6JsMLen8d615p%2F8q%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDJz2UrRJITMPdR5PdSrcA%2FvMKWbcjWLanOkrGYMq%2FPlvNkTebO%2F5wuG939qkv64Fp5dI%2BUgVQp6qh7sb2PV79Tseepl0IhOiuEKUDvpLL5Lo8gOjbiz3uwnDGS7ywg76M48P0HL0s3y6mtoiM7rEJ3i4gJBQ3%2BTPYWN9SjiwIxqmGWQv8s6WvkllY%2FbMLJbmTZ%2FXOl8GJ93MT1m4uRtbtfms4FV%2F0Bk%2FDd%2FSIEu3X%2FS90RcEejtDR%2FLCtEjW5P0EBaNTVS4Evh5XBpzVhOrHop91nbKkdF%2FsGiBi4C1OnYxzrJ0m5WcyYfns%2FHU7VigWmb0ZW0Qpi1diUt2BgCJvmHlQ3l9%2BJ%2BWcCehkgur56E5%2F%2FRc8dbGROhBvJF0GopTzj0kmC8xkGiQP4MuM5BxgfXgmvphVILifeoQnUI4Adr2xuCOd8qkhrNVuUXhqxhxI0DBOcTl7ac1kviygoA665GaZGWCmowqOqmOeYiTlIlK4kmmst8q9PL%2BCqwC4%2B%2Fw1Fm8gWoyiV%2BNf0Dq6UKJBH2z275pcbGut028%2BGlSUOeumeGryMJnoIxiO1tPtL%2BPeOCFUYgVUwMX4IaMSH2EPyHimGbazADUYYW35gc0tYwL4whIDjh6mxh%2BEOHY8eQ4pGkad%2FBO82bVz8cwdMJrjr84GOqUBzNro3psnGSOLpFkBBte%2FyYDPC9lS9cQ8AfFwzWGO%2FV7I0yu%2Fd%2B7oeORxKyyE3xR9DvDIDvQGyFN%2FM5vrG8R8esTXKZT8J0kWFR%2FBBOM%2Fft8iA8mqIwjeg1kpf5B2i%2FzjBoBca1gH5pK86ESs%2F7NsHLydC6%2F6dEOvDG%2FfYHj%2F1K6j4QEMbAeawdojCAkXqQ%2FQBY0pnW81POtxMpEzc%2B340rXaFwRl&X-Amz-Signature=c202b797b761c06c4750a6f9d7e602bcd55b6e9b3cf8d77b8169718209d4b4f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEP27O5S%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T164401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIASyWnSuiJybQo751DmreOcG8NuX%2Fr%2BVIPsXDC2VwhA%2FAiEA7nfzN%2Bd5A19UpFIEtxpGwrLKTBi6%2BnbQnybD5ZB%2BWIoq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDM%2B8jFWUJtxkxqdjNCrcA8eZW3BasojUsiGb2cxq3VXhfNDyC6Nc6nHlnD1LZqZj45vdYLverINdXPsg5nXlKwAtMV%2FPTOMJPxErSK2u1WZCq4aaQ9vYD5pbFpsS28Dq0%2B3Q1qbUsgGrBMdyPTP8njCTjt%2B4KjvZ0v3KGWXrFzpakI4jUsA9xKcrCsBawTt1miiD1PsL3T1RL5902Sc4n9LPRYYiAzWlntI8gzpjRSyDAQBIM%2BP%2Febnkjdyg4BKSEJMvOqzdQWMDIsD4NsdE2Nv%2BXK6QbMzHem1yjjt5ZwmYw9j%2Fi8WaSxiMSBsO57LehPCxeTl8neFaj6a9TyuZN8iKIMdHHcZ0BjGcVViVoDSXUyunw3SVywTl1MX8Q%2BGbaWzippJkNH3ZAgDGOI8x4WagZSZ61j5C8ahcT7574nBgAsjPIU%2Bz0Q%2FNSaGJGk3BLQ%2FnuXS6E9XppPi68%2FPjW0qQeGHsjFxJEHQm2idwXNHNKUKDfHjkgERIr4oibcegR1eWnpKCv4QPznzt5pmcbpFX5VHWYK%2BqteCGr1vuBU3JdBkxhcKj6%2BJasclkqLyO0dzy4x4P%2F5n8mmbGcqeG29YnIW%2B2GzyeNU9W8riP3%2FHYxvqzZ9iG8x4JxVemc%2Beif%2FRxrlvPCeBqO77zMOjir84GOqUBckU1DJrINlIPCB%2B2dbXkSB%2FaPdN%2FQGM0%2FcmaYtDN49%2FCSJuAJUAr%2FnFnTXvjNAv6GmnMghCQ%2BfYPrbNBN4c8flWqaaixDpgP%2FKjUjvVM8dgaQGCMC%2FS6g4S4rQTCTJZadZAxeffCENVBEUJcGTJAi3soqgIYW%2FKYxpA0z9Y1%2ByMoJXIZQ3lIHvV%2FboYonAmVb9PQ5GMy1Qgfq1asMS09bMmy6rfb&X-Amz-Signature=916cbbf40be592c94661c2ca4fd394575471b6673e6fc05740d22bdf89fb7681&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

