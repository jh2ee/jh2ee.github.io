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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TH65OTA3%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIEaXmg06jnjzL7M%2F41BDv0jqklVyg%2FAfnoJKB%2FgYrtwjAiBTr9JuTI9Lc4gAJjG4bqXNJCTqvktexa6eYwEJJGd7Wyr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIM%2Ba0Apbptqwx4GffsKtwDp1grbOGBO3mS4lyp1NRqjt9efH28tQWTfheB6ELmS789DlCJjHnuop2%2Bm0kZsz%2FZUSgMusJO5iBg6eGLrfcB1PKae4oy7ONMCuFqvtJm4Sf5oqYoRrXSeZCZSlM9MnwFvM1jWxyyoBibIn5IBOPtVgp45lTNp5vXprdbnNz5R2WaSql5VFONLukSnRm6%2FUARSL%2FWx1EY4T904pZgq4oXtAkeuHfy1u47LmCIJfdX4QzfG6jgD2eopbUbzLKUQVW8Km9mc0pOXbfMKQ7c4kKn5wV%2FaqJO0pMYG97Rhm6xBiamdSLkKu2btjHTF8x2YyjxUX2L5P3mtyQZYZcxjCLB880ub%2FDKM3wvdUjnq8i5lYXo4d8KP88K2nbtLG6lCu%2Fz5%2F1Edaa1Q7YXtAJLqAMN9c5u2YeeIKeEnVggNrmeZZYshgKfXhA%2BDLR53lSm3h8UFj8PJfBZAv1iKSzdVblAZHrFRg4vRGqHys96ExrqFaOIIo%2FRZ5a3QZgz47olvxmictCuQq04wCAni7cdi3Cf2gB6j3q2v5oP%2BC0ITzbBE%2FF6vGS9xHQ4wlfiHZiAEPSd9KfMp8yw6XJc5VCrTMbpG7wiF9M6dxrqF2c7rC2KfahzJtzmy7XgTbv0dNswyYzjzgY6pgEqI9JEiml6vJH7vDVZyHyCxBZKmWfi58AKKs2DAsYVrMM9VZ298nnuJoNvhEJUqacTHlkSVPeSg1kslLafARf9hLZVHyeGM3lhKhwlhnpHMPPgUfAuXDsvAEkXRBmZuXtgpOlKFDtm6YJAZ2WXfn36idzsiqj%2Fafo3rgRtSFSBh7HQ64CJwuCWwZjUWXJFG0r98RNsbPQgRXsiBIOMKSp7lR9swkAk&X-Amz-Signature=9d474d7ae15ddd4c64178570a1e872564598a5d09acd0c496e2713205b45cdd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TH65OTA3%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIEaXmg06jnjzL7M%2F41BDv0jqklVyg%2FAfnoJKB%2FgYrtwjAiBTr9JuTI9Lc4gAJjG4bqXNJCTqvktexa6eYwEJJGd7Wyr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIM%2Ba0Apbptqwx4GffsKtwDp1grbOGBO3mS4lyp1NRqjt9efH28tQWTfheB6ELmS789DlCJjHnuop2%2Bm0kZsz%2FZUSgMusJO5iBg6eGLrfcB1PKae4oy7ONMCuFqvtJm4Sf5oqYoRrXSeZCZSlM9MnwFvM1jWxyyoBibIn5IBOPtVgp45lTNp5vXprdbnNz5R2WaSql5VFONLukSnRm6%2FUARSL%2FWx1EY4T904pZgq4oXtAkeuHfy1u47LmCIJfdX4QzfG6jgD2eopbUbzLKUQVW8Km9mc0pOXbfMKQ7c4kKn5wV%2FaqJO0pMYG97Rhm6xBiamdSLkKu2btjHTF8x2YyjxUX2L5P3mtyQZYZcxjCLB880ub%2FDKM3wvdUjnq8i5lYXo4d8KP88K2nbtLG6lCu%2Fz5%2F1Edaa1Q7YXtAJLqAMN9c5u2YeeIKeEnVggNrmeZZYshgKfXhA%2BDLR53lSm3h8UFj8PJfBZAv1iKSzdVblAZHrFRg4vRGqHys96ExrqFaOIIo%2FRZ5a3QZgz47olvxmictCuQq04wCAni7cdi3Cf2gB6j3q2v5oP%2BC0ITzbBE%2FF6vGS9xHQ4wlfiHZiAEPSd9KfMp8yw6XJc5VCrTMbpG7wiF9M6dxrqF2c7rC2KfahzJtzmy7XgTbv0dNswyYzjzgY6pgEqI9JEiml6vJH7vDVZyHyCxBZKmWfi58AKKs2DAsYVrMM9VZ298nnuJoNvhEJUqacTHlkSVPeSg1kslLafARf9hLZVHyeGM3lhKhwlhnpHMPPgUfAuXDsvAEkXRBmZuXtgpOlKFDtm6YJAZ2WXfn36idzsiqj%2Fafo3rgRtSFSBh7HQ64CJwuCWwZjUWXJFG0r98RNsbPQgRXsiBIOMKSp7lR9swkAk&X-Amz-Signature=9d474d7ae15ddd4c64178570a1e872564598a5d09acd0c496e2713205b45cdd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPCWMISE%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIFUKMsNhRQXhEeIY9AfLaBOpPIh%2BqgxuXfiOculX7g19AiEArX3ocbf5e7A%2BnrYnNkZnEmjSaRxEgfiKcEO%2BvFVNT3sq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDPes82Q7DwLZ7sSbxircA%2FFBcRfEcYGXunpRLf0fKmFmEJ%2BSu4%2BTH3%2FuiF1hutSPVqhBqvc9wHcvHZTMFXE0OfKRZy6ulUkD2AM3fmkpNyQqbB8ms6tzh%2FJEEDzNznUIZjvQhoYi2OcTFihNKYKyGbxjOVL5xCF%2FlC0jIKNb6UBADihBTjnYzRUDMPca7cocYPrSyezQ%2Bz8ZQYbQD%2FdpXiCiDjFdBPmY7TJUaYEcmOdougDBTU9rTY%2FnZzX%2BbU%2BpwERYbpxtteWXjbuMQPBm8wXc0XwI1e72IEvoXGJhDkMOmxzHaC6VeX3V%2BszJNp1bSKCF1E6QXJLhpQk4ELsRw6q80Md2oeBVMvNYLCThp0FKIdhZlHGD4wBZCz2fxJZYngFJJ4fmnCMhK0oRkdA4epa6Ipibuhddm1bH6oxhq3OehW4HTYHIisRKVGRP2am%2FjI0auDv417yfxTcuMyw57RsKRYzXsV%2FRTE66%2BMzIgaK9w3ZU02MUeLkbJgHz3421VwZ9ecCJxFP08vSutA013MNTsGBZzx%2FDa9gv72f4mB2idcrhGH2p8k8ut0uJYkqKbNjJ7AeABPyoGNvj%2Flq4hfLwA%2Frsvq3odHtpzQcNNqcnWI0g3OSzxy%2FOBFVaE7yv8kYNEjYTRttugNspMMCL484GOqUBw0Z1v%2Bb6IKCxjg4s0FzdRTOEtgFcd7Rh08nvbhDKDwN7PtUXBugP3wmumBn1YEyblmKdXr%2FGpCKYj9vvYwEiZJWpgI7KDXu4zlICzGvVJFsJ%2FuRVq7m57NGz8rpXAS1G7aYxuKoIZISiBAGG6nNHQydMfB6UKBGoPkbJRTnjPRI2HVd8l2%2FSwZ6eoFrOve85NxZVMOzw%2BNQWcxjtUIpmhTzmyX61&X-Amz-Signature=a39334e82161fc9f978d0044ee7fe593dd79b74e22d282dc2017e0d683045270&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYAODDXR%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIBo5VIXmjk68wKglPpxq17QrEu7aGbZ5zr79K0Xps4bEAiEAkljOxRLj9LV9C7GQyxWEDfUO0bckuk9qN34JqrV%2Bra4q%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDALW6wIHl5P7mT%2BE5yrcA65eBR40gmsS3jg7PkfB%2FZFYWXgSLHxFty97S41LTYRgY8%2Bx9s6EesCYCYLwJwJGndNgBJcAJ0DUrWAKQbNHCEBn4Y%2Fbdwhd1ZbbcmvOWwhf%2FEY8fw4xhPD4M9wOGXx6nklJtAI0I67F8DXZO3%2BP%2BqddvBKGNI1S9a5LcpnDRS3DSwyauV%2BND6BA4C8%2FjbavBKmdxs9cwvQynqH2aGD4v1NQXuzOW06tarEsu2Bvk0aBpyChVrgHj%2FQaOLtUmmbURTNc7gcFj6x8iq92psUHB5jMwQaJfk8lld5pkURQkNAyeCX%2BGr8tYSVVdcv3qsPJv2iqcMFS4HU7QE1IvBaWOiar%2Fe8V7WDji%2FrD%2Bf6Jrkn1Wp717GCA4iY%2FBD6vBRjfxCyzhNNB4zlJ5pstYkeecmYk6RH9ZOcq2I%2B8dpGWyKAkycxpkzTK7OTRPwZvKQF433gBeyWxTocT8GGfoq5VbWmGsl6dZ8%2FYNnW16Bt7ZA2NKBXYXmjkUV8hKyLJuIzi7ANHF5b%2F%2Ba11va9sjuch44R1hKa1m49JBPss670T3iL2g8Bq%2FPyNmz%2FJqrptH9OEozqxTrx5v%2F2lv2O1%2FY5nd5wPaiBZwPR%2FeHYXfB9PaHvle%2B7xYVqU0S7xyOaNMI%2BN484GOqUBkoNMATJp4EnCzfX0JwOikJru%2FpQHDGu38fDDSDQyDtnPEddsY3w35M3v4aTA6rnYVIsxpFvrCPMNd1yuTbpPFtbzXj%2B32NEoOCBWllsBBipA9wBYX9agXh7ytLMTfeg6byb57Miv849KzuVIfXCHbpc9%2B1lj%2B4t%2FpithjeyYxCFjZ8eMv7WBTnhxCBvBGr2gmQU8%2F35dzSlvQ7s100R7%2Be%2B%2B0dC5&X-Amz-Signature=17aba2263b573bd5a7250d83c4a3f0c149f591c708b2917fcba137c86b146bfc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYAODDXR%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIBo5VIXmjk68wKglPpxq17QrEu7aGbZ5zr79K0Xps4bEAiEAkljOxRLj9LV9C7GQyxWEDfUO0bckuk9qN34JqrV%2Bra4q%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDALW6wIHl5P7mT%2BE5yrcA65eBR40gmsS3jg7PkfB%2FZFYWXgSLHxFty97S41LTYRgY8%2Bx9s6EesCYCYLwJwJGndNgBJcAJ0DUrWAKQbNHCEBn4Y%2Fbdwhd1ZbbcmvOWwhf%2FEY8fw4xhPD4M9wOGXx6nklJtAI0I67F8DXZO3%2BP%2BqddvBKGNI1S9a5LcpnDRS3DSwyauV%2BND6BA4C8%2FjbavBKmdxs9cwvQynqH2aGD4v1NQXuzOW06tarEsu2Bvk0aBpyChVrgHj%2FQaOLtUmmbURTNc7gcFj6x8iq92psUHB5jMwQaJfk8lld5pkURQkNAyeCX%2BGr8tYSVVdcv3qsPJv2iqcMFS4HU7QE1IvBaWOiar%2Fe8V7WDji%2FrD%2Bf6Jrkn1Wp717GCA4iY%2FBD6vBRjfxCyzhNNB4zlJ5pstYkeecmYk6RH9ZOcq2I%2B8dpGWyKAkycxpkzTK7OTRPwZvKQF433gBeyWxTocT8GGfoq5VbWmGsl6dZ8%2FYNnW16Bt7ZA2NKBXYXmjkUV8hKyLJuIzi7ANHF5b%2F%2Ba11va9sjuch44R1hKa1m49JBPss670T3iL2g8Bq%2FPyNmz%2FJqrptH9OEozqxTrx5v%2F2lv2O1%2FY5nd5wPaiBZwPR%2FeHYXfB9PaHvle%2B7xYVqU0S7xyOaNMI%2BN484GOqUBkoNMATJp4EnCzfX0JwOikJru%2FpQHDGu38fDDSDQyDtnPEddsY3w35M3v4aTA6rnYVIsxpFvrCPMNd1yuTbpPFtbzXj%2B32NEoOCBWllsBBipA9wBYX9agXh7ytLMTfeg6byb57Miv849KzuVIfXCHbpc9%2B1lj%2B4t%2FpithjeyYxCFjZ8eMv7WBTnhxCBvBGr2gmQU8%2F35dzSlvQ7s100R7%2Be%2B%2B0dC5&X-Amz-Signature=fb4d283586e2d706562efbb2afce1fde1d71877056941e1793bafb33ac22e6a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HCY55RD%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIEUQzMdg957jKoFnVcpjjouU2Klg8yGqSWqboTuzNu4zAiAIZEXaOTYDR5uOVh9X9Itdn3RG0hQEwVTKFqKmSTFSwyr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIM%2FDdx04CMser9a1VVKtwDv5UbON1x4fYWn%2BXIpZjGjO3suZG3G78559WFySEfL%2FA1JDYhViBqgFHwBdLXzvdMxg2kdaBNB6cJa1c6jAsVkntTKy9yxcu3xAw0bUh2mTFMy7y7RWVm%2FI3gpeI2qkloMYqoj8Ykoai1OoBZosLMWrLhRlAeIcxihpzERSlFn9rITTyO5VRge5UkdnOIkISUF1KhkpOG5FQIoj4XvzfLcqKbg%2BbwAVTScS%2FcjaKYbCXyQNkibiXxdSAVivEXFfn2sqJrhCN3ve0%2F6ewTjqNudFHcRomje4essLP491u5oeEmp0teCl5b8s7f5f7zmFvJqWaZ3EEYP1od3LdJd54xBVOtIRgTwgwfKKWefWYKFiFsRS%2BSqxVUtj6ZWuppqhbE5cCaUDEPN1Zz7arMakwFbxMy%2FDmO8mSpHtDmxAPQEiKqqEGxD2yZUhYQYe6%2BDncbkOvi2khp2sXoNV%2FkbafMDF%2FaN8PQjBwachpVdn%2B49i3naDWArbTbhP3FkS7RsXj1cBYhRtM2BhYkCIc0FYselc2TjiwO%2BCm7i2BIHMbpw5yf3J6o9KHXa9Yc%2BkwDOIeslQDiotfASEYwinNO2l8OENVs2CFy6h34uzJzWdW%2FoVuVmM55EzolQpCM2QYw%2FYrjzgY6pgHsXv33xNwt3QNgywPMRWMxd0MC6TPOqa5rwMQnXACVwNgNP4w79vYLfMXCkP9n8jrEEmR0ph19Vw%2FxfzXRb7qWDXPmsRPqGj30A306qRidGhF0IK85ZpydZpaHlphHKs6NQR6rTMV%2BTcj9t2lqC7IXnZyJmXup3bQDMbOXgON1dQYDfjbFtjt%2Bifa%2FaoR%2BdCbOIYvNTTo3RISvtKKK1T%2BjEszDBhIN&X-Amz-Signature=24eef3e39e62031c98ac2d796ede330443b6bf4bd7dca183e0670a7db54de031&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQXPKJTS%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQDK1zo9vDKQ9R6DirAikfJG5s6n1p1mULVsp1jWA%2Bqz3gIhAKfhYgkeF8epOTTfvI9ZOBMc9Jm1rm6la3TFTznS02WfKv8DCCsQABoMNjM3NDIzMTgzODA1IgyOptBWQwBdB5quA14q3AOYcZoKg%2BHCsM2Qcz%2Be9taYjtG4J1Jflo4YbFBX2cFF2X6hJF9hpwAMxiOutQmWICwcGxx%2FZMDMRatlY2yMkDJrctx1yjMEYzbPRAiSy5sEiFBm0I7THRlBQ0hmAfJWy7CgqDBM2sODSPbjPfcu3nHyK15XXLxUTnrj3dnZeS6r6Nd3z%2FnDTBCVtiV2kUwZlc3yQcI1%2BK5epCkXvpXjkpH2s8IVT4koCv211Fq3CNnYT%2FekXbDe%2Bg9CwRWDF4NypY8MmV9Nelov6SO9bN1HPs%2FdNMi3r1WaM04n247eF4BsBq4Hoin1rG64JMOOOgJL64vemhEr6bQNW7c1PmefpbWjb16yQMz%2BdikSSXAxH%2B5lRv%2FRWFqj5E6Tlix001kahvV9XyxLwLVef6eo5tFdtQshzAyNh94rWstw2k6AQfR%2FUka%2BWwsFXYt6LsWGSiZHN3ha2kmqVq8FPaPNM7W8zYvEKUS%2F6zraOcHL50LUd1m5zBMpowbsrSeEOQcSn5pUvQ%2BZpY%2BFsCffRjCjvmss1tgxPmFvedbZFaHPdjK6aHgWX5nlDDYU61LzjSzT4%2BihGQE4x3jkJrVvmtOZ9oliilTca3ItbJ65bLtwLsRJmYY3AvpDpHg7NS0BbX1bmjC%2FiuPOBjqkAXMqDyeot4ddStbXl5CLyg%2FzmGUH808UaKiVL%2FeyAqS8Z0CwbdnFz6XryXIjViPS%2BiTEJUN5ZMGA4I96q%2FXLXHwVHJfM7LQxmkq6960L3HCZ03sF7CrA8YhoLOpnPewcJGcFP6EXpxcn8n1dfBo87SnJKZyzNsjnafwoUBqDSWtb5QA9qDIc4UNWLpWXhEqvj3j1FXhkom4kPG70TYHxTXTyYOl9&X-Amz-Signature=00f1098d48e4a7e8ca7e0a75ef8eec39c9d3007219c7f8d4a88434b9192718a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZM7S5NXN%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQDFX9%2F2ESZDyjPwkiRGwq4TVFQ4qo87VbJlx29MSfrJIAIgXtHv5Xf4B0oXhEmOY1tb4ulpSeRWCJZldz1lEDDrjlsq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDAeIVjjrxRukOKFruCrcAz%2Bb2iqYX91VpbD4mQf4zA7ApT3TQA5NJJIwH2crugTMn14mPXx1ML5iewdYG%2FTHW3pPjws97mQonvEorO1%2BsCf9pF1uzfdj8OOOjc6Pm11Ad4v%2FuOUC3hY5R1DzXsEPmIkJZzpouD%2Fiwq2RV16Vxpds%2BNn1XInICY90Um91CrrNoLxY6ISzWjFMmMuI%2F%2BL3CSo81Y4WZxytzQ83jAgYUd4W04TTc3BCf7%2B26RKYWwK5no%2FTP%2BfhAxGfdr74BY3mU5Oxdde9HtBMRWt%2B6WLE3ZlDTDIQZih3tSZtSkBls8neWn9l7nHz7b5OVO%2Bv1alJq35i0pulWs8EAHVwoAiavpdZAv5ZXpjche4%2FskpiVs8pq2yYTe9ayybTrKyGdYtL8O4ASNliKQfHDSulmdnzxyp3IohfV2YGivTgOZyhaHXSbXFgjNpdm%2FpKV3IfiCRo4jUwBtBvH77HmnRXWBWxOAPo7iHKBl0aLgQI3l4Y6VPNpBCgC0k%2BSDnr5LqB2TA7mc3FE633dJtMsh39tTsDgyiEUzBF8iCgAsJL491Vi6uyZ3M48rocyHpcrV8COVh2H8bQHbQQ2X51rVBxndS8gLONvQxwrI2dUGfjfyJrl8czAqxINXngubpWCOJIMJqM484GOqUBGZ9LwvIZv2z4G5RH5LJmUXyGAJ5k8fbgGdtdzZYGTs%2BHBD1FhnyQ5%2BwiJ7W9zbdNi44wpYlopl%2BLDHRxsxugut9x1XKrvKEx1HXSgep0HOfPhItlyaY10O3mVWJ3mK55z%2FDnG7bOPRNlklRKS%2FmvCzlxfYNFOt6hC0MVJEurGh09Exy%2BVwHaDWJpB%2FUx%2F3n6Z5HTygCTTijDeYBlhVlZKpy%2BR3um&X-Amz-Signature=7c69c27038d07f21ba6a647a0c079f236fb0d504d16e4bc025512097f8ed79de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MWSFQSR%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQDSZ%2ByXb0S0e2GFpeJU7GnhQH%2BM3qpuMWS1cTGsWaA8AQIgFpCTPlFPXJqwTycLHSfnlW7kB3o5kVY4WYX%2Bq8MAe1Uq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDARNa7GXRt25No9c7ircA1P88IEO6Jog78LRz6MCbDJyu4cx3hqe%2FE9h3hxQ6ezs33O1cf6KZX1MYkGe%2Bdnaz8t8YGOgFL9qLkQdEMA8EfwadYm7FUYmI3qL06a%2Fz0EGJuLBX9OGal6wxgKESaSEQRy7jnkTLJizrrdhZtktIzJr%2F8bBaDfp2pVR09ZMulNkfhZjmtLRSpObB%2BTmYz7R42PKfE6kzK4o0f%2Bsk8F%2ByY9h1uOijQyDL5uc4sSW%2BkRqwce2FSNVXea64odUCZMF5fVuVrTDZUuetZ7QkRRl4%2FhPwmuuxwtJcfx1wOBZnlR0VCo%2Fc49Vg%2BxJiOwgOtEddvrUup3Qm8A4c8GwNoSPxfvi5myEle3JMlgfB9F1ZAu94atHoHOjjKUYTXLrStnMoSZydOm7nRun5fLSH7RxQsKeT9Mu97MLr87dB2Lkh3mjW7YxR%2BPFAv%2FI2XAI%2FcKkOznmY%2BKUzLFxjFfAOq7bWPpx9y0zIDlqF2C9ZazrhkNNZdzXN5sXyigbaiznxkIzgJjcrv6Gh%2F6U3gPK%2FPx9JgmDPj0Ed9oGkuyBJdwvFOA6fdxShpHhnNfGZmF%2BS7zAPRhGdih8u6Ip8nxMrUjQWQiuxdW77YJKadufgXDhVu%2BfZTRitjFFIamDBueCMKmL484GOqUBWU%2BAQ0N84s1%2BH5JmGQTpSZ1zU%2FBFWgrVx%2F0kI%2F6uPtAMDGfPabZswr1uKgMlO5nrmuzuBAHzKhmlfYt4pEuAMyNr%2BJ8tEcaLFggaPPR6Ci1jKETvks%2BBYSQV3MhjAKtuA91uefKinEMSsswMp%2FrRdYL%2FijNGzPBDePoBg7nzIfHvlzcwTvQL3z5PktpBJ%2BKf7XGKIspx152RkEqMmOYyGI%2BIOl1C&X-Amz-Signature=e6f1738d57bd284afac7cd370306c4e307187da7c5578a96e51bbac01efac359&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MWSFQSR%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQDSZ%2ByXb0S0e2GFpeJU7GnhQH%2BM3qpuMWS1cTGsWaA8AQIgFpCTPlFPXJqwTycLHSfnlW7kB3o5kVY4WYX%2Bq8MAe1Uq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDARNa7GXRt25No9c7ircA1P88IEO6Jog78LRz6MCbDJyu4cx3hqe%2FE9h3hxQ6ezs33O1cf6KZX1MYkGe%2Bdnaz8t8YGOgFL9qLkQdEMA8EfwadYm7FUYmI3qL06a%2Fz0EGJuLBX9OGal6wxgKESaSEQRy7jnkTLJizrrdhZtktIzJr%2F8bBaDfp2pVR09ZMulNkfhZjmtLRSpObB%2BTmYz7R42PKfE6kzK4o0f%2Bsk8F%2ByY9h1uOijQyDL5uc4sSW%2BkRqwce2FSNVXea64odUCZMF5fVuVrTDZUuetZ7QkRRl4%2FhPwmuuxwtJcfx1wOBZnlR0VCo%2Fc49Vg%2BxJiOwgOtEddvrUup3Qm8A4c8GwNoSPxfvi5myEle3JMlgfB9F1ZAu94atHoHOjjKUYTXLrStnMoSZydOm7nRun5fLSH7RxQsKeT9Mu97MLr87dB2Lkh3mjW7YxR%2BPFAv%2FI2XAI%2FcKkOznmY%2BKUzLFxjFfAOq7bWPpx9y0zIDlqF2C9ZazrhkNNZdzXN5sXyigbaiznxkIzgJjcrv6Gh%2F6U3gPK%2FPx9JgmDPj0Ed9oGkuyBJdwvFOA6fdxShpHhnNfGZmF%2BS7zAPRhGdih8u6Ip8nxMrUjQWQiuxdW77YJKadufgXDhVu%2BfZTRitjFFIamDBueCMKmL484GOqUBWU%2BAQ0N84s1%2BH5JmGQTpSZ1zU%2FBFWgrVx%2F0kI%2F6uPtAMDGfPabZswr1uKgMlO5nrmuzuBAHzKhmlfYt4pEuAMyNr%2BJ8tEcaLFggaPPR6Ci1jKETvks%2BBYSQV3MhjAKtuA91uefKinEMSsswMp%2FrRdYL%2FijNGzPBDePoBg7nzIfHvlzcwTvQL3z5PktpBJ%2BKf7XGKIspx152RkEqMmOYyGI%2BIOl1C&X-Amz-Signature=1bc62ee3b01e9766c949cef9db3a12b945ce6deb8bea704e30985c27216a089a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NZ5MLQ4%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIH%2F89RrILvQrTvgcThVOfL8yKlhp1tQaIcgiVg4bHUvEAiAhetNGK4%2BLwnCkcUY7gmHm4HhhEJbPHdIIg3SExen21yr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMTFpANXlppHl4UB%2BqKtwDXBrbO0wZWHJ1xt9dY%2FkacA1cRAC2DDbT6EWPNN88sfxzSkJ6O9jFjQE%2FOB7mdQAyXRKCsAKRU1kMwkuKELvR2%2Bom%2BTcWW6SXeUzsExntVRO0xG7EiAs4ZxdVzpOWCluP5wflSHFdYBRquBdLLQjp54m9w4%2F1KOgGtyro3FYnlUJJ3iIATRIvi9QXamZ6AmuAS%2FhmurD0gnqdIXQVHg51DTUF0OAxj6GwHsHHm7REhHiYoUSwr0X6YUVZ16OqfNVX%2FMhjDLAyLFCU0BagPpgRpKrK2xa3%2FCQKj5d%2FHEX%2B7NSiYzQqzWEMRbOS%2BqoKdQZ2I2jiaYgfFg1QCxEs26RrcS%2FcufEN7ukgFB%2FMkG0pmVreLFN5IkS0KlmD44m1j%2FqrDXd6%2BLd%2Fo1GAluKnAL0RG22RhljYHJw%2FeAiKI0FVaOwe%2FSgcshH%2FtF%2BNtlTQyHVwpzLqaBOEo5wRqZJfWrwR6SbdK5PjxxAyf%2BD6KG7siIEaUOug3KoYFTCAavy6QIEiQccq8mtd2Z6L0MHa5GHJ33vM2%2F%2F6HGRXWIoVdfJlNgHo%2FP11x9iVJMYm5R32lobV5kswbbmhULAQ4PAWn0qsopoqLY0zVyooR2vhtWbMNpc7DuZYGbPkUfTDoM8w%2ForjzgY6pgEKhG5mL7%2FFKSfH6chXkrEjdrUylFEYbPxk%2Bj90qxXB%2FDk7KH2CWcgW7SScMmRHhbvd8eGzMRQ0SzmA7zJHPTq65phIwamhUhbDdKAC44OjivubbKHkmCSktPVr4j7jcqPz2y33uhz43TXZA6lKtN5BTYEDCoTHfdqW8cfyPdNTTiFSTjXiGJGYa7HScV3NiTZtwKWNFjZiIp%2FTrAA4Qi1Mt5inEezK&X-Amz-Signature=285bb1534cae8d9431777dffd448d911ffa3137e4120c76445bbdec930ea8f00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZFISJ2R%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQDIpdINExUB%2F%2F5eF%2BXj8gOP%2BYRNahOB%2B1GC8lWHRFW8eAIgJenZojPYIR8ASoyGEK9LzI9EZk0%2BjjH496Z0dl3Ful4q%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDIwDZt1xI%2FG3BiKV7SrcA5CZT%2FuF1rb%2F%2BmQQd5iuBWP1nhLGZSO38PUSHTWbHcHKeFqlL12JXh4cN44zTQo31VGav11j%2FZ%2B0LgJvFSwjq46MYEWtUXdbmGmW6nrsr6O3HTEPZ8CBl3eCmtUS3mVOiyLp%2BBhFLSz6%2FUZLOlKzikX9UQU%2F7gMxjx5N1A09rknJyY7Q5szGMQebn%2B%2Fbfk4XDv%2Bd1XDZHgDdp0Fl4kXjVshcptl3JKBC9HIntczsqXej423o7gGV14sxFvRNV1VxC1qZawn0V0wx48SYRuJCzZDp8jzkoiqyUsxBX%2BqvTV%2FfYqYT5f2lE%2FgReqCh3RS95d%2FWFifLmx6zw0MJGPxIDsapdpQUxmHHlfQTATZl%2BjRR4fkbPPIA8YWnbYCU9gV8ofd1q39cz5nge9gJRVfTWvccpXlbxFGdJBpqb5zxa23kTMDz%2BwAs3JGZa%2Fn2tXcYkxi7D3t%2BdOaT09oikM9Nige%2Fv8CGP7vqJd9bxuJXI%2BSPRzQMzv5eKn%2BpaUfle%2FyNlfoSk6%2FBGI%2FmjEu%2FuEiBdhPneMSvBYc7Sb6UMjBbMgRU%2F2gY0a8G9IYx6mw%2BC%2BSLXaiSTvyDkBr%2FGDFBvkUS%2BkBI1uetG0fk5UvZH%2FL4EnbPo3EKXwzzRS05hZAeMKiL484GOqUB1TG6TM2Ahjm3yaq690YPJYN1VNbezWTFpk%2B4en35837PH7b4zZ10gTe8XG1GSVy%2FolyTVy6aJhduusTkdKPEhDtqQjaZLuySOVNiHU0IqIuKmiqXfX0F0ceTMPbXiMTpKg742KZBVgGvzGSHKygfRPBILMV%2FneK641UeB7cYCeauXoO9bnvfakS5NsdRV1XahqLO%2BarwM58Tl%2Bh2mp9CnOuGgtQA&X-Amz-Signature=e35fdb9126e005414c116502155f3cca4a4246e7d46e6e31730addbe35aa610b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZFISJ2R%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQDIpdINExUB%2F%2F5eF%2BXj8gOP%2BYRNahOB%2B1GC8lWHRFW8eAIgJenZojPYIR8ASoyGEK9LzI9EZk0%2BjjH496Z0dl3Ful4q%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDIwDZt1xI%2FG3BiKV7SrcA5CZT%2FuF1rb%2F%2BmQQd5iuBWP1nhLGZSO38PUSHTWbHcHKeFqlL12JXh4cN44zTQo31VGav11j%2FZ%2B0LgJvFSwjq46MYEWtUXdbmGmW6nrsr6O3HTEPZ8CBl3eCmtUS3mVOiyLp%2BBhFLSz6%2FUZLOlKzikX9UQU%2F7gMxjx5N1A09rknJyY7Q5szGMQebn%2B%2Fbfk4XDv%2Bd1XDZHgDdp0Fl4kXjVshcptl3JKBC9HIntczsqXej423o7gGV14sxFvRNV1VxC1qZawn0V0wx48SYRuJCzZDp8jzkoiqyUsxBX%2BqvTV%2FfYqYT5f2lE%2FgReqCh3RS95d%2FWFifLmx6zw0MJGPxIDsapdpQUxmHHlfQTATZl%2BjRR4fkbPPIA8YWnbYCU9gV8ofd1q39cz5nge9gJRVfTWvccpXlbxFGdJBpqb5zxa23kTMDz%2BwAs3JGZa%2Fn2tXcYkxi7D3t%2BdOaT09oikM9Nige%2Fv8CGP7vqJd9bxuJXI%2BSPRzQMzv5eKn%2BpaUfle%2FyNlfoSk6%2FBGI%2FmjEu%2FuEiBdhPneMSvBYc7Sb6UMjBbMgRU%2F2gY0a8G9IYx6mw%2BC%2BSLXaiSTvyDkBr%2FGDFBvkUS%2BkBI1uetG0fk5UvZH%2FL4EnbPo3EKXwzzRS05hZAeMKiL484GOqUB1TG6TM2Ahjm3yaq690YPJYN1VNbezWTFpk%2B4en35837PH7b4zZ10gTe8XG1GSVy%2FolyTVy6aJhduusTkdKPEhDtqQjaZLuySOVNiHU0IqIuKmiqXfX0F0ceTMPbXiMTpKg742KZBVgGvzGSHKygfRPBILMV%2FneK641UeB7cYCeauXoO9bnvfakS5NsdRV1XahqLO%2BarwM58Tl%2Bh2mp9CnOuGgtQA&X-Amz-Signature=e35fdb9126e005414c116502155f3cca4a4246e7d46e6e31730addbe35aa610b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YXSG5I6%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T095715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQDU8JqUu0qCMHszjvzRx2jaBuYjeZEMEsZH5GVUUSctWwIhALH1UBLfTAFbL4pHUJ1CrpVAR4CQCl1lXHTUFEm6eqF%2FKv8DCCsQABoMNjM3NDIzMTgzODA1Igyivj6RDA2X6rDEQgkq3AOdxQHhfi5put7j6cxceHPfeo7CsF0FUPj2iHj%2F2vXs3x6NqpTQnhSIPP3BA2%2Fe1ZEvoD0c%2B0rzdwv1knFVEm0ljT8Alfca9iZTwgvhJc7ZtZxeM1ZdmyIkXDnO60gYXFaP6Je4Z2y%2BR2EGwtR7x8YbbCVHMKY2%2BVTR0gvjCnzu2g580IpU5mr47oepPZjAhEgdgbhBpeQiWSg4R5lVWmcgn4JNPBybLkHvlQAKYao4fdiL3Y8pUf2TWz4hRRhaYPr4sdY8udREdUHaxOuVG2qt8VRZJlzet5S9KV77ui2mkgJKhTjoa65GdgqhVuuNCr8AknX1gkwxA1DSq0sQfHxhsAaBYSfQstQlzNjgIIZ6H4iTEyLlDNQfGnWMk4uilxtt%2BeKMTOym%2BmxTMWxEeuoX1MeMM0eaBU5AinLv0bN2%2FgSGFwrCVX%2FveT5q6C%2BYWOPII%2BzGY4mFMIFBXA%2FgH0ldkvosDi7Cc0gSnccunV9q5YMNk0VvhHfKyPpd%2BUu2XY71Js9r853te72a%2FKNp6Q%2FHa0b9hLyNeRplVRPDsuWJZ4fOPsgzBt098CVOeeEZ%2Fi534sdZh1XAqsts0Ex%2FC3scxHx63Y8QNN3puOOXtKs%2FIjju6LFrMWT4ce%2FFYDCRjOPOBjqkAYqjOOfjON6nlHLawGABn8yfu6P%2FJXoeUH9P3Us61svO4hQaw6Ra66q8Gc3GHTLTPwnjyWzPRd4WLQNBQVYoj3jKsg%2BJBlJ4KLBlI%2B0uP5iprRkeyLElUfY%2FXwNPX3dv1uG16oxwZHA%2FMCZCsbYFa1O9QcwmLuTvd1dcpd14L8LyfylGaUmyhpoafnIWb6VDeWu2TCWqBT1hk7PUcPhfSDQ%2FP6BI&X-Amz-Signature=8dac711b722bb71b5a3225ee15b56535658bebeddfc438c6735029b3d7a13774&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

