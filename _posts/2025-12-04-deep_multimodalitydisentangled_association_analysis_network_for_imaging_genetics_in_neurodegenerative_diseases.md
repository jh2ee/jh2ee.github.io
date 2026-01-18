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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMI4F5AG%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCpIX2gWimWDAwA0lhkWkQ3m2SeqPFwbPL2V0uwMHp56QIgd2TMuSowWfvjSglx4PVzZ1og50UqVi6CXI9nuXIwXaUq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDIqI8GuHCujZ61N8hyrcA4TEDc%2F1mdCnLoWFdHl9m2hA9xnxz4zWx3YMPgqAprytFJQyXHuxe6iSBsjMbSRdsgVaIjdFdGJP01TurwADCuHs%2FMmRvRS75GgInOynyM1AkGz6pHO%2BhlrkO4QsKMgkQ85uj5aWyusJ91XYDX4cFeDagn4FzzX%2BgF8OShE6IJn1CbVFL2JAgASyLuVYZLmRRYK1pEq5vsXAVgER85DSiEaCkle%2BDI0TgfQgS2QaCBOnEFhp7nI2sz%2F0MvnmNzqPuUw6w%2FbPM%2FjHRbR%2B%2F2WE4aXUFr6WlmUDs8Rl2WqqlQOlVPCvvKCBD%2FZQRTM1zspUVBndqQHvMUCHNwfLxGKEivBtIHbuibise62rb6WYNWccAY2G3Xjg6UiTYOAwm%2BuLBxjzWfJD1C1sVgl4IPl3yM9VE0pvpch83lbdlD9K%2Bkc4WGzF7PB7FpfCzQ1gUhhsFPbbD7Yzniht%2B%2BNdn%2BGoWCZKjIU5p6saQbtsHSbfb1ho9v6wtW49Nry3CXnLXDCXv4Jiknxmmpi%2BMEJRVla3HykKR2QQZ%2Byww7XrFHIdABAxZrbKVj2G%2FUwnz%2FRJtkSsClqRL%2FR1OihD4nDdEsWFgevbJI6r38CTalEK13CXFzMDMZLzFBbMnd4q9SROMNmvsssGOqUB%2Bmh0plBJq1aJl%2FztpB0fcE92lkyQKDNS1iCYdPVhqRJ6uM%2B5nD75I2PuPy1tSWCXCSbHLYlLMKHcK7qvynkfmA0RaZLicQLAYgPDOaXz3v4dLYjDPmNYe5a5BKqeGuiRudpSs1JiytbAmt7%2F9aqq3q9hRQ7kjan5oY2hkiNBG%2BK1%2BosZjEJUQWUawm9U088gtyHdfExcnjxr90sjgHVLG0iYBdiL&X-Amz-Signature=3673d2cc8c353f19f5c1eee64b8c76564cae8675d8a6ec8d6980b41de988b60a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMI4F5AG%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCpIX2gWimWDAwA0lhkWkQ3m2SeqPFwbPL2V0uwMHp56QIgd2TMuSowWfvjSglx4PVzZ1og50UqVi6CXI9nuXIwXaUq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDIqI8GuHCujZ61N8hyrcA4TEDc%2F1mdCnLoWFdHl9m2hA9xnxz4zWx3YMPgqAprytFJQyXHuxe6iSBsjMbSRdsgVaIjdFdGJP01TurwADCuHs%2FMmRvRS75GgInOynyM1AkGz6pHO%2BhlrkO4QsKMgkQ85uj5aWyusJ91XYDX4cFeDagn4FzzX%2BgF8OShE6IJn1CbVFL2JAgASyLuVYZLmRRYK1pEq5vsXAVgER85DSiEaCkle%2BDI0TgfQgS2QaCBOnEFhp7nI2sz%2F0MvnmNzqPuUw6w%2FbPM%2FjHRbR%2B%2F2WE4aXUFr6WlmUDs8Rl2WqqlQOlVPCvvKCBD%2FZQRTM1zspUVBndqQHvMUCHNwfLxGKEivBtIHbuibise62rb6WYNWccAY2G3Xjg6UiTYOAwm%2BuLBxjzWfJD1C1sVgl4IPl3yM9VE0pvpch83lbdlD9K%2Bkc4WGzF7PB7FpfCzQ1gUhhsFPbbD7Yzniht%2B%2BNdn%2BGoWCZKjIU5p6saQbtsHSbfb1ho9v6wtW49Nry3CXnLXDCXv4Jiknxmmpi%2BMEJRVla3HykKR2QQZ%2Byww7XrFHIdABAxZrbKVj2G%2FUwnz%2FRJtkSsClqRL%2FR1OihD4nDdEsWFgevbJI6r38CTalEK13CXFzMDMZLzFBbMnd4q9SROMNmvsssGOqUB%2Bmh0plBJq1aJl%2FztpB0fcE92lkyQKDNS1iCYdPVhqRJ6uM%2B5nD75I2PuPy1tSWCXCSbHLYlLMKHcK7qvynkfmA0RaZLicQLAYgPDOaXz3v4dLYjDPmNYe5a5BKqeGuiRudpSs1JiytbAmt7%2F9aqq3q9hRQ7kjan5oY2hkiNBG%2BK1%2BosZjEJUQWUawm9U088gtyHdfExcnjxr90sjgHVLG0iYBdiL&X-Amz-Signature=3673d2cc8c353f19f5c1eee64b8c76564cae8675d8a6ec8d6980b41de988b60a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPHNAHUW%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEleYCyu2Za4Y4rLpNjGm4foXGJEpN6Qr%2Bgpd6ohW9x%2FAiBfWfiaC8N5MdOu0C3AKO1p0huwjjfS42%2BwCgMxWJRnBir%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMKzZQTFRBJj1YEQyGKtwD1UfrSGcq1j2gWxmaCfzxOk7nvvb6AzC91yel4gEnSmPNapZU8JvndQIPK5kCUhev6HpPQF7wuhs6MiLDPUKqRqV4DUicLoVCGOE3ikW4vAup10W4jRLE7P2doHgB6MdycPYci4w3AZNlXAL9y2dAi9iubSs1OV7evfRRFjYquDgzNY7YkQi23NAoRQ4F0LxABDf8ncAix7LDT1qXvIwKO1aBnm8pA1%2BmGGLiBBD1yPR0rkx6tph2pwScqDeuh5ZCpKbXfYAXnBYUsF05RH0djMzWQG41omyeXxGuFYHBtLXYM0eMkxiFuOIGmYlsboQuuioU4Gzrn5%2FLsRYZo8tBpFjpiTt0lOydSdcolrvYBL7OzFYfg%2Bgn48J7ptRXVMU%2BkCkx2Xfz5M%2B0wWSWdbDsXOAeNsBr7f4qBVgWCDuTifjLxjrdDsvZ66C1M4hJcdIMxzFeGfyYFB6OhMY7tSOVQRPU8klBy79E3pa%2FMyZcHdl%2FNtDFmJX5s1fOSVb3Zg60EWVd632DhcniQ3%2F4tByK1Nq%2BICPX3weh0Jltgh6I78DmtW1qopA0Z26p9OBq4EHoGVP6I%2B6txZ8qznVHnyjdkFoNhkp%2F5fZ8yRL5rNKIUUtEXdg4GsCzZThK0ucwlLKyywY6pgHSf9jxSnXB8gb2vJHViMrSYOANSvi%2BSdxasT5zrBdQte5QiAxHH%2Bv8OGHSL%2FO5k0b9aTisEOP3KI%2Bs0wLGFw6KDOwoaGQGTYLpVpz%2FYx0eTpzmNtFbSPOonvicimr8T0s2rtq9vs6XSX%2FleWYqLFKI5l0Iu1wfx6nPbX853xqktqhckCREfgNWq8%2BlcM5%2BP3rXQvsMfCxON0YBzX5Bu8epEwzEEGFh&X-Amz-Signature=b7fc307b83f5b7af2b7c76327552ccca0f508a54fe9209210fac903ae5174f77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VD44IHMU%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGElBdPvCQ9d%2FcXDKrjt%2BysnKBE2e8JzYslU6YYTTw9VAiAe4oenDus40UNjSo%2BUFjsSzZqhX4u6VKTd52aXeglQ%2Byr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMQfolJAPxqBg8GAB5KtwDABb9YpbK3okd37Izg%2FFAxdpfQ2vl%2Bz1EGYyeSTmrxfMQXdGO8fisVnm1j5Gtfcwfu7nigBHXxLiT%2BI2nWtbHaJlJyp2mdrKFX3xIUv4VWAzByNJ%2BJC8LM0hQ8wuWjdFLlXFFmJ2JN861oFoE2lvhbP23gY%2BlQXm66kyNGIjEyA23FQKaZlkN20SeHB7zupFsgownQDIgtc61StwUd82OBzSBfs9VwxUC4cLknjY3JMw7ct%2BuMKqdwhLc%2BMeQylbW7bZ5oOg9pmjux4eg7Ig5Vln4notI996qan7VrOJq69QV1m%2BvbuY1pNrVNuocSLOJyHI0JIMCNdCGaXEqTz8m0QOguSvMLHAmEGU5e2RpiwqZ1KdmsY0N4yNvtFh2eqVHwLZZZiyMpCxFYT%2Fu8VMVOTsJO1nm68OIWZhItMPDphDXTZOzFWCz3ou3rT%2Fn7mq4RUPW%2F7hERPPEuF7kbX3v8EAaGV03eluydBK%2BVmCIupOOK%2FJVyW5WOwzQ2i4kOnYasRxBKQvgJYY7G3Ji7CJLdol0jCWojbapkq1goonpkrOwY5eIIGZYtyllnNet429O6PDKYiX%2B1vC81k6dDLFj16JSlSHv7mDOQldTFzEh0OIF4xiK8wxNK1j8HX8wuLCyywY6pgFQfOaL%2BSax7AiT7hS60OHPRaHwTTT9hBE9SGw5ZJg5HkEMEISAetznsA3S1E7quoSMsU9X6AQ4Ljknw57DyJE82k6oWiYNxptYAYXF4542dwXy%2FeYOu%2BOh02KG14%2F2rrSKxuiVUnWcOk0XWTQWtoOw%2FcXxu%2B5W3nbGgNiSaq0fqliJfFMkKedFeGnx7%2B6cZ5zQz9sJL0tA0Dp4OrbYEi8CUMKhKnFy&X-Amz-Signature=7f7924cfbc061e517ca5f5a6f8206053c86e674db0c3def99c3ab2154e5c226c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VD44IHMU%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGElBdPvCQ9d%2FcXDKrjt%2BysnKBE2e8JzYslU6YYTTw9VAiAe4oenDus40UNjSo%2BUFjsSzZqhX4u6VKTd52aXeglQ%2Byr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMQfolJAPxqBg8GAB5KtwDABb9YpbK3okd37Izg%2FFAxdpfQ2vl%2Bz1EGYyeSTmrxfMQXdGO8fisVnm1j5Gtfcwfu7nigBHXxLiT%2BI2nWtbHaJlJyp2mdrKFX3xIUv4VWAzByNJ%2BJC8LM0hQ8wuWjdFLlXFFmJ2JN861oFoE2lvhbP23gY%2BlQXm66kyNGIjEyA23FQKaZlkN20SeHB7zupFsgownQDIgtc61StwUd82OBzSBfs9VwxUC4cLknjY3JMw7ct%2BuMKqdwhLc%2BMeQylbW7bZ5oOg9pmjux4eg7Ig5Vln4notI996qan7VrOJq69QV1m%2BvbuY1pNrVNuocSLOJyHI0JIMCNdCGaXEqTz8m0QOguSvMLHAmEGU5e2RpiwqZ1KdmsY0N4yNvtFh2eqVHwLZZZiyMpCxFYT%2Fu8VMVOTsJO1nm68OIWZhItMPDphDXTZOzFWCz3ou3rT%2Fn7mq4RUPW%2F7hERPPEuF7kbX3v8EAaGV03eluydBK%2BVmCIupOOK%2FJVyW5WOwzQ2i4kOnYasRxBKQvgJYY7G3Ji7CJLdol0jCWojbapkq1goonpkrOwY5eIIGZYtyllnNet429O6PDKYiX%2B1vC81k6dDLFj16JSlSHv7mDOQldTFzEh0OIF4xiK8wxNK1j8HX8wuLCyywY6pgFQfOaL%2BSax7AiT7hS60OHPRaHwTTT9hBE9SGw5ZJg5HkEMEISAetznsA3S1E7quoSMsU9X6AQ4Ljknw57DyJE82k6oWiYNxptYAYXF4542dwXy%2FeYOu%2BOh02KG14%2F2rrSKxuiVUnWcOk0XWTQWtoOw%2FcXxu%2B5W3nbGgNiSaq0fqliJfFMkKedFeGnx7%2B6cZ5zQz9sJL0tA0Dp4OrbYEi8CUMKhKnFy&X-Amz-Signature=1912fd159bef6e324e6ff34e6439925581d17acb9db7d7304ff4aafac7893caf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRUUK6QL%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGnuf%2F3f7tZ8o7k8oVRdk41jd1D0JclrhjL1CN33D5rsAiApLqKejZ8gFKGeD0V3tc3ozS9nQrdTXTcJlDcgpk7Ouir%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMehgp8%2B2%2FnD3hUgy2KtwDA9%2B0DnnLC10DiMIXmvwOLeqDDiOFlibDLckR5YoANRp46KBHmplORQl2nflFu3Ni9VNjSQwv0fZhDNlaDlrphpkGMDNTnRAtq9EQek8oawPnEUtvhKQCj1PCnVHttOPWpl6wM5hu%2BB3laG5sAoQ%2F%2BXfVOw2nPVSpIGTAaGLzHjX1KgQ2Mfwq3UJk%2FqPH1yec66eVBDjS3X8vuDKvpGET%2FsqyEjCPCt0yxxZIiV92R9QW5gVTW1NZAEtuVAfjqJNghInYemNzjQTvXSgWemzhZ27499Y8GTpK89XsjZB0y4FnnFQuCVD0JbiiQW53ci0ypZV%2FlnCWV6QknitTecnT0wL6TqQ36hnij39OAcHMZ32%2FyEBx9MBsJzuhH%2BQ8b%2B2Ye%2FPHO26rrRu1qJKnUiufZt0A3j7sKmmAeLwZPsptOf1DIdAsFuqWvQdajFqih3aLqzrGjhyRbs6pAkHDFhv4QkX2vVjMZ04uhI172QEEtPYk6g%2FhyIDVXQos9CtUZGBk2HHOkZTtpzdAdFZ1VqmXPLaE3DCysWLtTzdsSGtTzs4s8hoj2SjL2%2BSIP8pCqB9yoAqdft3IW01xUqUL1fEhF1phB5Kn13PaoWTbvXbiW9Y6%2FDQCdbFHuROuqjowx7OyywY6pgEbW1f8Fyt9fwAyVvrVi%2FUsUNRvwpetlr0Grg%2FHdci%2BMp86XUYpPf6qQyG7ZKCvTdOlOM%2BbUoRd%2FQPcYAf1jZmdWm4EGzlRHMQXpe24rU01qGgW%2BVV1niI1lNpMX6pCAhU0xcVTEV1HkfMuPKEtoRO%2FJB7%2F2mEMWyedjMSA1o6%2FiHNe9cLG2naAou19bP0My9pIPrhboLa2HVnsjjhZInSj8SlNQ5DJ&X-Amz-Signature=9aeb53b1715adf11b048857127700cfb450f6ddbd0c64aa7492a91f9e8802a00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3D6QJVQ%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCM0sUrlc5EGHM%2FoqoVBTU6iVQKpjI8cQSd2d6mFo6y5AIgQBu0UaXT2WO3Ni6y%2BZ6DNiQ8u3%2Ftw1u3q3v6ufWYKC8q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDGCQADYI5TS%2ByNpcEircAxR3zYqOxme4rkRrF%2BP4wsVYuzlsl3E4CMoSH%2FgqZDJydZyM%2FP9doZbOl8xvLxkKxuL9rh1NZ8mow8knoBIo2K%2FZwaO%2FAQP469TtaNHSxFcW%2FmneBk6yk89VTUJ6LPzwm8ZQiFKBX9OCQSAUFfkRorGd5kt904X%2FFB0T0pJ8gUH5hu2Of1k5YPKQcb0Rdc%2Bbeke9Ctt%2Bkhzpt2D7QLTveFYA7MpOolHtf0x4Q4rvewP6kW%2BQldsnm7qdZ0hdVi%2FDvKzFdhhtYoczM%2BL%2Fa5nkuye18EABeswV12wAyc2Bzl6iaVT0aZHLglfb4T4%2BomcE1ZgEoAfV5g%2B8%2Bt%2BDPP0%2F2FV82%2FZD1Vibmjcr5g7YKoAUiOdirvL0AX%2FBE9Nn5CqZmKUde%2FFY3zGBqGHM%2BQMJnaMFjS7sk4w07A%2BsIBQukHT2wMm%2F7sN9x1t%2BPYRba3WmcFl6zE0O%2BZtW0Ax3RSgyxe5cfx1zqiia3cJEEOvyFrPlYYwOWXR7xoiO5VmbinYmY87zDLM5RrUgVZ%2BmcsmggzijiOT7LQjdLtQVtImwCbj5RjFLpLyGRpY2vaTx7ubeNesKiHSlpAqsGcKP%2Fluwp%2FWGsk9ffghwmPyFwYy%2B0WM4OkBNvfejekONxS55MMissssGOqUBwjnjUdZglRxKoFh6ZLlEL1bK481BtG5ElXn6XHyN2n9sL9J2uDTTEFi4ZJgxX%2B8HSbk274nvn%2BFFllPBAWwF4ffsllIj39jG5ZpGcCd6Xf7iydXonzP5qyh8Mt3PV4kAZGTh%2Bs3zUxgc2VVRHcspxVYGXacvgF%2FX2xHsXZiT8YZrtEnkfQETdtCRlueIhmnBQoTWBVLrrPPWXEn8OO2fiNQ4mc1T&X-Amz-Signature=2f6a59d8a370f918e03811bdefe2843fd2266f767ec0636e6572adda97601cef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJINTPYE%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDIKdAhEwJaUM3PvcfjX3OJvu%2B7JpAtf%2BL%2BaVNlkjzxmAIhALqMErGarknVZE5V662UaGfYZSSd0RZZKOPO9v7IwNsUKv8DCHkQABoMNjM3NDIzMTgzODA1IgyvcfvqIOk0YVmZrhwq3AOoisr8qiF9a8DoCWuGYUvOcXgKsD2s7ii6XFa5uoyzj4wiMHMoM73SJWtKhPqcdLJzttkTVbBaG0ZNlVuQfko1hKb7Z7VSUYWYYjUY5OMFRh5RfqGbGlqEE2j08nrlW2i5EMv3S6hgQI4LDtWYDH3%2Bj1Mj7JGh0d1zCLKZ%2FJ%2BG65ByIsiy29RlVd1%2B6UAmR4gQQSRotWgmQB3vqJHcjqbik9V3rtWwGNT%2FTWk6UgfvxaOSgBeWzxRbl2%2BrUKljJCJBxjtnhtkrHzw5%2FOL2wemYnz8XHWyTOSGEfYjY%2BMD9rmM1zwFrF%2Fra0zFDNAQgKH%2BO0h8p7h9KoTSIXE3TeevJ9%2FDE0lnVBIeSEI3HMALItOSNqAVv%2B3eeBnTVFzV2YfprN3sR83UKh%2FI7BXA9eVRhy1O8Xlit86FUoD08SLHO6jqQrVcyFIjz0MP11z0QJvybXrDaLdVbPoVND98gaLFP9RuapBvHUtB20Mew3C%2BemD1uJkXYhcD5lWXPjpjqY8nJC3AzXDRXdIr5LH3dKPQDZadx5%2FFIotISbTWO%2FZ4cHW9IKsxsuAXYaOvcFsZKvs2Iu9U9EzLWGazBPaVl4eHwWG2p%2BusJMk2xWKD2Fr6KLarfu%2F5eRk82%2FDeE1jC5rLLLBjqkASsSFDDiQh6xbAi6Dn5z1usXp%2FpL5C%2FOlwWTxSPi1vbP7JYk7u%2B%2Fy40UZz3l3URp9RHRj%2Fvcuot32hhtxNKmG1tm6FvzJS4n3FXoojbzmS0WTWLYNwlqlKwipjhP8mC6FlrRFfO%2BQc%2FfUKK84UJhcmBsM59FPwvsbqv0CMZwZ8XQpkMpIsWijllYm3pv%2BFpNatrqOl4d6TeJGUtUxknwpZnZctnW&X-Amz-Signature=470ef1b2a5f443cb35ca9347b8762200e02f9ea4486346e2819659e0741564d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WM53JCMN%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAzsrgLxhpHXpQMk045H7v6cunl1BaL1BAO5O3yaoTIYAiBWLHzqnt%2Fr3VmEh1bhkPfmSWe%2BkBOkacTkzA2V23N6CSr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMuoSkmUl%2F1FBWeZnZKtwDnUX9EOpDvGqN3AiJ0pQBv9731Xi4L%2FGS9asMbJlp2jqyViGNEOgjveT7Fg1riVf9SJTqBJZVZHTy69zfPkukZsfTsJa31PPtqgRY%2FHXbppdXnBVBBWw1FwFxWOdZ9O4NgAe6tek30rsyuE25ulhBpYJ85k5Q6y2bcyEmtNyn%2FVp3k%2FzcN0eAS%2BeL59TvbvFuwEWNKt1yjVupR9Oy%2BJx1Iizk6qoMyOa%2F%2BS6%2FdCorpK%2FBMXK0zcbW0yV9QAxu1jzbmHn%2FM1dkk0qURp1R7jxFPM9fs2QWkF5GRq2Ec2haUVzx0qCocSDkKr3eZRp5zO%2FUEohYULxeBAn5CGt8wXK7VLXlP0MpYpYG8R5tVdgxcbkcLolxwwWFvBp%2Fo9S68K9iZNC1lEjsveiqVUDA%2BaW5jCb19TBQWZLfalKAoT0WU%2ByZuA2LIGjeW6DJucSaIaOynGwyM2zQ7ccqC04npFaXUOb4Nr4%2FlQyzy%2FjMLZHARwbdfGPaxy%2FDlJ%2BAE7dLCO4XO7Y61qrzqE9Gw4vtJC9i%2F4sAyGTpEVy8te%2F7Q32S2MiS9stYzpexnoh8Ne8c2h5rboPbR1c6jwBetJbMWkmfvQp4MVWFEZhRPKJeUGPJ3X6lhCeT4asaxPRtlNwwyKyyywY6pgGPCs7%2FAMLy%2Fa1STrWZR0njcT79cOoWI2HrqhsXz0zHUBL%2B3%2BtO3%2FVhzn32QQZsLDkXikX%2BCBx7WmRSbB0q562gJYftNLYAeMBtluOq7aiPQjrMLEt%2BKHyeQ4ntrM%2BDp4CKI0ODQ8pYkl8syb7QSG%2FGO8n%2BhSYZhsj1fxwfJwHHbqAhrISHw0XMyVQ1clLM5bDS8t6Umrh3JnriOIDfPoK%2FzqcjlV7U&X-Amz-Signature=efe4d46515ef66ee3dae433ba693e91cf0866c3d50a5657ca86dcf93a2e3a622&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WM53JCMN%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAzsrgLxhpHXpQMk045H7v6cunl1BaL1BAO5O3yaoTIYAiBWLHzqnt%2Fr3VmEh1bhkPfmSWe%2BkBOkacTkzA2V23N6CSr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMuoSkmUl%2F1FBWeZnZKtwDnUX9EOpDvGqN3AiJ0pQBv9731Xi4L%2FGS9asMbJlp2jqyViGNEOgjveT7Fg1riVf9SJTqBJZVZHTy69zfPkukZsfTsJa31PPtqgRY%2FHXbppdXnBVBBWw1FwFxWOdZ9O4NgAe6tek30rsyuE25ulhBpYJ85k5Q6y2bcyEmtNyn%2FVp3k%2FzcN0eAS%2BeL59TvbvFuwEWNKt1yjVupR9Oy%2BJx1Iizk6qoMyOa%2F%2BS6%2FdCorpK%2FBMXK0zcbW0yV9QAxu1jzbmHn%2FM1dkk0qURp1R7jxFPM9fs2QWkF5GRq2Ec2haUVzx0qCocSDkKr3eZRp5zO%2FUEohYULxeBAn5CGt8wXK7VLXlP0MpYpYG8R5tVdgxcbkcLolxwwWFvBp%2Fo9S68K9iZNC1lEjsveiqVUDA%2BaW5jCb19TBQWZLfalKAoT0WU%2ByZuA2LIGjeW6DJucSaIaOynGwyM2zQ7ccqC04npFaXUOb4Nr4%2FlQyzy%2FjMLZHARwbdfGPaxy%2FDlJ%2BAE7dLCO4XO7Y61qrzqE9Gw4vtJC9i%2F4sAyGTpEVy8te%2F7Q32S2MiS9stYzpexnoh8Ne8c2h5rboPbR1c6jwBetJbMWkmfvQp4MVWFEZhRPKJeUGPJ3X6lhCeT4asaxPRtlNwwyKyyywY6pgGPCs7%2FAMLy%2Fa1STrWZR0njcT79cOoWI2HrqhsXz0zHUBL%2B3%2BtO3%2FVhzn32QQZsLDkXikX%2BCBx7WmRSbB0q562gJYftNLYAeMBtluOq7aiPQjrMLEt%2BKHyeQ4ntrM%2BDp4CKI0ODQ8pYkl8syb7QSG%2FGO8n%2BhSYZhsj1fxwfJwHHbqAhrISHw0XMyVQ1clLM5bDS8t6Umrh3JnriOIDfPoK%2FzqcjlV7U&X-Amz-Signature=7dd6f5060211ef2e20ceb5d7399638659ef4e44fccf53201f1d6d4e4fd80460f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CV3PMDT%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRQtwP9ySSGSkaW9k0ih0zjn659IcakT5sljijWyHltwIhALEaEBVjmT6Wllb%2FLikDxckQTIdqCt%2FAgcNKcnAD1k43Kv8DCHoQABoMNjM3NDIzMTgzODA1IgzwZ1XOgquzuPs0j4wq3AOF%2FxWi%2FrX9wG5ibsG7tLAKU23tWdW7EsTQgI16SiVKIlqZEaBormuQ8zb3U7RCvgZXROdQPw2n0soUSWPIMABQ9oH726xPO3%2FvCmrgiCz547gugdIi77z%2F6gFdISP2BvinZ0esdYt2xKxxn0Wu83g1%2B7LgW3FTQiWxh9aG48WiigYoNWiX1R7SW%2BoBrH0YK1Mo7WmNE3dqh%2F1pT8R4gDNZMOI4678AYxfJv0nMVN8R3LnXm0t%2FQvVTbJeRK5f4Dal2RdbrP%2FA7S%2FD5YOOWK3S0yMpT%2B4uw0P4MVqwXhMLX9qqelSXPIoqaoqqaiCOEaCgEfAntci%2FnUHU8yPtAfS1wBPeErv8egwKIq7oLW7cAzeGmlYR0URdfR914iRcbTc1dRqnalFM2y87Da0dM0HoE8cn0uSS2ECFxo%2FI38%2BJqyd7mu5%2FUQt%2Fj6wkRDO3qkGZkzVefGDOoWsdtFCBtkTaDWucbNwLtUCEg0jOrXeZMsuEy1%2F7d%2BwRneNu6nEEiClTwoV6zR8fmkFgunPajwQh21hZ6wJZCJBiGJh2NAGk99f8ps9k1baxn8YosRxH4zdj%2BY1eHkpuB2qUWzC%2FzL6HhXkoeEsY7aW4EQ1Bqzjo02MgscDgtCBtlbk2gIjDJs7LLBjqkAaa%2BLLAIqUYeI8ACf7iJnIHMjoWu78u3qu3cGlA773TmMBT7nPPTggTOJsKnXpxBaqAB1xHPc%2BEGsbQtb6260l2He5H2x%2F4zof%2Bqhp7yqzCagJGRgVywxVU%2Fo6eSu3j5Edv0iYIV5k%2F%2F1OTheXaNtoztYPKZvhYT1FSbR9JkNuydQK%2BJIZunMEXB1eINWw7r001YlV5UwAC1zzfyNMznDJLd6x1U&X-Amz-Signature=d5094c0110325964da23fe49a12e9776c04170cc6499ebe3245af64d8498cc05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGUMQYR6%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICtqwJOg1rq8JLfCdXAFZUiU%2F3II9qWCH6tSgDipfvXkAiEAx%2Byn9bTLV%2Bb%2FloLjlyVLcryiZ5q5aEk4SWEw444BuJwq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDEOK0Pe9LkvqyE1PZSrcAzp6bEk%2BQqBQxfY2vkqbM7GX3PKzVEn7SxhyOnTIRPPo242F6QEIUmZdBXQmWiAgbYC7A6dq%2F6Hmgp23CoGHpTnc6pTBQDrPBaX9gSKSqZ8Kt5O1JJWAfCijpCXfrbtOzowbpZDzvChfRs4urxeVmfRQ%2Bz9qLF%2F2qMuRLViNksN0iDvM%2FA80l%2FdAUEy%2FVB327J3MkDG2S5A%2BcW%2F17Dwycl3YAKk54zeDBwVLTYySv7DImnQLmrHhyC3j5OGb6gaeso9vXGaE6MgsXPWCOVqk8oPtlmnBhp00zCSdEkG8NJI5AV5OB7c%2BkfNcbD0ilSvkLyd2%2FQlFMIzuZ29TKAM%2BkVNp7mMx48Gn%2Bp%2BjuNzPaKqp1rNYm1jWtagLRdmxjesUpwriY27Z%2FcE5vmf%2BzoGRVxpzfrx6kFDWi0r6E6fwhhpKNWbJ%2Bh9ipKKVaGV7a8v%2B9f8fYKX9eSgWZkrOt6px3vE3Ge2OgRm5%2BhsAP5zpnHOQnwOimbCC3B5w4U3iU4cIxarS3Iz1nmJx3P9Ja0M5pb3IJQhim5M6DgHFzmJH1eqdy1aVJLl%2FNSCUSvp4cf8ILcUxUPmYh0TwuoCr96Nr0%2B1GjwjYOhKntECaF8OPM8rkaFl5deiMkiHoOO8sMOOqsssGOqUBolLilJyXIDKkyNg9KItDyBCWNSv2%2BKOy6gAFrQv7wnfvSMqBr7XCDogDvQnYzJi4vKaa8VuOF2uehCV6ZwFQ%2F%2BqaBZ9b4B37oq7vS9yAYulY7J60kZ6%2FQr1LSPbL3zlur07DoXjIzGLbUxGmq48L9jGiO4X5M%2Fw78mBYj9K5lX93NsfQuk0bc%2BgcloBjKUPDyYiGmCdfFBxbIh4i5256zE%2FnuKm%2F&X-Amz-Signature=3b231aca866f94f8dfce19557bcad3ee0e73253e716244140dc53bd57cc3bd0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGUMQYR6%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICtqwJOg1rq8JLfCdXAFZUiU%2F3II9qWCH6tSgDipfvXkAiEAx%2Byn9bTLV%2Bb%2FloLjlyVLcryiZ5q5aEk4SWEw444BuJwq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDEOK0Pe9LkvqyE1PZSrcAzp6bEk%2BQqBQxfY2vkqbM7GX3PKzVEn7SxhyOnTIRPPo242F6QEIUmZdBXQmWiAgbYC7A6dq%2F6Hmgp23CoGHpTnc6pTBQDrPBaX9gSKSqZ8Kt5O1JJWAfCijpCXfrbtOzowbpZDzvChfRs4urxeVmfRQ%2Bz9qLF%2F2qMuRLViNksN0iDvM%2FA80l%2FdAUEy%2FVB327J3MkDG2S5A%2BcW%2F17Dwycl3YAKk54zeDBwVLTYySv7DImnQLmrHhyC3j5OGb6gaeso9vXGaE6MgsXPWCOVqk8oPtlmnBhp00zCSdEkG8NJI5AV5OB7c%2BkfNcbD0ilSvkLyd2%2FQlFMIzuZ29TKAM%2BkVNp7mMx48Gn%2Bp%2BjuNzPaKqp1rNYm1jWtagLRdmxjesUpwriY27Z%2FcE5vmf%2BzoGRVxpzfrx6kFDWi0r6E6fwhhpKNWbJ%2Bh9ipKKVaGV7a8v%2B9f8fYKX9eSgWZkrOt6px3vE3Ge2OgRm5%2BhsAP5zpnHOQnwOimbCC3B5w4U3iU4cIxarS3Iz1nmJx3P9Ja0M5pb3IJQhim5M6DgHFzmJH1eqdy1aVJLl%2FNSCUSvp4cf8ILcUxUPmYh0TwuoCr96Nr0%2B1GjwjYOhKntECaF8OPM8rkaFl5deiMkiHoOO8sMOOqsssGOqUBolLilJyXIDKkyNg9KItDyBCWNSv2%2BKOy6gAFrQv7wnfvSMqBr7XCDogDvQnYzJi4vKaa8VuOF2uehCV6ZwFQ%2F%2BqaBZ9b4B37oq7vS9yAYulY7J60kZ6%2FQr1LSPbL3zlur07DoXjIzGLbUxGmq48L9jGiO4X5M%2Fw78mBYj9K5lX93NsfQuk0bc%2BgcloBjKUPDyYiGmCdfFBxbIh4i5256zE%2FnuKm%2F&X-Amz-Signature=3b231aca866f94f8dfce19557bcad3ee0e73253e716244140dc53bd57cc3bd0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SHWAJJT%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T132121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDbRgUOv3WJszzojEjipFYPE6gT8Ak6Q5zf%2BQB6YT6JlgIhAJTkrVNn57FoVzHXOZbvotJlOL8zCvdIZsBa3lxQGejQKv8DCHkQABoMNjM3NDIzMTgzODA1IgyFjaPMX3neFoU%2FdvQq3AM89Z8viVSLaqdQ8b8731KBDBCbjP2kYy4rbNGl6WR%2BnV0yVdM34IUlDmP2YPScldvMKvrU3bNr6p6jho%2BjjQE6SPKetvQz%2BzHsw3JUD37XgNyiO61mrH5UUQUcogBpg4juu%2BWXFEBUetwC9fQTSXZ8jDK75roCpxfAJe6bfKnVYLj2FPVpQ7v9qOTPjFQz4yxqPpgqZmfVSeL%2BJP4Iqx1nTfDTC2axnbbDOBnaHyngLo190TXIhB3AKvquR%2Bdae99Q0lUS3gHieqolRW%2BCWS9Qm0ovYxmZ54uiHFobKH%2FjtcCiysDQjtkJvbDloDPrkFfePRT4i6mA1Cn1h2sp0YPQHIUPuSsDzLAdJKhYTje337dobdb1J6tdd2l0NNHiWNgw5Jmy2QWOWx19vzGTsuT3MqWOwcMIFwyVz0zgAl2iU72Y98C1hBiIFRLB4enKYDgmiCn9HASlPJGHl0ndBI70wOiXb%2B%2F7NoO5%2Bo%2FuTxYPzuUTRZtNnCSmAoH3MWb5Je5aXLB7gRYWqfM8VU0J6ZGyo%2FXHeCMRMomRIcyWBT9jJs%2BcYceQfF2zN0uytH7LHqSPj0k%2FmUqNuIvvL5pWOgsJonxlzNPz7xKpnDcRvZeE7Ulp1W4pKqONz9gfnDCJr7LLBjqkAf5%2B9eaaRMdgCv%2FDu77v2EQnZTqquDQ%2F%2Bm1yTE5cCbs87VtVnn0zsMJSsPebYTHM6LgOUGVYF44Uy16saFnTQdYUzz%2BZC5meAYxyPK6cMlVS%2BiWfUeIRIC2ZDtBRSZnbHmS2gO%2FHjRcDNRF8yTXPma%2FFqXKHABKyK9uW3twyj35NPSOoKa7Tv%2FuE7Po0WN7V39SoMqaOTJxxGZFsvMyI7mdci5RS&X-Amz-Signature=a78606a4d59d110c29ae7f1d5ed7a111bd2500278f3a13fd77a96f834d85e875&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

