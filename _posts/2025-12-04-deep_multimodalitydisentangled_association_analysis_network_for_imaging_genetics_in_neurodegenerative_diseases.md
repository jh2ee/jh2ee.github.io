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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IKFIT2Y%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCZOi0p8QPRIO%2BptgDhuFMAGyg429PcNCDGX71l%2FYKgVwIgGRcXnSdP5uwai7wHugbVMQHuWeuscflDg5z8yKXJ5Noq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDBm9efPa%2FTZ1bpuMBircA00OHKuhvTRQCkAyDPzUuchPneuSDhJfbtlPQzQnUAFT6aQmvrJWdJZ3bIIdrZMagsXt4aWHK2dRAr16hUooJN2NSIqHZzhv7h4jDRvm4AxY3phMO50BVfi0EGxMYLrS1UW%2FRZBcIOsX5GVuggupBE33WTho43jvucWC%2FTFZ2VIlk7P%2B0761lWhA6wAkopx%2FuU66chb9gOuJFTdeh17M58wbl5C%2B%2B1HqqvhdnWmXkjcNLaCfjboFnbsR7mF86kMYTdzHdbsZZQnnQGf9Z2rZ4D1c6dG4vkWgOOr6xTor%2FMnhkfX0kCA7wvJAaCNYDKUjpHABbxCuF2nEvd9fwJ8UF9%2BcnEm3v%2BLxNE9InBTwFmdqRCiwlCds03K2qnokQKVhmBC0XEz5yQ8YpdBk3pJqq9eTqmDeZW9RBCDhQKXYRRwS1%2BbEH7XQcsy0CmRlLAwxjfENjMKUMcyZAzyqv4eR72%2FLlFV8WEFsu1qLbgytbFaRLGAYucgiufNGzSzz2gptlPuURK35fUMqCzIiKmka24AWjFekbdGYVBTij%2Bm5dVK7iJHd37nucDOD99wkObCZ0J9Hl03wk13y1QA%2FJCKuY6LjzuoRQ6e69D74c1e8JraRB0M9TzpYCivLttnTMLiVqM4GOqUBq%2FGLEIlN%2BDtLkkHkmmEyU7vSsU%2B82s6D6u6K%2Bq1hB19Bh1kg4u9UdwBIQVhi4eDfRpScgjNVkwPF2xzTw2VDzjc%2FQDoTEiAlMCFitymiNxxybcrHw4kn8yKTq8WOLF%2Fz7Cxq4Q0QkWF3NjlR1kNuE%2F8BLGGPcojECn%2Fiokal5Kd7BTKf%2BQJQcvR7VxjwBvCI4Loyj3ooODwfDzuQnXriUcDAlQgO&X-Amz-Signature=32c9d8105bdb6e0c65bccea30c06683c74fb7c52c026cf49b6d67acd834f30a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IKFIT2Y%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCZOi0p8QPRIO%2BptgDhuFMAGyg429PcNCDGX71l%2FYKgVwIgGRcXnSdP5uwai7wHugbVMQHuWeuscflDg5z8yKXJ5Noq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDBm9efPa%2FTZ1bpuMBircA00OHKuhvTRQCkAyDPzUuchPneuSDhJfbtlPQzQnUAFT6aQmvrJWdJZ3bIIdrZMagsXt4aWHK2dRAr16hUooJN2NSIqHZzhv7h4jDRvm4AxY3phMO50BVfi0EGxMYLrS1UW%2FRZBcIOsX5GVuggupBE33WTho43jvucWC%2FTFZ2VIlk7P%2B0761lWhA6wAkopx%2FuU66chb9gOuJFTdeh17M58wbl5C%2B%2B1HqqvhdnWmXkjcNLaCfjboFnbsR7mF86kMYTdzHdbsZZQnnQGf9Z2rZ4D1c6dG4vkWgOOr6xTor%2FMnhkfX0kCA7wvJAaCNYDKUjpHABbxCuF2nEvd9fwJ8UF9%2BcnEm3v%2BLxNE9InBTwFmdqRCiwlCds03K2qnokQKVhmBC0XEz5yQ8YpdBk3pJqq9eTqmDeZW9RBCDhQKXYRRwS1%2BbEH7XQcsy0CmRlLAwxjfENjMKUMcyZAzyqv4eR72%2FLlFV8WEFsu1qLbgytbFaRLGAYucgiufNGzSzz2gptlPuURK35fUMqCzIiKmka24AWjFekbdGYVBTij%2Bm5dVK7iJHd37nucDOD99wkObCZ0J9Hl03wk13y1QA%2FJCKuY6LjzuoRQ6e69D74c1e8JraRB0M9TzpYCivLttnTMLiVqM4GOqUBq%2FGLEIlN%2BDtLkkHkmmEyU7vSsU%2B82s6D6u6K%2Bq1hB19Bh1kg4u9UdwBIQVhi4eDfRpScgjNVkwPF2xzTw2VDzjc%2FQDoTEiAlMCFitymiNxxybcrHw4kn8yKTq8WOLF%2Fz7Cxq4Q0QkWF3NjlR1kNuE%2F8BLGGPcojECn%2Fiokal5Kd7BTKf%2BQJQcvR7VxjwBvCI4Loyj3ooODwfDzuQnXriUcDAlQgO&X-Amz-Signature=32c9d8105bdb6e0c65bccea30c06683c74fb7c52c026cf49b6d67acd834f30a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNG3GIT4%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIAOZmMwzbdK8v776xbbGHlGlJU8bK22T5zRxlfOFfsnMAiEAzBu6mxELd%2FwIbPjayUlxjZD202ZqIS8LF99av1X8K%2FMq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDLl1dhvlK9CHnngMlCrcAwAvIunLXe2iTey5qIuS%2FWfDSxkF2w%2FX%2FS8fcNcouzWUkBqr0qHkxPPQQp36%2FpgCoh8MOwo4lCLZBXFuqQcROJ%2Fd1opX37hUoAm3PWHExYgMeFPI1av0Cgaumf7SMNoACe0MYv0fIFiNrMVG00HhfwiICsVAsS2etk57XNAfv88eu3xI3evmgJ5f1XHIIJXIrRRbFY70m5u3OMSJh9w%2BoyFNXdjRWk8CitDAIyCuJtF84nl71XBYrRXYdYkpKVeM5%2B9uwhS7Xq8YlXjGdRJ46hVFIJDqnZcwH6rirm4sh5akOCVwLLcJBPcrT6u5C%2BXYv4ff1327eaKEaULIrRN7coqtl3fInBzzjdkZBWDO3xILeaUMfjcKLQYUWZk4Nqi3H17G50%2BSgEEG2gJHuO2FdRkbIhg1Py0CBlATl72dIYrbzVW4wyed1f4o8RkTdIfxsttPGP%2BAZdnjdtLFK8bNltqEEfEvWfb17FfzBjuUIPgLnbYim95uoLN01gZMDzuP38sAXHzJVJzZ%2B9WbnrieeBmiApq3sIhv6wCLXOwscESypkUg5elcHak71VC%2FtvOY82mBl7NZk%2BvtnFRsIH6FPObGNWuu132bMRknJdwjuyC%2ByIGd4VGwcq4TyIZfMK%2BWqM4GOqUBtM%2F0w0HdHpVC%2FeQFA9fZ79MzJMl3Kha5EDOUB1FtTBwY9QR7pJfDXHzfMCZJSVMlai3YVmGj0deGY%2BQ1NQsr1NGkuIWgJOZxMvhG29o55Ik51huffNj%2F5F9ng4nSThDH03pmrzRZuCgNElHd5zUx9HMfL9vtw0fQEZQ3i9j8zoIg2517bnQrVuulSik%2F2Tcd0m%2B6u%2FNzQJY437w92oaxETnb4EQY&X-Amz-Signature=7031f7610b5ce9bd79ba7e19cdbf9b65ace9556e9fff2b3cca1a760edb012389&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDFVXXNZ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDLg7jmYwE%2FVVcrwpNwr7wdYF4YdhJ1jaxC3qfjnmgAhgIhANEqUQK6p197Hj66aCGf3HWfOAvDKN98FW2X5w1LETy2Kv8DCB8QABoMNjM3NDIzMTgzODA1IgxpOw6DxTFdlcU9URMq3AOGB2KnjpyjCgUqbxlpnNgBeQtPBdM2tH5%2BntT3rKexLeffQzkrNiIXoeuKUqcG%2BM24Sec168UP1xPE%2FLyaiHG9AwUUEfdx0Dlzq1zkCyAo3jW%2BakO0SjMILL8hQr30gj5uAYWzvr%2BZOld4sM2bluI%2FZ3TaBCKXtppNbt73PWCFAKDp8VYy4mbGf7c7lPDqalLBWyHSzbr%2F3wrjjfdS0F%2FoFc005ZsvWUeaPX54cOUXttOPVZNC8hVrLzGaiwdtoSiSnUiBF6PB%2BptEOMMDf4%2Bob2X1sTqz6AoBQNUaXT3RhTaZXFY8IXAKuVM1EgH1VjOHOW2E%2Bl164UfG28j7A%2FJpfXLkkHcRDtQTXU%2FZ47ii37NwZBKAdRWaxFu84ZleZHkT4FyQ2SiDfOg6TTwlv%2BZSPT5sz2rRWIlVhuaOJXGndT6ceM%2BPtOb%2F1EInQDgIl8rbUwX946r3xHbdpNpc1Gmo2YJGy2xyTyS%2FU1GlH1Qd2VHsBN0cZMbT9PfJDlbf4MejTQyOy2g6CNjFh9CbJYYOAv9%2FFHoioNjEfnJYe6R0pyxOGnmzorZQi2TAwmB8xaZQcuzX59zA6o%2FlKJsgpKhINkThh%2BMQUredlV1ZepOXZdfw%2FHZ3gKZ7uiBEFzD4lajOBjqkAT4pj%2Bk3VZCWZqNHLA%2Fi7PKyKAjMUc%2FOCqCt3ei%2FBaCgE9dDqWp5Moa93uMFGDWF%2FUI%2BbE%2FXR%2BHPvb89SNlnPnyn3DKAijr%2BRlsesyvq4ORUP%2FqcA%2B0pGc8OKt2faPQ0PMFggiU8o7QKPw8VXg9jWrfkT%2FmXUPI9hQhEPNd21Uum3%2Fyrsdj8MmEtfNuh4GnMOy%2FfQCN0zL87AzsWZ0vfSh6O7qZX&X-Amz-Signature=c7638eaa02bf7380951f2e0bc7ded06d769b5447c06eac8db73127822c61bef0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDFVXXNZ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDLg7jmYwE%2FVVcrwpNwr7wdYF4YdhJ1jaxC3qfjnmgAhgIhANEqUQK6p197Hj66aCGf3HWfOAvDKN98FW2X5w1LETy2Kv8DCB8QABoMNjM3NDIzMTgzODA1IgxpOw6DxTFdlcU9URMq3AOGB2KnjpyjCgUqbxlpnNgBeQtPBdM2tH5%2BntT3rKexLeffQzkrNiIXoeuKUqcG%2BM24Sec168UP1xPE%2FLyaiHG9AwUUEfdx0Dlzq1zkCyAo3jW%2BakO0SjMILL8hQr30gj5uAYWzvr%2BZOld4sM2bluI%2FZ3TaBCKXtppNbt73PWCFAKDp8VYy4mbGf7c7lPDqalLBWyHSzbr%2F3wrjjfdS0F%2FoFc005ZsvWUeaPX54cOUXttOPVZNC8hVrLzGaiwdtoSiSnUiBF6PB%2BptEOMMDf4%2Bob2X1sTqz6AoBQNUaXT3RhTaZXFY8IXAKuVM1EgH1VjOHOW2E%2Bl164UfG28j7A%2FJpfXLkkHcRDtQTXU%2FZ47ii37NwZBKAdRWaxFu84ZleZHkT4FyQ2SiDfOg6TTwlv%2BZSPT5sz2rRWIlVhuaOJXGndT6ceM%2BPtOb%2F1EInQDgIl8rbUwX946r3xHbdpNpc1Gmo2YJGy2xyTyS%2FU1GlH1Qd2VHsBN0cZMbT9PfJDlbf4MejTQyOy2g6CNjFh9CbJYYOAv9%2FFHoioNjEfnJYe6R0pyxOGnmzorZQi2TAwmB8xaZQcuzX59zA6o%2FlKJsgpKhINkThh%2BMQUredlV1ZepOXZdfw%2FHZ3gKZ7uiBEFzD4lajOBjqkAT4pj%2Bk3VZCWZqNHLA%2Fi7PKyKAjMUc%2FOCqCt3ei%2FBaCgE9dDqWp5Moa93uMFGDWF%2FUI%2BbE%2FXR%2BHPvb89SNlnPnyn3DKAijr%2BRlsesyvq4ORUP%2FqcA%2B0pGc8OKt2faPQ0PMFggiU8o7QKPw8VXg9jWrfkT%2FmXUPI9hQhEPNd21Uum3%2Fyrsdj8MmEtfNuh4GnMOy%2FfQCN0zL87AzsWZ0vfSh6O7qZX&X-Amz-Signature=1bf5c2dacef65903643a50466a28cb3390fe459bd5a472c1b3370dcadd7601d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQUV6PW7%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIAL%2FQkYc7YJOpExGnazMYCL60XXa4sKAo0LJJ%2FU4sC30AiBc5ArC96itE4iS3KMs1wyqLx%2Bxy122KCV3Szx2V9OZ3Cr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMGDmYphD9bVWOit5bKtwDI%2F07SSZtiAy6racZifRK7DGwQmG72Kfx99spSLanCBSZbIv7uHfH4WSe9ZdL2%2Fmm%2B6c1B%2FpsW7Rjm%2F6Cp8brwkpNPWHqkZwhU2QeOisG7MzevTVDXIx4pSvi5wZyFK%2BmTauFM4006iRh06adVFwOcV8TTAxAe%2BMSxZ0jJJa4pfwRKucZmrPwDqBlakuLtmgcmgr445vo5iPWwfMK0%2FlpC9ZqHo6Eubu4EHcNLgkEnNGv8i%2FUh4ewVpOabzbe4taUm79uwaNHZrzzilgudM1EJcdVuQwApQXQDNuh9EOAX3HJavVnDbp%2BterICiNZa%2FadDegCkDnFKueuw0bX5wFN5jorNFCElUhAvMNb9BTfSi4bGuagRjTvnfCBixhKPjaXUWbJ0Vh0QymCL9nBGWiA5MEee5rAp2y8KVeLFt1pbvpMAlveevFJXyERJOpif1PoHaMsOxD%2FxWwZ2El5VTVLAPQfCs3kTiaXDdSOcB3%2BxJbJn38wfH6Fv4Zi%2F4vIDVV%2BsZAzdYdMED65jS9%2B62KuFlE%2BxYPL6F92zaD7i3lm47%2BR7Wq%2Bm3x5F51KgBIpy1sjkjSXu5PqX1m%2F8ItUGjW9sFNybRzvMlMgWVCXI0UYBTn9Hxc1aXSkqu6EVJMw4pSozgY6pgHaoPQBwLkvieR6pLO61hPes%2BtG%2F1Ly01oIaArH6j8lExWA32XMgDUQVZF784tAVxvxPjlK83SO2vTAzzzkS6E%2BVE0miIONJg%2BJhJmh9XmRKvn0ZKXtEji7VqdrEmEu16l2VM3EHk%2Bwo%2Bho2NGhu%2Bo8%2BOHKuG51QN2ID6%2BUkFGZYed1d5m08WzjIjKAP5ddNmMazzRISNIKXDKiCDR%2B2eLd6IjXauIr&X-Amz-Signature=1ab50f55df1ff19675491bb9352a9d55b11788ca7cf9fe6b80150e9ca3a5af6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HNWLSYY%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCHkEYsWKLsM%2BQmtXcZljA7%2BY0sPcbVjr2R9LKrmXPPDgIgKXhGzMcVd%2B%2FW%2ByEqzEApMVhA2LQvpWvoD8PtkkidG7Iq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDIh92syCXqNDOMaoAircA27gQwglSwDVt03mtTPw%2FXRRyfCsTakWyfjW3K2URkuM05Trn8XqXOT%2BqxZWVv5BJNFQE%2FfH71mNw1vs0g33n7N9AZakM7U4X%2BsF6Y1pOqOLtG36z5cGFNMlXqQmkcPxBrLYcCklfHBvxBfDumXXDBfeD2JgfBz1wP%2B%2BHdSaTm507w5OXvzV8%2FfyKRmVhz3TTh6MCPRShutw%2FtfRk%2FNFCTX%2FoKAE5AgSusKxgq7ECWubUOVLgJnuyjzLmLYpHLarXL3AaHkD6nP9HTzrq6l3R%2BXyWpG0U053OuWGjYqk6ZILYBjK0WOmSsdvFK3DmyMJ29ZjEyXDCjaIn81aKUL0g7iFPy2NnnSnLTrTZ75yI400aAbgC6cRiX%2FZ53LhYyE2seZjoCPsXzfWuSHhU5%2Bqz6sTGhuBaNkVpwiXIgedEsLAdJao%2BJNRS8uGS7bRwAiGoX7b4pzAxKwrWFERZ%2BoFicWwGIhZOMuj3sEJalmgbTbECtKnTSKMG3sYvHEHJYqAdNONhg%2B8o9ZbM3Ad%2FDm5i%2F43umaGcIfpof9TkOnRbzlHVTY1o7uJGiiG6m5HrP23VMpz9FJV%2Bd%2F5bcSih3j3vIWbTiq%2BpQL7qOlvp%2BAKNeOmMzxwwQ%2FfEnJF65NDMM%2BVqM4GOqUBiJX624B6%2FPw92A90yeft4j7pI5PaZJ1cl%2Frnfdu5yRXkBPrLxLp2LuwX4YL957aZ7dlj6SllaDlTJmnuuBVHVVuuh3mh1bi6fs7M1op%2BET3hM6KFTgbS2gHIBn1Lrl%2FWNGhfNB4YazSK95W79sRGor1Kneo064aqqsp3fixoWRkEvZucq3E8YNB60ArT0U50jrY0XeJErCNXVp5yzKu1nje0hzA8&X-Amz-Signature=5fb1ec0865a0ef40314c36529f8b6c41d2f6c2749221cd8a86960e40ee573338&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6COQKTO%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIAk76hkI34J9jgFQOhKYT1fu0zsB1TYyQd4R2y%2B6HZ9hAiA9upHIBwF0pq9szI%2BPZ8sFLTlvIwAdoGJkzFthcmA3vir%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMUrBkbigv8qvQ3miuKtwDsQ7Q3m327t65Up48Keli5qqWXLsrbQaXsfFfJYIMDZARBLCTaSbyjKZOiFTNx1giSfmBD9gWlP6%2BSsirxvTAf%2FTA%2BgJUNOJC3UqD4%2FER4PylcUguYxkTETg%2BhZWJF%2Bjm4ak4Zav%2FqbBWwyR66C%2FGSdtx5he620FQzZKAIyj3Sil1O%2B94pDgR5L14cX9kPg7HAZtXMfkHfedjm0hPkaw9I1nxdfDN4LXZXnPDRxWtvgdged1A%2FTRyyD9Ox%2FoFjE9j%2FSwgPUiWCfQUf3IFgmO3yxC7UgV0n7%2FppmVVxBuD7VCr9gvDtsQFc%2FXzEPIAGHd8RpkU4MsqAGeA4IsIFmCpPlIWx4DIr33rFTgv4%2FHtX6EciQYbwNT%2BMmZWy5WKKhRkBEc0CgexAPpzJ%2FpV8SHOi2grd0dNz52b2PIDVGbUF5iAQ9DC1oBIKVEFKsCZTy1dElPXMdh5z2GAxEe%2F0hikEnMLHYc5p%2F6mzwEFkcpkuHhf%2BYatCIh1WPaPIiLP87VwIlmmuvZQeVkaxPquZodA71C%2B%2Fq1%2BEjSnRyUgr9HZ%2BlbNghR9sbL%2FNm2cioHp0RdS68gGFFjFhFAlWL4bHY4q9mMs25g5dHeQoopiHAy6mtd93dhAPYP8PbkGUusww5WozgY6pgFlNK%2FBS5Z34HzDcTjLsRveM0NZ7HwiIkYvLQc%2FnegxLat2QZ1v0%2BuaC3ZKjxKJp7r78r%2Fj6IeukdsqslNL4n%2BUPEI8hhqkezjBkgr4ExhN511u5r9X5bb5eEbAHOsxX4BDpPU79KtTqErCLtJW4o%2ByY6MJr%2BhaRFi4vZL3hZKVTj54UfU3LKmrZUo99wwpv2Z%2BXqbG7mxqlKmlpqUwuEhDM48DMaae&X-Amz-Signature=8cccd3706acee52d10eb7e808d7796cff265f3cd6ec3efabf06f220b9a8b8ed9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQZLN7C2%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIBiS2d4ppIuJ9lInApVuDxOCOE3QegmlgfxL1VDEwJGFAiEAj3mgse0xDQfJI3ciha0m6a4ypKtsXKAVdU%2FpD030lf4q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDEu8e9FKLlW6AB7xdCrcAyBIcal3nGLJIQ0M5bDTex5h3xeJH88toY9lymELY8OF4Cnau6qLBpr1s%2FzPvsKh7LOit%2BmuN83zPFVy%2FIhVkIH%2BZTHd2HiJm%2BM8ESdmGtDzWRiY4cJVKcHZtZTll11Uo7ZEYMNWlTNuU%2BuADJZUkoRtfzAf5gIlkKBLmXMsXVFiiB6BH6uRCHEtFo5fhwkqvzI72iz86kNkyzqyg2NFYrbdXvfRM7Qhpi4peyLzdlBpRikiF3xT9%2BFD%2BT95fZNK%2FsXbG%2BI3KbWWpPbxgBSj5beR9r0xMipUGT%2FItUC86lNH2eQfGe7wfEJE81LLo7yQH14PCynF8wbaJE6L1SZy436%2B8oroNp4xzbyTDZGapWU%2FF6mDyWeiSqFYKFUmn6LXKMJaqv8VXMcA7yHbNfnUyppXSxIQqLommbhVW0gINKAqEELzTW6Pq%2BhkDE%2FYx80I8ef%2FJvZofyxWGy20C3zSmFx3zCR76XeGf7I%2FtQIJobsgAHQz%2FiBqMKRrveMqVnm9jkugmxLRdjdOBfI1B9FOcQ8I1lTMsr50F2R5MsKavtZo0Psv%2BfO%2F32MW5H6mfqFhVj0nRJHeitYkyFCyfK9NV2jAKak6bdSCukOB104F0p85WyKGHuwPzRHQ8KoqMOSVqM4GOqUBLwyRHLitXag8rvUKyXfn5p9bDH6ZJ3YlZXxryyuKWxIasg2XLfie%2BAMGw0405j2BGrhLGk2%2BrFzxch2zdTOLb63z%2BQ22k3MMWSzM1a60J2yh7uGryEvsFlMJ%2B3Cdmi2RSBZdxFsTxKiUcGmtA28emyTAQbU3C1RqLcdRZyNHDzthwcju4AXMVpw1PG5ZP4qMwpXbF1zYbJMh%2BEpDD%2B7ighfONbsd&X-Amz-Signature=0b0c1a3ca037b1960decb388d0e602b21a8e3950a2fcc591adf3918ce6d1a28b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQZLN7C2%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIBiS2d4ppIuJ9lInApVuDxOCOE3QegmlgfxL1VDEwJGFAiEAj3mgse0xDQfJI3ciha0m6a4ypKtsXKAVdU%2FpD030lf4q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDEu8e9FKLlW6AB7xdCrcAyBIcal3nGLJIQ0M5bDTex5h3xeJH88toY9lymELY8OF4Cnau6qLBpr1s%2FzPvsKh7LOit%2BmuN83zPFVy%2FIhVkIH%2BZTHd2HiJm%2BM8ESdmGtDzWRiY4cJVKcHZtZTll11Uo7ZEYMNWlTNuU%2BuADJZUkoRtfzAf5gIlkKBLmXMsXVFiiB6BH6uRCHEtFo5fhwkqvzI72iz86kNkyzqyg2NFYrbdXvfRM7Qhpi4peyLzdlBpRikiF3xT9%2BFD%2BT95fZNK%2FsXbG%2BI3KbWWpPbxgBSj5beR9r0xMipUGT%2FItUC86lNH2eQfGe7wfEJE81LLo7yQH14PCynF8wbaJE6L1SZy436%2B8oroNp4xzbyTDZGapWU%2FF6mDyWeiSqFYKFUmn6LXKMJaqv8VXMcA7yHbNfnUyppXSxIQqLommbhVW0gINKAqEELzTW6Pq%2BhkDE%2FYx80I8ef%2FJvZofyxWGy20C3zSmFx3zCR76XeGf7I%2FtQIJobsgAHQz%2FiBqMKRrveMqVnm9jkugmxLRdjdOBfI1B9FOcQ8I1lTMsr50F2R5MsKavtZo0Psv%2BfO%2F32MW5H6mfqFhVj0nRJHeitYkyFCyfK9NV2jAKak6bdSCukOB104F0p85WyKGHuwPzRHQ8KoqMOSVqM4GOqUBLwyRHLitXag8rvUKyXfn5p9bDH6ZJ3YlZXxryyuKWxIasg2XLfie%2BAMGw0405j2BGrhLGk2%2BrFzxch2zdTOLb63z%2BQ22k3MMWSzM1a60J2yh7uGryEvsFlMJ%2B3Cdmi2RSBZdxFsTxKiUcGmtA28emyTAQbU3C1RqLcdRZyNHDzthwcju4AXMVpw1PG5ZP4qMwpXbF1zYbJMh%2BEpDD%2B7ighfONbsd&X-Amz-Signature=309c4a7ea64dc6e800103ef9f3bf04afbd5dff91f648d9dd3f3cedc8d73418d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBVEQTKW%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCv8%2F%2FkCsf2n6nJAylA47Hbql15hLueDaEjqB2AHd44YgIhAKBu6rSB%2F46OfPm8cYriE6H%2Fq6d7v%2Bks3RUJMKBSkXc4Kv8DCB8QABoMNjM3NDIzMTgzODA1IgzTFhqQgTWXjtXDggsq3AM3hJd4Bk2NQ2Jt45T7vbrtK6pIZ2xkvSd8rYNC4HlyQN8apmW1nr9MuIcAaMg9R4AcEcNz%2BBKnfuewKmcSYDy7GgaXpSTGcShGLX%2BniP1gMdIiuC%2BrOu1shpM9gbr02UQQkuMnn%2FQCH4ce3Rmyn44kgA%2BOzxeyBzOIXMzUp7ep2rYCk3lqiljyfDn2hgaJTyyN23SuaX3dlFfc%2FWffl9v43gepnPs02H850B9TB3oOR0i%2FpgePgIGnn3wCLWkpZ%2F8foupEGshqIENMIHaEODYtRfqwCS4htyHqtO%2FDXfL%2BIr38mP8HRh2Sdqei0vCHwHUHEPjaIRJgwhnL3U%2FjUaA66L%2FhNIaxq3S6QVYh4UXOskdYW%2FuCIxf1j7ZHzxRPnZ50tUUmwBEKeXZiKOIup6mnLNJY7vA63R1AuL2rb3rBRouZMAQVJ%2F07Imawx1paJDoI3cKqfPfod8bsKpOQnQInYmHkEjWbmqPxjOMVybVjkcqtOVbfrTu%2F38fQO25F2EEQ6a%2F2MPRpxTUUYCwa0FZIWBiluS4UdYeky5R1vdPx55cYtCPQKHk6B0OEchltbusHTX4RYCHsqyVF8mrk2zAFol%2Ff1jixK1vCXd61d%2BMv3eL6IWkkMJHMuQfI5DDilajOBjqkAaBQzGQYDQOLPVaSoscZco%2Bz4js95%2B%2FwsXVuFMkPGqtQ7aAungYdchiajZDmu1aKGrvqwVP3XEIaU09yCF7YW1OIMIJ06N%2FjL4HpsIu8JqTQUXexy5%2B6y9prGVPEvOOuuY9XIPC1wFtss7dHY%2F7rmivTBt4eeW9pWLLb3SC5bvWWFE%2FSgiJ9%2BaK5JALWeQ5HI%2Bv1O9zDboz2lbrrhpQRsn1I6oic&X-Amz-Signature=b570ecb271b4c75b5e45a4a1dd5107fcc9cfb6189d7d2294c3a8f6959721b791&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SC46QHI%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCYb8UPlFoeS7fNP1hjlx7ebIZiScRdY7ulHCX8jAbi9gIhALfWiIet6keKVwgwCnfAhlyUSeRFSMr3zr%2F1GXmyJ9VlKv8DCB8QABoMNjM3NDIzMTgzODA1Igw3oZ0PnWnywyEuFa0q3ANv6kCgFQdS8eiYhyU49gcY8RbJHnKjnv%2B%2FsyWksdqpaiVHcw6cq7SI6THPbpU0S%2BjjxCsn%2Fvpy2rXA3ORhBz1bpaZ3ZpjMYCF3BmZAkc51rIZj%2FmLZ5nWArU7JngVHSM8fpVV%2FQ0sI3tVcDJd9ABpv348OFAUDi%2F2rXz3z1AaRuz1AbUKqVj%2BFm1YrxGMQJVj7hcfIUcbLzLdbl1OC9rfjJm34S4gdA6gkqH0YnFjPkFuZ1Uy6i8JqHJx3fYzV8V%2BFHRVyKooHNmRCp%2Fk7W4eXlz82U7MOKhMM3D1Q91Ga%2BWnoPe7%2BmxTY9lon32NS3gMIlogZyJCbYh2Z%2BmE6j6E5QYaPMkw881op2475IegEkFoD6lqDvkV6plntcp4Dk6tqZ398QPhP%2F9byTNUSv9JnUE2s2qt7T0i%2FSK2ieAo3PglB927xrOfuzIaWc28XNWoP4ln0%2FnErPntO%2FJkOaJgzH3%2BR0LPvs%2F0%2F5h0AE5MI%2ByDBSIfGgzSg472AwRVXuYiEy%2BItOAZLZ%2BuYVePmY1q1Fm0owQb7rCoQjd0hsZO6rTjdLvUT8r0Y31kIhQRA75xkl3cRsSJp4cnaKhw2gRWO9Hg0W%2FQHVLls9kvr8OtlzNOxtlGdHrB6oRzDkzD4lajOBjqkAUMqxeECU9p3BrxFOOdI9g9VNWMmkeD3EMU%2BIlegcgej6z%2FxQ9tB0xvCQSPNVj%2FMg%2FwCSk1X2Iuy37e6kr4i9D%2BC0uKqrCR92b7hsiiEFw6siGVh06hhq7Xezfot4Emed%2B6p4D3rYyGMsipxdM6u8oaJXp1FkXNiwjHWF6DFfHFAtz8xtwX%2B8siWMCeWRxXOq1NKibC1f5hS56uz7Hz805gQJkeQ&X-Amz-Signature=7fcae56e2699a0f5155446cc68474757563eec3d9eef78060be621118daefa56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SC46QHI%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCYb8UPlFoeS7fNP1hjlx7ebIZiScRdY7ulHCX8jAbi9gIhALfWiIet6keKVwgwCnfAhlyUSeRFSMr3zr%2F1GXmyJ9VlKv8DCB8QABoMNjM3NDIzMTgzODA1Igw3oZ0PnWnywyEuFa0q3ANv6kCgFQdS8eiYhyU49gcY8RbJHnKjnv%2B%2FsyWksdqpaiVHcw6cq7SI6THPbpU0S%2BjjxCsn%2Fvpy2rXA3ORhBz1bpaZ3ZpjMYCF3BmZAkc51rIZj%2FmLZ5nWArU7JngVHSM8fpVV%2FQ0sI3tVcDJd9ABpv348OFAUDi%2F2rXz3z1AaRuz1AbUKqVj%2BFm1YrxGMQJVj7hcfIUcbLzLdbl1OC9rfjJm34S4gdA6gkqH0YnFjPkFuZ1Uy6i8JqHJx3fYzV8V%2BFHRVyKooHNmRCp%2Fk7W4eXlz82U7MOKhMM3D1Q91Ga%2BWnoPe7%2BmxTY9lon32NS3gMIlogZyJCbYh2Z%2BmE6j6E5QYaPMkw881op2475IegEkFoD6lqDvkV6plntcp4Dk6tqZ398QPhP%2F9byTNUSv9JnUE2s2qt7T0i%2FSK2ieAo3PglB927xrOfuzIaWc28XNWoP4ln0%2FnErPntO%2FJkOaJgzH3%2BR0LPvs%2F0%2F5h0AE5MI%2ByDBSIfGgzSg472AwRVXuYiEy%2BItOAZLZ%2BuYVePmY1q1Fm0owQb7rCoQjd0hsZO6rTjdLvUT8r0Y31kIhQRA75xkl3cRsSJp4cnaKhw2gRWO9Hg0W%2FQHVLls9kvr8OtlzNOxtlGdHrB6oRzDkzD4lajOBjqkAUMqxeECU9p3BrxFOOdI9g9VNWMmkeD3EMU%2BIlegcgej6z%2FxQ9tB0xvCQSPNVj%2FMg%2FwCSk1X2Iuy37e6kr4i9D%2BC0uKqrCR92b7hsiiEFw6siGVh06hhq7Xezfot4Emed%2B6p4D3rYyGMsipxdM6u8oaJXp1FkXNiwjHWF6DFfHFAtz8xtwX%2B8siWMCeWRxXOq1NKibC1f5hS56uz7Hz805gQJkeQ&X-Amz-Signature=7fcae56e2699a0f5155446cc68474757563eec3d9eef78060be621118daefa56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBCQVCQM%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T062222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDTfiEdMHh17fdMnZ9cZMuggfAvFn1XIna1o1%2FdOMf8HwIgdk09lzkd9CKabSGeMW8PfcI%2B4M6EuBL9cQMY3kEFvoUq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDN1%2BLIaFMOp0phMS%2FyrcA8WlhpDciYdLGme8DHEbxMU6sgrfbpq2QMKKoezHGPGBKplLoFl4XKI2ZS9XxBvXmwb63TqLkkKhjXDqmn5MJhtBacfZHn3fWgz65fCHKoDnKNIJtmzheVBCV9CZDCfo5IketBqll26IP4LM%2BDCrWlZucDDCU89rk%2FVJmpsH5wsSmRleF%2B%2BAiNj6ZWK6uXK0CclvVJuXAFVzDEgkFtBDTdk%2BQAmT9q4WUebUxmcX2Ju3Mk%2BtcLYGKpQbMwEKHQDewfY6q9woyPkmLzGW0GIcEMsCwKavc7HPdEujbrrYj6E6eiWmBNtDpw38y%2F%2BGqj8OeK%2FXDTBC9s5nuRviFqT6KTk4PRqycpDRMEJP1Iv7DRuU4Mb0g%2FfkG%2B5FDAln7H9gkI5qENKLR%2F7RoDBX6DIlK4dO8qe37dsP2NRe8VsLzQ4gYzCjXIoWlz8PZBoTsDxVzuT1QRYsL58gOqpaOWu4lGbrDZIXI%2Fg05s6V3Z%2Fw9cS0OLbDG4lr8qh%2FneX45hTXY2vPVEJaetAmDfwbFx65HCKwgv%2BE8WAvrIQx%2FjF7KcOSJHJzgv%2FzQmpS%2FhKOr%2Bb8b1YgbSBo6eTDPG4HUFkLPBX7s4kGnxfzBqkM2XQhrauQyXqPL3v3%2FP2z5JKKMOKUqM4GOqUBJoKiF0jLy3MbwFIwyvBcPoLPZF7OUCxSUhBtBi42eASFNmg%2BuXXa5HBaVdtpoCIZH3MdRIGG%2Fy0jsso13jzGVbxnvpalRN%2FQ1ol4PSwy9GjJ30GA%2BQJm%2FUVtIwGhx6HGn5kdRLfJA2Nkl04AZ8sjg81ISX8TOFKuqyJD8nbeu06beKdHGOByx%2B2iORgr9DkaKhJ90RabIQZPVZl67IwpxVn8ziT4&X-Amz-Signature=e2124e29e7bc3917107479a63be5be8a5d68fd6e610f7502c13d45e6eaeee2ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

