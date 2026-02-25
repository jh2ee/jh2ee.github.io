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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5WZ2CEX%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIGhbPIUtgMv%2FJ90a0CleXVDsqPDaQPn8PbozDyEBSc3nAiAKQv1VSlHg%2Fa8VBPRGERo9dIuBlR4xdlelodSiNt3Vxir%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMTEgRtKXlsVxStD4mKtwDav9A30H%2Frmn7ORhzFxS9ypPkSCvQxYyJcwMD4dmJle5u8Ss%2FFwm4BVdFdd9WJ0EyA42Ts2vVVGX0j2Ke1uH7MdWE5dUMbDU3kt49j%2ForXQIOLu5I8r8rhdG7IssBBTHk877Qn3ZCOx4fUXFji92Zm3K4kwnJWRz0Bt08L3wZ%2FN9U6jHCAE0t7nMRXjWpTFX6HMiaoXEXdz1niXqIMGhTSpeXPEHNt%2FZdf%2FcPOrimhLuXE1MCmYdgVHuUt3sjDRT96y7Cpkzb8pmPjeSDYsxnJAODmZJ9EJjO364uETKd2yWjSISEfFmCtaqyMEFmqZulh%2FW91KTjS7paAtZgK5lb3OD9zQQyBIzGO%2F1PVQzzDN%2Bm0u%2BBiUuMqHvTb0CpofS645a8ZG%2FoZLaCYR5MyqT7sLX%2FP6xXeLgt%2BJZvsUDdSDSiphoI8rPB4254zkBzkQsk3%2F2wyI2lTHrYggscOcDmjAPnLjDzqt3P97Rw4Qgi5QZ%2FcnIYbcFpWqFpGCzpXcfABMs7pCW6CDDUVm24EQqXz2OhwGKosa%2FUzovw%2BFSaDQ3Q%2FTWKmnYqVVHucanTWyVyAI9u5R5BCr8kp%2B6Ai3UxlQ0AY8ZQb2Sb%2B%2FaNUquQrmryOZP81R8YIiY5dGIwk8j7zAY6pgGkz1CUGPgTnF7vJ8mtk0%2B9%2BLkGcy9IeTnIqasvKOdJVzlFlrFl1nAPO5QORpBg%2BZUeBTIkvYqO9y3h6ArK%2Fxu3TXVvg%2BBqWqaQUbjENmTBqyeJLpvYKdbgkm00btdUFTQyKvZZ%2Bo%2BoDziqkvJEAcuRSrO975cA7vKyx%2B%2FJUCBzDr0ezekH2Y0sinR3%2BY2jlbWbvXNrCwwFKpJwQ4qMMDqS4IBOfxU4&X-Amz-Signature=4c33ca916249df490d721e5f4b2751c3fd69d2e4cccbab8a19f8dd7dca426b0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5WZ2CEX%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIGhbPIUtgMv%2FJ90a0CleXVDsqPDaQPn8PbozDyEBSc3nAiAKQv1VSlHg%2Fa8VBPRGERo9dIuBlR4xdlelodSiNt3Vxir%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMTEgRtKXlsVxStD4mKtwDav9A30H%2Frmn7ORhzFxS9ypPkSCvQxYyJcwMD4dmJle5u8Ss%2FFwm4BVdFdd9WJ0EyA42Ts2vVVGX0j2Ke1uH7MdWE5dUMbDU3kt49j%2ForXQIOLu5I8r8rhdG7IssBBTHk877Qn3ZCOx4fUXFji92Zm3K4kwnJWRz0Bt08L3wZ%2FN9U6jHCAE0t7nMRXjWpTFX6HMiaoXEXdz1niXqIMGhTSpeXPEHNt%2FZdf%2FcPOrimhLuXE1MCmYdgVHuUt3sjDRT96y7Cpkzb8pmPjeSDYsxnJAODmZJ9EJjO364uETKd2yWjSISEfFmCtaqyMEFmqZulh%2FW91KTjS7paAtZgK5lb3OD9zQQyBIzGO%2F1PVQzzDN%2Bm0u%2BBiUuMqHvTb0CpofS645a8ZG%2FoZLaCYR5MyqT7sLX%2FP6xXeLgt%2BJZvsUDdSDSiphoI8rPB4254zkBzkQsk3%2F2wyI2lTHrYggscOcDmjAPnLjDzqt3P97Rw4Qgi5QZ%2FcnIYbcFpWqFpGCzpXcfABMs7pCW6CDDUVm24EQqXz2OhwGKosa%2FUzovw%2BFSaDQ3Q%2FTWKmnYqVVHucanTWyVyAI9u5R5BCr8kp%2B6Ai3UxlQ0AY8ZQb2Sb%2B%2FaNUquQrmryOZP81R8YIiY5dGIwk8j7zAY6pgGkz1CUGPgTnF7vJ8mtk0%2B9%2BLkGcy9IeTnIqasvKOdJVzlFlrFl1nAPO5QORpBg%2BZUeBTIkvYqO9y3h6ArK%2Fxu3TXVvg%2BBqWqaQUbjENmTBqyeJLpvYKdbgkm00btdUFTQyKvZZ%2Bo%2BoDziqkvJEAcuRSrO975cA7vKyx%2B%2FJUCBzDr0ezekH2Y0sinR3%2BY2jlbWbvXNrCwwFKpJwQ4qMMDqS4IBOfxU4&X-Amz-Signature=4c33ca916249df490d721e5f4b2751c3fd69d2e4cccbab8a19f8dd7dca426b0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWLBRK27%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDqUG8wT9qtIDmuJO3lIP1nw4RL3bCBKoOEoRupbh75tgIhAMVWYr9TysTDD4eRpHZE0kY3kPgp3CA1OyzfPyLNpLG8Kv8DCA0QABoMNjM3NDIzMTgzODA1Igw7k5Qf%2FqHqT9OgZMgq3APtsdENr2mZGuznrAjE%2BOfBYlbCRiXJUDES5KuPSuJThAfjCcgZLxjXienqk9OG8V%2B2WdStaF4LadOEj4FjrfVM2ArIYCOiv7gLb8P45J%2FJ81fSsHPLfC5n3s0R1ot%2BFWJgRFQ5pCT4fzTuf92o3LIeIhzA7ZS8756v6fUS80%2BL70gBY7euV1Bppt9IxeaCF7J2OpPX5e3DoN%2B6eeQZXdZxbEcsTz3M9CZeZvFFRqvm43uAlVNlpeCR94Th2CS4CowFFXZpM1ZCfbjz%2BgBWDspd9K7H%2F7SlFU54j68UGPtDPG3NV9GZJn495KBkFlAvd9lRVJEA7DxYY6ZZ7GNuooDedrb1k6%2FsfVKTiO6xcLnkjBpgalpwb%2B%2F6CB%2FW7BQPF7%2BvGh05VJnzcM32WL6O2BwKM6nfTa46ngke1cayYItLz3RI9KpQtGZkTThMYbqdhqF1%2F6TFOCn%2B%2F3fhePfZBdvIABWGCareXKIvjgXzNKI2IO%2Ft6sFZqwcRAxBNtCf3AGtmp9CSW8vtqcsxwy7P1J%2Bzk2wm5XNjfTyXBSM3%2FTfqZETgUweeJSZ%2FHkJsAVhjRS%2Bt8GQgRsiHGwBaaVLsbiRDdUCq134FqYCga5Yxr1sPKcMTE86vis7tivUQczDyxvvMBjqkAXh%2Fh1YPtvp%2Fj08qMl4%2BT%2FeY3eWtYe5%2Fho7K7tKKqJULQ%2FglbwbM47GbhjK20nez3zhqD3SNW4kLI2dFFkvAVxpA9rBd5XMZx1EI9lwQKukqY1YMwDmKc9kKuTBm6JC%2FC2m9hKdcehXZC1vD8IfHFLoImmvW80vrvkrG%2FW%2Ba2Ht3RaaBtpeGCqN4eXnJQR86sKP%2BtT9ZXkrTQB8BIfQ1aRy6eKcT&X-Amz-Signature=a5a646b2dba3d6f2e1988a1577153d5e780d8a58b398816d13c642a88e3043fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QOL27SO%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQClALT%2BITsPydSSHmjNcle2279gnn6EDWTQVi9H7NarMgIgDNDJX7XmlJRmFcOBNusip69hByGNInwS4oyMV5aaLPcq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDMs6BG0uo%2B4Sdd89uCrcA%2BCJ92JQq7Ybl%2BkDZP5o30foWxaJa0g%2BTCNbrZvIf3ek0qzZYdFNT6JJC3t0mzkQwuW0B1UYvWyIS%2BRdEYDQmJ0tpSoMpy1Oy%2FKDzJJ5hz2LEKRqCj8cwJUJpWdUjIaJKC08n6ixmQrb0Np8F9TbEdbiGo3%2BzG5kADN8a%2BIdpQViprb%2FuxEpF%2BIyVybZMEIBBQit7oumPiVsPktTRUPNRic0Fu0Ao6rG%2FEA7z%2BaBPTfXYUw69KOPB688izin%2FQyaz7nZSaIejSBtXBRtWImYPCbMawZEHoRBZzOmRFQIS4mrO4fVJWN3CMtIPhtgfdg9QJgoYdloSGpf1KK1OOHMCczfekx1MmG8e0kQ9%2FtpWA19Aa9Xd9hLczL%2BKay6vQ3dWIkJgo1P6uH%2BWxcPcVQtiXP4s7aCHBzzIQBVEDXui%2FOOSx2281LtjKHAjLybZIVnCfmMfnKM24cbGJhFQKAU2Kz%2FOwHXsQbc%2BJYlf3p6TU4n%2FroEUDwYaUURCW6%2BhMY4pj3EKPvs9n%2B2hmQcm2%2BMow8HTr1miZeKpCwIy90zPR%2Br5xvLBDxeMh%2BBWkgon3XvACpCyn6dxQUBsNwDvpdT7woSRY5GzF0oIvkKdgdxMZcCc%2B9cQ1y8wqa2Wfb8MOTI%2B8wGOqUBg307Wep%2BWBZVzwIqgrI4lBxhiadEVxZnbCxZgWuuq0ue3YQNoPetYejyGCMwL2AmCKd9oyt6XONAxFg0qDB572vSM33cJ%2BEph3QlmdTNSECKckegSGDrILSkWa9HwzNA9JOf43vlpDIQoJzjJ0khKOB68B3oSqL2lHgUANjG3DsvwagKE5ZfnoGNOiiSwWvW32mXRLDOo%2Byn%2F1pQZE77wkb0VV1h&X-Amz-Signature=a03cf6dd2674b0132fd95ce25c28c928175d829bdd9cf29ebbc9e0e2e7efd2ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QOL27SO%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQClALT%2BITsPydSSHmjNcle2279gnn6EDWTQVi9H7NarMgIgDNDJX7XmlJRmFcOBNusip69hByGNInwS4oyMV5aaLPcq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDMs6BG0uo%2B4Sdd89uCrcA%2BCJ92JQq7Ybl%2BkDZP5o30foWxaJa0g%2BTCNbrZvIf3ek0qzZYdFNT6JJC3t0mzkQwuW0B1UYvWyIS%2BRdEYDQmJ0tpSoMpy1Oy%2FKDzJJ5hz2LEKRqCj8cwJUJpWdUjIaJKC08n6ixmQrb0Np8F9TbEdbiGo3%2BzG5kADN8a%2BIdpQViprb%2FuxEpF%2BIyVybZMEIBBQit7oumPiVsPktTRUPNRic0Fu0Ao6rG%2FEA7z%2BaBPTfXYUw69KOPB688izin%2FQyaz7nZSaIejSBtXBRtWImYPCbMawZEHoRBZzOmRFQIS4mrO4fVJWN3CMtIPhtgfdg9QJgoYdloSGpf1KK1OOHMCczfekx1MmG8e0kQ9%2FtpWA19Aa9Xd9hLczL%2BKay6vQ3dWIkJgo1P6uH%2BWxcPcVQtiXP4s7aCHBzzIQBVEDXui%2FOOSx2281LtjKHAjLybZIVnCfmMfnKM24cbGJhFQKAU2Kz%2FOwHXsQbc%2BJYlf3p6TU4n%2FroEUDwYaUURCW6%2BhMY4pj3EKPvs9n%2B2hmQcm2%2BMow8HTr1miZeKpCwIy90zPR%2Br5xvLBDxeMh%2BBWkgon3XvACpCyn6dxQUBsNwDvpdT7woSRY5GzF0oIvkKdgdxMZcCc%2B9cQ1y8wqa2Wfb8MOTI%2B8wGOqUBg307Wep%2BWBZVzwIqgrI4lBxhiadEVxZnbCxZgWuuq0ue3YQNoPetYejyGCMwL2AmCKd9oyt6XONAxFg0qDB572vSM33cJ%2BEph3QlmdTNSECKckegSGDrILSkWa9HwzNA9JOf43vlpDIQoJzjJ0khKOB68B3oSqL2lHgUANjG3DsvwagKE5ZfnoGNOiiSwWvW32mXRLDOo%2Byn%2F1pQZE77wkb0VV1h&X-Amz-Signature=230346905fca0168c4ac820d4960d4a90166d77213177316f26bed7aa57317db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5SNJPLG%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIGpqQFpEZguuo%2BcuFcYQRpZfs7M5fdjWMnSIMMVmKYwdAiEA%2BKyrpaUPncfK%2B2gKk8xZJ4EeRSAzEa6nlSiPqiFRD2Qq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDKQ7ORQj89%2FhFuM5NCrcA5z4v3H3NG1L%2Fn6c0nT0eaDrq528t0Lt%2BEpAaf3vi%2BG%2Ba3S26yTRzbng9ucZBhkcKvvQXBawEbQEC4O6UxT3ahUEx9afJOO57Zer7VFvrp%2BpW4AVPmAO3H5Lk9e0OsaZkUax6wNV3qtCjR6qndPZybm8YXofaAj78obENh%2Fvzc9V8FMMz8w9jDe1JLSZT%2Fief00gkWcyacwk%2FzdhA0IapXqMFTzjBwZ3sgazGA1rnap9Bcz%2FNZofENtLMT6UmgV0UFwbd%2F88%2F%2BMKW5EOtUrlIqWAZZ3qmYE88fHadlMTcba18gbsVx2qJAzWQ2sQcR8cixCWbwRAVh4AKE93kcVgrzwK0VajlRnn%2Ba1n1Zs%2BkGNwxdvgGAZEmW6c5VI4vFAEhwQ%2FcI6CgRjMW%2FWLyz%2FDagMwUx3HDD8WQ5tQeRVLxUWmRpMiScGI5a49IWov8jfZvUlg5bfX5djX4WQjnbxaLZpzYHCLPRIiyZk0BequopAgnUEkVHwucVLYFM96dbMZemGBr7saE9qcFOHKPLUCOr0ggzfFurpRxlYWnhMZeE0JjTuWrZZDxVx1%2FkGYV1cWHeAEHEHE1W1AaNs%2BjO82DR7UkneayuYLgvh%2FYmjp2e49yk1NBuXUoOFtHoaZMIHI%2B8wGOqUB6%2Bw%2BRo%2Bz17v7jk%2FzYnYiLxlF1YkGwOZzPpNrsyVDVfn1O4hF8i9%2BHs2DH0W9Pd5jZwDi5UaZkoWqlyT8BIciDqpHy9mb%2BUPgn7VenLLhOBWQjWKNbXW1l3AMGXnLn27hjakUS%2FwHFr5QhwE9an8KTt0316F%2B7EW5dH887J3NyXUONfQJnN8hx%2BQTJBMklHy4tTZvkvnGiHMO2l7Gyxei1QvFNcVf&X-Amz-Signature=f11073020be2ddffef64be89a485541a778d6269f17f4e4136b4221cb2c278a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667VEWIDW%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIGcD%2FEamBUgJkmNKFCtiE0KdMUhHND1EUM8b%2FtV5uIOXAiEA2JAhpDmpfsIexDvwPfNTN35Roa%2BSLgiIREWpYhj55LAq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDLSgPmxi6PtaBd625SrcA5jpBk%2Fq7ihxnU%2Bf5mRTZEN5gBkxBIUaE2aWMMpQnEL%2F3DnAic%2Fas4BbPXfB45BaoXavksZ8EHht4vQ%2BpHmVTtH3%2Be4QMo1oLQbAQGo5LR6F%2BtqvZx3CZxW5kpW9fSaq0z9zEmMhRdgwNux9jtIlsA7iS9OJQr9yaEzvUjmReaTl30grJQOqaAxj34q4q2n85e7EiMvCAOmJcNiQ4uxG%2B1b70%2FRJt9sA8SPRAJQt3ogTn6AyA%2FTF8dqQYBV%2FGIvtWWEONuKRn10wH%2Bp6ewo0AxUZx%2FXKVUQKw9thAJBH9tZYzr%2FikeW%2BlLJG4IH3q4tFOWn4KOdyzCqIKKp2CAcaOUOT2rGk21pg0OB2CzXxbbUWxLvr0HA0NVe2Uw%2Bk74RLPHNrKYHY5UDZgEzGtw27ZV8SOQ7L39XXuEiqX%2B1cUmaidNyI%2BMKR7Qah7Grta4ZH%2FgK%2Bq%2BD1BZfU%2BkXrFuleabauj6nU727BO2nHAU0iAyEgeFgUIAC2eWL8svbhTRyadOsGWDAxsMmfK9U2paUEP74euoYtGkXBG644P2aoy5rKdMeeqh4UfuiOXVSXRq7K4wMBi6Nurgv5fYBJaFRuY6P4xM%2FOVWMmvDWdI0ghRkDzG3yssWYruXIZ8SO%2BMJ3I%2B8wGOqUB%2Fzn5OnI2jCRha4z49wwEqKlRmuMbUUHBYi08z4uh0kAQSoWVbof4p5vN72poIJzfaJiE4dFqElags5TWNJPo6nJLw%2FUOFU6SQOXCDFFrE%2FA%2BoN1JiaESoodCJnxnNyTAtdn9pcnqRMp1Rzgspfj0wcqzSxW8IZZMzq5sCOz4FBEZwLKxbAIv4aPnrLkTahG1oRjUCIZw9OBBHwfD9Q%2BV8BtsDxch&X-Amz-Signature=11c2cca17a84e0cadc2021f5f234103011b7f6772ea06a4ed2363bc4d235338a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CH6CF7N%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIHn8l0kHc5OZAcXSyyXEgVOAjxl9tn7edEKh3I2hmlnWAiBclWXEwdsOeN3ZWhVI4oXjcb%2FYrP4KAKgCOMEeOgHdkSr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMkZaBWIyZExDiHn7eKtwDsb%2F7hCjxaZ%2BRU64fYS9ZJ9yoRCi%2FwlCd%2FhAdkW%2FL4HlhlbXdtkKlWKm2n5Iy56xM34IGtMU%2FOKlg7tDfKhpkdPRiu0%2FymXk11bfKF3JaC%2FCo5iNioz1nO119bsfy3xk1lR5MAKJnhM4Pt1i%2BVd46dVQOE46UrmsF4UIvzEDppWU4iP%2FMVG8dI3wCS19o%2B2rOxji%2Fce668JjIQ%2FFrzhxwg%2ByGrf9jDxEwSq8LaGgR7dVRE2q3a%2BkH1ZiszeT4eQK8VpFjhor5CUZdA3%2BhfN2bBYgbVClZR%2F1skHrNDvLux4KMdZi1LoyZBDVPs2g6Jn%2FjimLsehTv7zivF2Y%2BCtFzD3Oh9C%2FQv4GCaIoWLTp4fRqn4%2BcJ7eBXrX14cWoRFhKZNQW9OpoBz8qGJNYuPf4UtAN9B8jiQwOvW2ovczWKVWC%2FzCBvlUsbf3UoM9AlTapjc2vhiBdLglSBs%2BA5uWs5sqHwtpClUjbE5lxWs11cIxL6qOoqoJj9MBMMKO2vDz65na3P0lqxIa0Ghm9tAYVKw6gVEnzryDwUR%2BXcFQQcssNoeao2hzeu9%2BH7xA0kYfatoxQYmk0hoIR0cmzFeAVqM7vgDp4ptmIKnhNkJ0I3SqboRKh%2FgDMvgNpYJ5Mw1cb7zAY6pgHinqkV69MFh2hgt87K1MnypS0lL3ip0SC5ORLJoglEwaalN4QmUXjqar0M8qY3XW%2FWtT%2BFSrt%2B%2BiqMunn8boe13%2FBQ%2FAd17mJP6tgjsafpgOJASBG1zc3xq%2BQ7NCaAoiPtKhxmrIW12M21P6tfe52TK9Wjs%2B%2BKuoT3PedDRHyOqw4IIFmM9VlXstR0Co%2FqTh4BuHk%2FWTRcqW52tubsVe2gCEkTDeuv&X-Amz-Signature=15b824bb6cfa903034b15f30dbbc760f8da3933cb75fa4af004fe97aa0abe9d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZF5WB24%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123206Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQD%2FVfgkRO4e%2FgCT03LpV69o6E%2FUO1GGHrkdLxIwOlGxjgIhALd6YSL4Ej6SsnlU7hLE7AE%2F2ODZaGrX%2Fzw3BU%2BReMtkKv8DCA0QABoMNjM3NDIzMTgzODA1IgwJARrCFfAf%2BuJqg1kq3AMV1GdRT0tqaR1QqTKqJPgsWG4CGtXK2qIvgDdHxUyz647BqerVPEp7mbnqfx2608DYpKBcsnZcOsyhYbvQSvw6Uku%2BdHW1VvFHOVvAwCDy%2F5DGvR0pP2sW%2FuU7kij2WuvaX21qY5WD6Lv2%2F7UKt%2FEGhIdmhuPOVFIoC7Q3l5pnllVV4q0J4lGgQnOUOng5ERg8PR15PB1CYgePLzvDgprqda1MP38cOAkF9W873xLE76lqVNAFLwzMvgt%2FL7cywdl1Uq3duxlM2rAUrmYUzNbskjRnq9FRHxHWJA0uY2G7lv%2BO81pdelNn8E359nXl1q9u88kYUMG8wfF8hXDaC%2BRpaGxmUwSqEbLGeENUH7xoJMWZWXQuhOfCQc4dRyLiA1BjFvH1qM%2Fg8OL7fHJBbxi8VBV0gc00LA%2BaXxTwj%2FLY05xtjMMvo8BABTaIhp2YjmyBVsfd9JuQa95iKZ0RYE%2BNRloYviAVB%2BsXzhV4MtzvTWwEHAeP7eb7WyVUMQWHRc%2B1GPGp0IVxrDsSL4ckoSbOW24qVDLGT582bQeAbRuOnA2RF4CAaGmjWcjNhttL%2F6z6tGT%2BIOFlafT%2Fi%2BgEh7v0FxZA%2B1%2Bm2wvfc9fIGsQAaN9EhZByJr5MItdARzDnx%2FvMBjqkAR1zkHOB3O2qzOZ1T8%2BmP73oAEtp1UUT5ixnQGHlZpY7RTzOSUoBxGNVR7DNbmQqVAlhn5GNNzOHlhBky%2BaI0auM7ph4S25zBEcE2acvmLur8ucEiLPOteKeMb%2Fnp09fmbQhY4wUbHI7jII3QQmuNAfZiM9L5PlYUARS4SaJKKLqwnbMUtYn%2BCeQYAxhFJtOaV754xJrFx8E0CzSqxYmb6G3pb%2F%2F&X-Amz-Signature=1ce17b342f173d922f94dc6081f57ef9e22abaab06257ce8d2af30403496a75d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZF5WB24%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123206Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQD%2FVfgkRO4e%2FgCT03LpV69o6E%2FUO1GGHrkdLxIwOlGxjgIhALd6YSL4Ej6SsnlU7hLE7AE%2F2ODZaGrX%2Fzw3BU%2BReMtkKv8DCA0QABoMNjM3NDIzMTgzODA1IgwJARrCFfAf%2BuJqg1kq3AMV1GdRT0tqaR1QqTKqJPgsWG4CGtXK2qIvgDdHxUyz647BqerVPEp7mbnqfx2608DYpKBcsnZcOsyhYbvQSvw6Uku%2BdHW1VvFHOVvAwCDy%2F5DGvR0pP2sW%2FuU7kij2WuvaX21qY5WD6Lv2%2F7UKt%2FEGhIdmhuPOVFIoC7Q3l5pnllVV4q0J4lGgQnOUOng5ERg8PR15PB1CYgePLzvDgprqda1MP38cOAkF9W873xLE76lqVNAFLwzMvgt%2FL7cywdl1Uq3duxlM2rAUrmYUzNbskjRnq9FRHxHWJA0uY2G7lv%2BO81pdelNn8E359nXl1q9u88kYUMG8wfF8hXDaC%2BRpaGxmUwSqEbLGeENUH7xoJMWZWXQuhOfCQc4dRyLiA1BjFvH1qM%2Fg8OL7fHJBbxi8VBV0gc00LA%2BaXxTwj%2FLY05xtjMMvo8BABTaIhp2YjmyBVsfd9JuQa95iKZ0RYE%2BNRloYviAVB%2BsXzhV4MtzvTWwEHAeP7eb7WyVUMQWHRc%2B1GPGp0IVxrDsSL4ckoSbOW24qVDLGT582bQeAbRuOnA2RF4CAaGmjWcjNhttL%2F6z6tGT%2BIOFlafT%2Fi%2BgEh7v0FxZA%2B1%2Bm2wvfc9fIGsQAaN9EhZByJr5MItdARzDnx%2FvMBjqkAR1zkHOB3O2qzOZ1T8%2BmP73oAEtp1UUT5ixnQGHlZpY7RTzOSUoBxGNVR7DNbmQqVAlhn5GNNzOHlhBky%2BaI0auM7ph4S25zBEcE2acvmLur8ucEiLPOteKeMb%2Fnp09fmbQhY4wUbHI7jII3QQmuNAfZiM9L5PlYUARS4SaJKKLqwnbMUtYn%2BCeQYAxhFJtOaV754xJrFx8E0CzSqxYmb6G3pb%2F%2F&X-Amz-Signature=269e17d22f176bb8737f2dd9e839ac42243c5cf6411c4d287db4872412c72e47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MKX77TJ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIH%2FIw9toN5jmFQNOkmjwcZVbkKAE2c%2FZKuIAnPSZVIIkAiB61j9x6Qz8jJjKyTR7tZVgNZXDCtgj9rimeyV%2B2QSIGCr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMvzG532e%2BauKtlx0aKtwDGCzXKYw%2BAFSwN4%2F0wY2I37QC8Z6eteKEWLA6o8MxgBBOL2LwP%2FYL22LJ1nM7aq1AFwKQctV6Wpjduk2XMjLdIt4uefBnUPPGHBmt8PIz37zEgBnxwTaDq%2B8AneAplPrIwfOyRVgLtKmpCZ4fSn9lm0lqvU4ZWz69fZjfsEf8tHdwPl1FeXcQVLZyBCrV4St82%2BwcFdEf%2FmAl79O6d9bombH1ey640%2FOmspCRuqQGdSFrAdhQTKVFVOY%2FONbwMFlT8AlfwtN530TZrWbvZEJZ6EC1n6WXQjDKwpJSThjM3D0gRT0q8EYAYKUXjqmJKPeNNMF03GnNHQaYfrTSgFnCsivOuxLbqF4BDqvYW6sj6iScUC3WehDWCcps0ohV9cbghy9TzxF1Qq1BWnDVcrwVkWkeZn6u2X5a6hyt4wJpvbUmvaOeKRwniSusxtBsFCuVoJjplUo8X1giif3gv6eYbThHmJIyt0q6cGo023otzhl5DQoIOisrve4rov4PHklGGV8VywncMRJiEont7fi5WDSrzMZbpgmsfB4SPsTLCTC1C58SM0KJ31WP%2BuiFy0b4LiRx2KBSC3NbPKcRs7j08z2kGQB%2BZX0cMEQ%2FslPlHJ4zm2C2jSPhb3p69igw5cj7zAY6pgFREUeq4TA1kd%2FNoLrLgcYuss2LcVeOYZQIHs1aeb3YoNEj4mQwM%2Fao9jv6O9Jj1B0P8Y%2BXKwiiJjVW1D9FDf%2Fv6mbMyMLmuhzbma6xTs2anWI65OZuC3GgyPffbLNAm2BwY%2BTQeo227ZrJG3CcMTQkb5XKBuUgt8P5vxTMHtLH9UHD8RLEFXUGPuhjopfK8DuuFBcNkrYM2sx5%2FLU1ZEX9A20yQqoW&X-Amz-Signature=4d24a7912415fca4b03803eade75ee06c5272f967aad88718112c2f7c6098c34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAF36FWZ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIBXCBvMYxt0rZlkRkDBoM8gPaa%2Fn%2FsyROmdPzvOH%2FvTmAiAZTbwmVl3JPBN0kxwnHlmZJAE%2FBu0iWA3e1peZSbj4Zyr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIM%2B2tJfcME6fiBhMpoKtwDOkmMTDaAqeTaFjGutnbrR%2FkXkUEmR%2BiJt0AWga12CtCQNdKvX07aCAYThI2b2BdxAtoCwmohx6IqPk8J6BVXqBwQ1vTpq%2FjQ5qr%2BHXESiQlnueW814IF0n%2BXgS08MRYX3wDdTkvPxwiq86tWqhC0XDiRiEamTFZdVlc6YmcoNgRoV3Y0GBOrm23MGbL2tP%2FIoJNWZh9GV0HKxctoSlNwFEAe3m1Kai%2FqckpHeFQKzSv%2BZcsYF%2FShOS3FDpMYapt1A3%2Fq9EztGSmih6rFDbguv42pLaYcRHlI63GM55mhFpyfF9ebfZ%2FEuDEZNFNbhAemtgsGETMI%2BYUGOkLQP%2Bh7dvQ4j%2FIlm%2BSJkTxQbTE2iePlSGtl5mi5rzRFm2rgOEKp4VVT94PcBl5EDb6QyL%2FcmZDXaopYyMqVkA1TsKyuNdTd2OIQIlu%2FSdh4QX%2BQMlk3XnaX2OcLOVzJQyd6K9N0ut6AGKzFZmBOKZWGMPSXBePsreo7c4w%2FN%2FaFkT4UcyNumxp5WEgtpEBj0KPtOBxHJo%2BgDwQghzKp2243RO%2F8aOyFnRrhpWxKoTkzCDicY9EK7F60MmiqDtNTfPLtacLzOO6ZNRIqnw7uUKrg7l8jh3HVg0WmV8tMWBsDnzMw38b7zAY6pgG2ZRWROTiv0BfGQUIri3pZ3mqz9R2lS1JOmLYaKPJD%2FzNLAmyd10t6Q%2Bz6ZPVTDtaD5WKUslr0dlM1%2FP29Y3X70JgXBjgeoF5W2zrmddJ8B0ESxl9OAf7eUvlaYQE4ZcEhTrQt%2Bxvo2wkhUAwvY2%2BI%2Bk2G1tyfHDuaSuk8Vo40FQqY0x4743ag8W1kaylzU6piaqjqX4tvftoJeRLE0wofmMH4a1GF&X-Amz-Signature=86ac8292c000c23e5af87fbbcb5756f693e02fe4e030fd0b25afbfa589e35bae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAF36FWZ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIBXCBvMYxt0rZlkRkDBoM8gPaa%2Fn%2FsyROmdPzvOH%2FvTmAiAZTbwmVl3JPBN0kxwnHlmZJAE%2FBu0iWA3e1peZSbj4Zyr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIM%2B2tJfcME6fiBhMpoKtwDOkmMTDaAqeTaFjGutnbrR%2FkXkUEmR%2BiJt0AWga12CtCQNdKvX07aCAYThI2b2BdxAtoCwmohx6IqPk8J6BVXqBwQ1vTpq%2FjQ5qr%2BHXESiQlnueW814IF0n%2BXgS08MRYX3wDdTkvPxwiq86tWqhC0XDiRiEamTFZdVlc6YmcoNgRoV3Y0GBOrm23MGbL2tP%2FIoJNWZh9GV0HKxctoSlNwFEAe3m1Kai%2FqckpHeFQKzSv%2BZcsYF%2FShOS3FDpMYapt1A3%2Fq9EztGSmih6rFDbguv42pLaYcRHlI63GM55mhFpyfF9ebfZ%2FEuDEZNFNbhAemtgsGETMI%2BYUGOkLQP%2Bh7dvQ4j%2FIlm%2BSJkTxQbTE2iePlSGtl5mi5rzRFm2rgOEKp4VVT94PcBl5EDb6QyL%2FcmZDXaopYyMqVkA1TsKyuNdTd2OIQIlu%2FSdh4QX%2BQMlk3XnaX2OcLOVzJQyd6K9N0ut6AGKzFZmBOKZWGMPSXBePsreo7c4w%2FN%2FaFkT4UcyNumxp5WEgtpEBj0KPtOBxHJo%2BgDwQghzKp2243RO%2F8aOyFnRrhpWxKoTkzCDicY9EK7F60MmiqDtNTfPLtacLzOO6ZNRIqnw7uUKrg7l8jh3HVg0WmV8tMWBsDnzMw38b7zAY6pgG2ZRWROTiv0BfGQUIri3pZ3mqz9R2lS1JOmLYaKPJD%2FzNLAmyd10t6Q%2Bz6ZPVTDtaD5WKUslr0dlM1%2FP29Y3X70JgXBjgeoF5W2zrmddJ8B0ESxl9OAf7eUvlaYQE4ZcEhTrQt%2Bxvo2wkhUAwvY2%2BI%2Bk2G1tyfHDuaSuk8Vo40FQqY0x4743ag8W1kaylzU6piaqjqX4tvftoJeRLE0wofmMH4a1GF&X-Amz-Signature=86ac8292c000c23e5af87fbbcb5756f693e02fe4e030fd0b25afbfa589e35bae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652MT7VTO%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T123211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQD1XVEWi%2BhrWK%2FBFNiuldrq%2B47wvEKCLoYlLmGebiEoDgIhAONp2W%2BIZHSwHYeFEDHIgjuhPhRQrRDgrAqdX%2Bm9jy7xKv8DCA0QABoMNjM3NDIzMTgzODA1Igy7auTYm7VgGz3Ol5kq3AP0oIoVCMW9mzt5Ur3c9GA3WnTDwRQymNtsnv6LuCYyyyAfx%2FlaqVblOgqa%2BVReXMQYo77%2Bgh%2FOfDlmb%2FPn14gNLMKsDh0bbyaDfqMOCEjevKQmYSnWlSIpOZDpSQaMOJHyHgLtC1jB0CDv%2B1K5gfCYU%2FeXvOZ3Sb8eMk3%2FZ%2FSMNkW8MVu5T2DTuGw2vnlL9tvmRB%2FVMK%2BpqfUhhgBRZWfEt2IDcIvM%2B3Lf1Wm%2FQlwXmCAp5gixqTYL%2FLaVCavgFGcZmHsZyI1aOpEham4wPdQ7COo%2BmLyZCJgA9%2FYFFute%2FLxdHayNdyke8DYqe57oXDYpkAlg7c0yByP0HoyQriUs5%2BhhxUIgmf1SyFsNTsd1ou%2BMGpB0SLqme8LZx%2FVwenFrLnNZRinre5gqBQJ%2B1xMOQANKDp1vk2aYskXy5YbIatUXvnpmXB768xtRCERc%2F7MVDy8%2FEMYN37VxyVCjHm1%2BGb3h1q%2FMfLdUCrLmJiGd7QeHjSbYl3nFxAIB7m94Ny%2FU3699gb3j492gEI%2B%2FSCoN9%2BWQtZ4cDI%2BbIiVBAnDlWO4BIDL%2BPOf8I1MWzuLwQt0YTtkLl2Kx5Tt3Kwqdu636QWjgcXS%2FNrtmu0GXxe9rFjOSNLzdcxMrWhcArDDWxvvMBjqkAVc9Ygwx%2FLPRW5MWHE80dxbBvJnw62P4HC15Y%2BYFaCeS9L%2Frf1FlnBPjo4ySbtolDzTIFkW3M%2F9KWQWxtiZmdJrFvFE%2BpmLhUcKEOi2mhVbYx7Akoj0TT2qRoBodP1rFJ%2F3rI3hdpwTqoLF1b6e9iz0V08p7yyqMWVMq6cHnbdasgAQ9sKkWhHnE5mQjVIc6rAiQNp83RU9fhKvSKZ4v655GtJEL&X-Amz-Signature=e0091b5a62e42a134f7125340a15dde44679ced044f03cb3a0f9917f3d07143e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

