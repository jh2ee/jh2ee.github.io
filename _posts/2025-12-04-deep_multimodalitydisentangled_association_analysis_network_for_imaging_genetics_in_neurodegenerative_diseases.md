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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SNGSCV2%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIA3iB5%2BwXHIldx%2FwmGvxTg3F3QABs1lhMv3RnVr7mSz7AiEA18G0HQpBevD6LgE330dBV5xAB96Un%2BJnv%2F3ZImoH50Eq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDLls%2BjZOK9BOdho9ySrcA5kQ%2BP61sRPRDHyjeGlJnR3SEEJbshin2NWylZryFO%2FA8D%2Bl40eW5UpCQKggzqB%2FJHP8l%2Fck8lQnIFsFUDZ%2FiuUuaPNn5qNX1dxff2CBftNk4Y5GC%2BPGr9Wm3pVgnf3NUP4u6%2BmsWTj%2BjfERpMj0JsGfXr8iOl%2BBunZpoy9Qzl3T6ykhFU9%2F1N%2BUWV8K9%2FDSn2CIz5H%2B0k%2FT%2Bgdg0SCsPdSEmzSAYAqJ9ZsJWWiOv4u30aXZhNNHnpGIsSD6UL5nAbO2%2BfEd3G75Oci3whFPr0C2H2n4kxHzv8ng%2BPN7VEqtCedUO8wyqYZSeOSQlh2L4Y96tZOEtm2HVXXcydGrUjdxn8Ml6ppC1SVmHPJP74zv7HMQniB6ifQhGa2mjCg4udzy%2Bj57IuSgQf%2BKqPZk1tk1LwyjoTokU9rT3mk6aOwjKpgc5Zz9Irtfr4kCKU%2BrcC%2BclDRehEG%2FnYYHw3VyFobQUbMi0SwQYKjxj5a5TYFnH6jlygfpC5ndL1xERwH%2Fsvi5pSe%2FVwmBBU4XTPd60Svnc%2B%2FkVFTCe%2FWGh2ZsjitZXkdlyT7Mkw796oIir5PHi8Py4S6p2s3rBKXQZ59WdJObk6eBooyd5nO0VJi%2Br2sT1iKROSHWa7LmCV8kMP3e780GOqUBY7Tc2G1GwVsuhQKL2iQdX0674D7wO%2Bj62MvwXfG9PDmei6Zo3SNfD6orGtiSc7ahZ2qsAAVVjphrA9s2AcfCdTX9CD6YI%2FbHHnqiGlqmDeV%2Fab%2Fzwzg%2F70oekppbk94hXkUsUIbQgJFDBfjEwUGbw9NzTLprGoUQrOnLOo%2FVQoBjRr0x%2BgNngIIFezflOzRNK9WhGCk43qLMGB8XcDHkZrv7Utis&X-Amz-Signature=d6aae36166e474a3ae843f3444bd3698278fa79cebb0558aceec0804cb49031e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SNGSCV2%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIA3iB5%2BwXHIldx%2FwmGvxTg3F3QABs1lhMv3RnVr7mSz7AiEA18G0HQpBevD6LgE330dBV5xAB96Un%2BJnv%2F3ZImoH50Eq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDLls%2BjZOK9BOdho9ySrcA5kQ%2BP61sRPRDHyjeGlJnR3SEEJbshin2NWylZryFO%2FA8D%2Bl40eW5UpCQKggzqB%2FJHP8l%2Fck8lQnIFsFUDZ%2FiuUuaPNn5qNX1dxff2CBftNk4Y5GC%2BPGr9Wm3pVgnf3NUP4u6%2BmsWTj%2BjfERpMj0JsGfXr8iOl%2BBunZpoy9Qzl3T6ykhFU9%2F1N%2BUWV8K9%2FDSn2CIz5H%2B0k%2FT%2Bgdg0SCsPdSEmzSAYAqJ9ZsJWWiOv4u30aXZhNNHnpGIsSD6UL5nAbO2%2BfEd3G75Oci3whFPr0C2H2n4kxHzv8ng%2BPN7VEqtCedUO8wyqYZSeOSQlh2L4Y96tZOEtm2HVXXcydGrUjdxn8Ml6ppC1SVmHPJP74zv7HMQniB6ifQhGa2mjCg4udzy%2Bj57IuSgQf%2BKqPZk1tk1LwyjoTokU9rT3mk6aOwjKpgc5Zz9Irtfr4kCKU%2BrcC%2BclDRehEG%2FnYYHw3VyFobQUbMi0SwQYKjxj5a5TYFnH6jlygfpC5ndL1xERwH%2Fsvi5pSe%2FVwmBBU4XTPd60Svnc%2B%2FkVFTCe%2FWGh2ZsjitZXkdlyT7Mkw796oIir5PHi8Py4S6p2s3rBKXQZ59WdJObk6eBooyd5nO0VJi%2Br2sT1iKROSHWa7LmCV8kMP3e780GOqUBY7Tc2G1GwVsuhQKL2iQdX0674D7wO%2Bj62MvwXfG9PDmei6Zo3SNfD6orGtiSc7ahZ2qsAAVVjphrA9s2AcfCdTX9CD6YI%2FbHHnqiGlqmDeV%2Fab%2Fzwzg%2F70oekppbk94hXkUsUIbQgJFDBfjEwUGbw9NzTLprGoUQrOnLOo%2FVQoBjRr0x%2BgNngIIFezflOzRNK9WhGCk43qLMGB8XcDHkZrv7Utis&X-Amz-Signature=d6aae36166e474a3ae843f3444bd3698278fa79cebb0558aceec0804cb49031e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5VA3CIS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQD3o84w2O62L1dpfFOOwG42bl8bRz20aChRkVwgFCyorwIhAKKZIeUhFVHDrf%2FEgwa%2F8OcClTXif31YZXvELeZM8KaxKv8DCB4QABoMNjM3NDIzMTgzODA1Igywnkt0a9tegSeZPL0q3ANaG3SCNF%2BvTM9l5cHDk8sVyUq5bTf10efFrR%2FnJ%2FBrLMT7E4ABISowoogR4wp8WN2NFyFd3ngj4l6Y%2BPYXOUqLFMdc%2BlENyE8MCFgvDmwECKMjQnjWbGgcRTGEsmexag8t0GlcH6%2BREE%2B5dFRFwkKMqSmTrMNBZjs4XB5o7Gt%2BaMbDN%2BTZ6sx%2BKY%2FKk7APoCKURi9%2FAXNC%2Bp83BZj1LfyxirAS7E4xFNTeSpVn%2BcrrYyjrSPRDE1rZzlQf4suuHtL58tRlLnArHiOGVzkCdX12RTIhIkQnBZCnapvqU2Etk7QC4NXgKeEZs%2BfNMcuFgBQ2oMlcpQJuNJAXgY2cjwwC9Dl3WYRzOnJJWOxtjsXiWBxH22KKrCilKaKVGrtfojYrfZ0HbQweT9Z%2FOGxwy5%2F%2BqMG4llEohqo9V0UBMj%2FT2CNpnp4dfmazjzH9ZtdRb0%2F6OcSGHHbQsv%2F1tLyAWVuIKHRYPGDeYQRlKnc8qJlZCvFY%2BgLwHsWOFuW9puJFCKfkxMg%2FLsl99s7%2Bo%2FLzoe1tW2YcG%2BBRT0QBJ62Me27ipUZlJYNvmZ%2BZxuw34QObmMkXvAnj3j8D%2Frinkth01DRe7r1evSzswHqt8Cu%2FoIbEmUGr7hJMDzz3W%2FtmLTCI3u%2FNBjqkAXJ01Bd%2FOSvMVWDVzLuGTEb5qGB1JSvESQLPSTOuCPGYGIulj58SvuAA5hNFWXBJvHkS9t3bZuRFX2AX8ZdZ4Tq%2Bt1hFc9oQ2v3Kqu6BXN4O3BrdEf0URkLbVlPQwaTOU7369bl1TlNkVuKC8%2FSbz6ile2JiIPeKA%2F3Vuh5VJO%2FIfWvPSdflmK5f1jD64PB4RkbNwmphwSL1e4P147nZ8hNGJCSc&X-Amz-Signature=eb5c1b385975e3deb155f01c087602928d9c4a1bc0eabc59acf4717ea58b2940&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZC6I5IZK%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIHRJVdRfKAlSDzBXIpzFVSBvN1Gir01eblOg85oW2c%2BIAiEAmwp6QK%2FW%2FbqgTg4jQ8AY5htaoLkfDzJn%2FiFuKwO0TtAq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDPC1BfokwgaJoDAlZCrcA1NKHqZzXLU8f11O0M29FLona5Zeg9dHIThjm864TI0Fgzw6M%2BqqZaq%2FVfBB%2BVRS7%2F6w9F%2B8RNGpYuqKSzyRGtv7oCT77mcU9vFVu7iZvKWY2dFY8hN1%2FEAFMIqzKpqbN27cIn4JoTpdQurmTtsR2ML1pliowoZ84w9i30wnOj7R1D0%2BQqhrK274Ak5%2BTheHHd8WSzUussjsydQy0TcHnNYw5W09ttUvylj4109E0h3HNZMnw5%2FII6e7NpEemrIhiFzieQN0FeAOHhyPbW5qgiDCf0ULaaz97qN3Pz9zqB6WhoJh2RpmqCnimZG5JjZKqzYjc2hyVryX4pwfpVNACS1EYgzxhu%2BJs5BtPMdDKxltN46amhwvzjJPw6DimdwhcMLsHI5t97RmvoV90r9rHi5gA1avtixtgMPeVdl8WGAlzQu%2FDkzL0OrNZaJ4L9EaWi0dUj%2BCHCqaHrt769tQ9BP2m%2FbqIoVAPxzCkyLPyYNWPtKFO3HoADbcH10dfA99WsYBnOgpcllHHDtQ5zZIBuwFMXHC0cZym0O7c2CDl59NixUhWDor6hgN3iFahYL0ltW6IqG2VVCi8Am3%2BRwB%2Fc9xDn9qP7yt3jGAxbt1BlBP1bc%2F4igzhItH0x1dMO3d780GOqUBubU0kJz7wEHzx6zPpWu7WSPh1aN6LKQUJIaKm%2Fw7gtDQ8eU%2F2Gk4ljub6uOoh6wAw%2F3%2BfTYmWtQTUtTCmohOxZCsLxusd4UzidP8VxQT5rpANjh%2FqF7Bzop18wmvyQUO1VZOapE1yuRQ02AU2281o2gozSIHZdit8sU5o9fJWD8kt2XkO3iwV%2BEDRIbdQ6Mdm5ShjWSgI1wO4Siti2LmzBZ728C4&X-Amz-Signature=21ce13d17ad55642ccb0c8ec17ad4eb45048eaa7994b77d8ead0932e974b7a6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZC6I5IZK%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIHRJVdRfKAlSDzBXIpzFVSBvN1Gir01eblOg85oW2c%2BIAiEAmwp6QK%2FW%2FbqgTg4jQ8AY5htaoLkfDzJn%2FiFuKwO0TtAq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDPC1BfokwgaJoDAlZCrcA1NKHqZzXLU8f11O0M29FLona5Zeg9dHIThjm864TI0Fgzw6M%2BqqZaq%2FVfBB%2BVRS7%2F6w9F%2B8RNGpYuqKSzyRGtv7oCT77mcU9vFVu7iZvKWY2dFY8hN1%2FEAFMIqzKpqbN27cIn4JoTpdQurmTtsR2ML1pliowoZ84w9i30wnOj7R1D0%2BQqhrK274Ak5%2BTheHHd8WSzUussjsydQy0TcHnNYw5W09ttUvylj4109E0h3HNZMnw5%2FII6e7NpEemrIhiFzieQN0FeAOHhyPbW5qgiDCf0ULaaz97qN3Pz9zqB6WhoJh2RpmqCnimZG5JjZKqzYjc2hyVryX4pwfpVNACS1EYgzxhu%2BJs5BtPMdDKxltN46amhwvzjJPw6DimdwhcMLsHI5t97RmvoV90r9rHi5gA1avtixtgMPeVdl8WGAlzQu%2FDkzL0OrNZaJ4L9EaWi0dUj%2BCHCqaHrt769tQ9BP2m%2FbqIoVAPxzCkyLPyYNWPtKFO3HoADbcH10dfA99WsYBnOgpcllHHDtQ5zZIBuwFMXHC0cZym0O7c2CDl59NixUhWDor6hgN3iFahYL0ltW6IqG2VVCi8Am3%2BRwB%2Fc9xDn9qP7yt3jGAxbt1BlBP1bc%2F4igzhItH0x1dMO3d780GOqUBubU0kJz7wEHzx6zPpWu7WSPh1aN6LKQUJIaKm%2Fw7gtDQ8eU%2F2Gk4ljub6uOoh6wAw%2F3%2BfTYmWtQTUtTCmohOxZCsLxusd4UzidP8VxQT5rpANjh%2FqF7Bzop18wmvyQUO1VZOapE1yuRQ02AU2281o2gozSIHZdit8sU5o9fJWD8kt2XkO3iwV%2BEDRIbdQ6Mdm5ShjWSgI1wO4Siti2LmzBZ728C4&X-Amz-Signature=315318c2aad4e036b44d7f29c2516d0346edeeeec49c6788ade9c745b808dfad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRE7PIZS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135944Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIEES1KWkHEsa1NXCN%2FV9HwEqgn6miXAGkAYezKJYo3QSAiEA4ZpUCGWITG%2FpLRD6pWKe1oMm57X6LwlB507CGPAY7j0q%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDKO7c%2Fl2R5r5bLNI2ircA9A4%2Flaq%2BuY%2BoKoOigxBwVxkY90VRR8adjbnWmORmcVyBhF9AHrEKpaNJSZCpDL7DLHdBKEcSgUXGSdI2I%2FwdRJxN5RdQPRcYa%2B1MbzmYFDyp5WNgcS9KGVXrBAyRUclKdJN8aLdN7f1D33yV1kcYthgOGSFt1%2FdrpxbSqC%2FIGSMn57nx2ksS2jVKYYDd15V7GjmdcYgM0LCD0uCo4Yi4iB3jirMSHtWS%2BNIOWVW34vBbvNPcIyepBjC78Z3CtH%2BosFRYJ7ewx4k9aqr6IVFiOwhzv0tguW8iAWOK49OBcPwIjXFRh2LcSkmwlatjW2z12dx7VEKsV9JNHvaOo91Zm3Ov8dXOeNhV%2FBKL%2BrU33VfAH4W66GA2pOy%2BwMlzIfA3GcuWOUzTUqm17V91j6BNi9NqTiiJLW6l9VFxfkvgr7L6Un89mnjnKoleP62u0bSd0tUwIWPbHHXeCZdcv3L9urH4hjVjV3w2k9G10B0nqm%2FHNnWmeJdbu3kVUY%2FwR7czjvPw5okZVu5S52Uz6qGNL%2Bvn1cQ9txZ%2BJfzfwWRQGfb6Qr9Dvcctx06VpAkr1xfzCZSHPkVzI7MJXtSuht5M6aP8bXoATIvw38WA9jRmAvhMt4wHAIOtR2ParY%2FMNne780GOqUBPbmIr%2BDQzQl9ICIchvajhhLTKiC2QEHxeqT1d0sdJRuxBg9k0LN3tESvHOjb%2BCXfGhTV%2Fa8dvY8UMP9oDbmPx0nHuMmSEBDfQtrJXb4g%2Bb4Hys5Gpip%2B0BrastDkGW7ZS52DGvjwkfE2vDyNMtdr3PGExcHJdsBDq02yNJ71NIuHUT15A3tvuADVFd41I02MMrJKrfgWrefsj253AvTRIjqbMCCf&X-Amz-Signature=9be78a20c551b0ef43e891f46cd6870174422eec05dacaf2880d6ba56cba62d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JGPUKVS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135944Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIESPFnbaP1m4H6YJM0PeTEk6tubJRFsHEMTGvGq0J%2BPWAiEA8qJYwbcddPe%2BVBItM3zQynKNyt6COBWW5vtk7RFNXVAq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDLIBAdbYxA1BRiCKJyrcA85dHf7awVQ35mIfWet3shKQcfTYl8KsXba0vUgYcTKTMM%2Bht0NCnwTyH7rYoTBPA%2F533ZWEph8we1E7gC5OA57alkr7Uc1AH%2FleWHLGIAmcCM8fHuu9E78NIxs4sABswsZtlPKzBMsX9UEUxVDlp%2BtNl53ktlmDqovb8uyfrcaPC8onlpS%2BnLh4Th0jldAnGH2Nnj%2FK7vZT7bUBfJP6TdHHSR0SeIsyibE956mOrBWffgkn%2F9kpsbnRnIhixh%2F02nJ%2B4jq6dg%2FW4qM%2FsHq7AFcUnw7zbKW4SgNyZxh23te1FSh4at8d18d%2BTJ4YVge2uX7DhWurslrUSu3ymNhXDaFoAlFpPonZZvdrO5HhDto%2BkfEobfW6xO8rxDPL1LagSTPtXIx4uJLr6qkm7HhSzjXES0XFi0bHm9npzI2anMlmFsWkuxLOIQsB2FO3FQLqEBs66S3GIOf8ROWPyi86qIrVx7AWgpS6O3zxgkTKwS87i4ehq87qSpUqrdgrZDEa%2FKkBhzjp8kZVfgDWckakPafz2gMArkaQqM%2B4m6PAz7PK1P4ksycEDw8pXuu4bHVGZMpqXUKohovCM7WbDITnNW4mWNr3WBLnE6bKO8OuVBRTddhddcaGd8bFC0UMMKPe780GOqUBi%2F8cj%2FemRjri1ipErjBq5hTgjLJ%2BtH1RPRn6lxCwVMtt%2FJJJP6h%2B2Ulk5PXDxCRBGoBqKVc%2FWX8qdp9eP4UstDYBFjIuWj7e0eEwnkLfNvckWpOZi9ZYbBs3g14AIMuNUqf5nHdguyukmGeRnfBv2d9mrICvWbxQxUP3aOkXWS5NCGGMm4ixSxXO6TqZGh9AcROUmugzIJ1QSmvSPiVoxyNljYyE&X-Amz-Signature=6921fea5bac62d84e17042ad339008e0aa8f198d4240cd2a6567178d9bddfe7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RHZZWQP%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIAaeviVVPR7Gf2WckjAJpdaAcgijBVFtlAGjhDE71bM3AiEA97M0Jg%2ByvVkbwKiv4BjopGpiG0jLvRCDSctxO94F9IQq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDLvFmunTSxyAER2KLSrcA9fNMxT64GJ1KRaArZg3jttDx3nNUH3AL8%2ByxrW%2F%2F2v0o7maIfhSHdEP8FLAubJ62R1yduNPjpFmXegz8prIg00mTPP19sjWjlyZkTv1Ysl%2BcSeK8ul41yoHuzSuOgHi0XOyJdtxcnfvp3v%2FA83R9OBNQN1tUVo0tf7ZGg%2Fxzk4oaZrZJO13AVmoeIZZFw82l%2B5DERMTJnjm0%2BMEiB9zfQBNphOlEBrE0JcW4qiG%2Fwp2nQrssa6v%2F03xCl%2BiUeUN0ahINLku0cyZhk1zOl7Ox9%2BJaTJUhju02T7jw%2Flvb3mre5V5pCRNukONrMqBFrntDbw6k7TPh%2FQTp0Xpq5OTySbMseUXwr%2BIzDsligI80qBMb3KTw37AejdbYx3Lbto0L0R1CvQ1GAKHfuVJ0u84%2FqBh0EbsGrI6BN9GTr4XyIS%2FPWbKtwuUteQiZrdN5gPZWX%2FWy4fXEqtIsaBfNhiHigZ%2Fj0%2FPab5DxcS6oQcd2MCuFUHqdAnDqS7KLIh1XjUUGvHCUkBUbjmEYPr7ile3go31Qaq8mt2oK8qKWLRhQ1%2Bp35GOBVzeIiu62MX9N6wNBkv02xVZobuHVsYnnX0RWSO68h%2BoSGoI93zolFlq8iJ74oq7AKuPb4i494tsMOjd780GOqUBC%2F5YClWPEuBg7RDgW5mIj9c643memjFgN5QT%2Bn%2BRyW9je4OkxbTnMuy7WSxJ2z7YliaLDLx8Me6NWybCjNIFeUZxTTLT4M9jGamNnZXZ0EMIgxZJuhuclMYQRJGzIWOQetSSXUsnps6ERsrHwD%2Br04svPIlFjACqfU6WKOthNtlhH76uUXi2XbaXPFnH2edZtXpTe2KisqViT0BsqofonAs%2F7j%2FY&X-Amz-Signature=9d5919608704e642ce6efae0a9b8424887f03d2427fd54cb06c9ac8914f0e210&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPETINH6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIBqYL4SDfJRILGHnsnJiLO%2FFFMKNDyTkdBOuEK7O5Au%2BAiEArXSNygTNvMEKp0aASzVZbHZ3vPxXy6tgz3d81Vgil9kq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDFd12fP7OISB3cllqyrcA3OXJyg49xgbRoEYXic8EYHxtgPDKvLTsJ8c7NFEkms35EmkbtK8DcbjC1eA%2B4OLy45DkBVsY4Z%2FGe8qxtZUvDx5kNIhCEy7Ncj4C8%2FFW5YNV0yFmJU%2F47cmiDjJd6lb2NDiUsiTmBQxvC6VLsl5rTU4Q8YSWGyMDX3M5o7tXVVOzPLcpYOHgLY1bPVIXcMHK6DBaTWVBnsNyXFRoytBttwLWPdIOR1QUIQ51AsqvdN7j6CMPf5719yDthdmEQkrl6DtxmUpHRGx9FdgFznRaV70O25JK5IT8lUw1TSJuche%2BJjY0E%2BWsBJklXBjdccPOGNV4p6ryi5tuUGcVu0Btga1sdx2rpIRh23AlGnKrvmHuG6elK8XIe%2BGyDDnlGrS0hhWN23m6kdHZFgIytOC6WMXbIV5P5bOIDZrGrgTPOXHOyXpVSY%2BUDUZ3TNXkXzp2nYDrVobhoUT45yMtCBj0huJrH9wfvnjbjj1RqNzwasd3OWzl9TNqOpcxjLsC6KRCnV2qzq6%2FyvBcBfoZh3eEda0KJpz43amIQVjfPGZnqt8keoF6RYK2i5%2F3Tvhyw%2B22BrUIauyO%2B2YGzYHT4HFe%2BSix%2BEzwA2Sgmm1m8ZjRnKy0oOJLNgHEzGa3x07MJbe780GOqUBWpUReJXe4OWTJPU50DuGUyak%2FcTHUJC6%2FyZRc20qL7GuWzwpJetw3PEwkvbA8QPR6u2uqz63CJmhA%2FRtDA3ZAHVhp9RgXZkSDAcraWN2JPq4XsmEyZ0DroTUtjUmL45ZfU7Z0OwMSpFgHkJRQ%2BIYoqaTEyH9xD8wnIQkWXw3Ar4FNZCC3TAGatjdN9oVAofqRzepda6m%2Fd5emCpc6zXKPJXOYngw&X-Amz-Signature=e447b1b7bdfd853fa5976811d21d7b4cb79752efa5c7d3664faf4ba68f0a2f1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPETINH6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIBqYL4SDfJRILGHnsnJiLO%2FFFMKNDyTkdBOuEK7O5Au%2BAiEArXSNygTNvMEKp0aASzVZbHZ3vPxXy6tgz3d81Vgil9kq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDFd12fP7OISB3cllqyrcA3OXJyg49xgbRoEYXic8EYHxtgPDKvLTsJ8c7NFEkms35EmkbtK8DcbjC1eA%2B4OLy45DkBVsY4Z%2FGe8qxtZUvDx5kNIhCEy7Ncj4C8%2FFW5YNV0yFmJU%2F47cmiDjJd6lb2NDiUsiTmBQxvC6VLsl5rTU4Q8YSWGyMDX3M5o7tXVVOzPLcpYOHgLY1bPVIXcMHK6DBaTWVBnsNyXFRoytBttwLWPdIOR1QUIQ51AsqvdN7j6CMPf5719yDthdmEQkrl6DtxmUpHRGx9FdgFznRaV70O25JK5IT8lUw1TSJuche%2BJjY0E%2BWsBJklXBjdccPOGNV4p6ryi5tuUGcVu0Btga1sdx2rpIRh23AlGnKrvmHuG6elK8XIe%2BGyDDnlGrS0hhWN23m6kdHZFgIytOC6WMXbIV5P5bOIDZrGrgTPOXHOyXpVSY%2BUDUZ3TNXkXzp2nYDrVobhoUT45yMtCBj0huJrH9wfvnjbjj1RqNzwasd3OWzl9TNqOpcxjLsC6KRCnV2qzq6%2FyvBcBfoZh3eEda0KJpz43amIQVjfPGZnqt8keoF6RYK2i5%2F3Tvhyw%2B22BrUIauyO%2B2YGzYHT4HFe%2BSix%2BEzwA2Sgmm1m8ZjRnKy0oOJLNgHEzGa3x07MJbe780GOqUBWpUReJXe4OWTJPU50DuGUyak%2FcTHUJC6%2FyZRc20qL7GuWzwpJetw3PEwkvbA8QPR6u2uqz63CJmhA%2FRtDA3ZAHVhp9RgXZkSDAcraWN2JPq4XsmEyZ0DroTUtjUmL45ZfU7Z0OwMSpFgHkJRQ%2BIYoqaTEyH9xD8wnIQkWXw3Ar4FNZCC3TAGatjdN9oVAofqRzepda6m%2Fd5emCpc6zXKPJXOYngw&X-Amz-Signature=3bd262b530b0eda9bffa5cf31a9ce5c0fb239eb9d9780a1d78a19232c4d7695d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR64AUFV%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQDKU7WJX%2FZZ1%2F4Bn9mM0jf08A32Qo6FmXEyWg3S4qhaFQIgG33cFUFbtjaEd6KUIhSr9E9EH7%2BRbJe2hEQReCBiVgUq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDPbEYphfUDyTFJJzLCrcA5mHGIlb2q1urau%2F2f0Tb4KgdXchYXypLjOis2DaDNlNARLC3gzzB4tgTABGJWeTVKdTldSOlTLPAxFyhVZa8DjYnpSDQ6HAmwcsMbq7VBVbv4lUI7Vbc6wLdpf7sjNGk1k8DvVarEcbwarXvL8fLLRdPaIKJDF4yf3rRaa0uTpHUGCRvWUQ5D8jogzO47P%2BZTKlh3tCYeAnEPflcRfFwMl%2B8hJJ3Vf3V2vRclLMogSpIiSi0EYGyRHHrZi9S2%2BUg3ehWTRwOIE9R%2BFhxD5V9IPqxPTq9CvoP380A4%2FOTTlqszNlNUIVm2twLTk0nUf%2F8AR4qLWVEqqG5uVs%2BacVUsIhB3s7CL2aEQuLn6nqwSjfGyp4DE4jRsEGQnqNWzV1jDYiSekBOzwLe6RIAMdGMtSGrojHcSike9uhe1kGyn4T6U6OsQfqZVB3nX3PAoEXzrA2ve2nyEUtF1s19IlVg01ExULwQrk6fBgI%2F4N021D2cqYBnVY72CUZQJ%2BbwqCKIXq0fwWiPFsWwLdjKEL5AFgo9URtlEAyc2PCXZeRlUJGPEl6O05mJOZF8AlIqZi7xv30wZTU7AqgZwTqrKM%2Fw8nBbrezulAUkn2Hcgx9Eg05zxojzDF0KEUbAwY7MNze780GOqUBRnvkVUvLKBZRU87RzjlmtvP4dPgYnl0c12D6VSDUOTjQyt1uJ6psesHkl3BkaDzYHvRuEUTQuKlWTFruHSRed1MtIHB4FIWGB%2FBesR%2FoWZJercCRYlePSW0ILCPWc7XPdGoW4e4yY7%2FM4v%2BhTXC%2FikyF5aJvJAbchTVnbpM2t8MgtTVmCVjeIFdrL%2Fk9kYV%2FAvb3Kb3p5SkbGmwsK%2FBD40TYwhPf&X-Amz-Signature=5d4d00cdf37e7138e17cf78c8753b48a90693980cbc9fc80795594f773e38b1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW6ESVV6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQCnGs6JM%2B9YjysMpvyKPyyr39dSpFO37s2%2BVtD15GrYwQIgVJW%2B0gFtZA1%2FbmzCquLVMPsfK%2FL%2FWvsp1JCEz54RFcsq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDOtRY4zuFV4K6aMLgircA6MGgoNWoLpi1484nChDASeGFcBgDtdca2wiz3F34Ste40jrYSlp1iQzdXxA9wB9SlcKbFCMnbRonksx4i3lqh7k66UKk5Y%2BOM2jVtpAqcDwsD75CsFtYelDr1YxQqn%2BuWLnZiSgHvER4THQ55DYCqAtExUjHpuhFT74D%2BO4UinapLfQvIDgTI5VMPaRVMRH4OGdpdaZNqyi4FoM7KYO%2B2VVWucv8zyXzLtkTQg8arYVjIu6GlWFpCxuL3e5KwHCHSHXXdPw9Ggh4vfkHCJa3AZAVu23o%2FtFX4tEyLGIPvYabCQAIFHzFDqHTIqTWaaVh5Mg9gYg6ZRoflxIBGiUy2uwrQaO6SPR0ATz2kCZVMiHUQSpkgxjlt737Iymw2B6vUDXrGgbJPLBSfgId3%2Ffy08s51k155Oo5InAeU%2BYkNCYmE%2FMJGjprUgby976Hawmu1XmHPRS3yua1TstAe1iymLbIZShfiRMxCab9u%2BNbQawCXVDXY4ircwKPimAlX6QIWvDdX7VfzZ254WTk3zTzce%2BLVoOvRghxjKqk5gZ5w4tkVThEJeJgB2FVgF4JBn5OZIRPXLykHp1k%2FmkOC%2Bc2zak2Lpzauk9FoMueIa2JCV%2FVOhkWrcdAQ69UlwUMMDd780GOqUBUw7PXWjNvdAHY4dNjeroZ9Xa%2BUoi1iUex7hooKj%2BCHpsgHpB4FhqIRGEsrEcZDuxsiKQB%2BVSS77qdK4Jy61Xnha4%2Bj%2FAqCVnjD2nRBBpE9kaLEc4AkybBtLzs%2FieQywq6cSJc3%2FJmiX48B%2FJlIrvNW%2FOWLL5xtzxDRDwKdM1hbjp%2FIp%2FVTol3gAiDYpc8mSVmA4CjXZpUeeuvK4YxXW0vccpORwa&X-Amz-Signature=27239076f8b02c92312391f7d980a128afd05b774d538677a12e9d67a6af71e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW6ESVV6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQCnGs6JM%2B9YjysMpvyKPyyr39dSpFO37s2%2BVtD15GrYwQIgVJW%2B0gFtZA1%2FbmzCquLVMPsfK%2FL%2FWvsp1JCEz54RFcsq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDOtRY4zuFV4K6aMLgircA6MGgoNWoLpi1484nChDASeGFcBgDtdca2wiz3F34Ste40jrYSlp1iQzdXxA9wB9SlcKbFCMnbRonksx4i3lqh7k66UKk5Y%2BOM2jVtpAqcDwsD75CsFtYelDr1YxQqn%2BuWLnZiSgHvER4THQ55DYCqAtExUjHpuhFT74D%2BO4UinapLfQvIDgTI5VMPaRVMRH4OGdpdaZNqyi4FoM7KYO%2B2VVWucv8zyXzLtkTQg8arYVjIu6GlWFpCxuL3e5KwHCHSHXXdPw9Ggh4vfkHCJa3AZAVu23o%2FtFX4tEyLGIPvYabCQAIFHzFDqHTIqTWaaVh5Mg9gYg6ZRoflxIBGiUy2uwrQaO6SPR0ATz2kCZVMiHUQSpkgxjlt737Iymw2B6vUDXrGgbJPLBSfgId3%2Ffy08s51k155Oo5InAeU%2BYkNCYmE%2FMJGjprUgby976Hawmu1XmHPRS3yua1TstAe1iymLbIZShfiRMxCab9u%2BNbQawCXVDXY4ircwKPimAlX6QIWvDdX7VfzZ254WTk3zTzce%2BLVoOvRghxjKqk5gZ5w4tkVThEJeJgB2FVgF4JBn5OZIRPXLykHp1k%2FmkOC%2Bc2zak2Lpzauk9FoMueIa2JCV%2FVOhkWrcdAQ69UlwUMMDd780GOqUBUw7PXWjNvdAHY4dNjeroZ9Xa%2BUoi1iUex7hooKj%2BCHpsgHpB4FhqIRGEsrEcZDuxsiKQB%2BVSS77qdK4Jy61Xnha4%2Bj%2FAqCVnjD2nRBBpE9kaLEc4AkybBtLzs%2FieQywq6cSJc3%2FJmiX48B%2FJlIrvNW%2FOWLL5xtzxDRDwKdM1hbjp%2FIp%2FVTol3gAiDYpc8mSVmA4CjXZpUeeuvK4YxXW0vccpORwa&X-Amz-Signature=27239076f8b02c92312391f7d980a128afd05b774d538677a12e9d67a6af71e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XAICSPZ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T135955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIBnpiNIk1AcN108SERFG7yQ7ebU4rvB3LTcGR%2FIFngOBAiEAyaoi%2FnTz8UQrNIusHQ0IfBzdjRoxwrkWDGiwKpb4rW0q%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDE4UxwOL%2FAIxHBNAIircAxagEXd1K2GjU5bwVhTg299A1XyHY%2BMn2XyxmuTU24hLNmWt1czVwb3CfilHabfT0MhrD9whD%2F6xhyBlWI3BclSXp8D%2BDq3lG94kplnXJ4PeVGfGIZaZ9O6rv%2BZIcFr3I2pkxYYB7yRk%2BLdpJ4Wy%2BQ5JZ%2BANjMnTy7a6d7Arr7bv9W%2FSNtxVPSerco27fVhImCLRW8ep8Itmeqjoz3B9N%2BLum8PjTB0yB5dMeLZfB9MmhOAT8TNguMZaDv0%2BBinBtU9rFv9ntGRNxiJV55lxPwFTM4uTbK%2FolmWmj4ibQRufcb9HFLr1z2ITBmHL2CuyAgirbwAew%2FyfWXQ0O83pU0EqUuiTcWQNBHogi2qCVzPtw6cCtbGXeaRt%2Be%2FDOLzhAhbkD9KtkecPsmF2iOnvAFEPIlqWFCQ0B3iPehc1z3Rm4ZYq0T%2Bf1FyewcUvl96KGsVsGqG9MbGC4aL4ch3hVfabNOi1mnLg1BlcwfiqyZaWWXvgO2vsdboeyOjTMihMl7UnyBJRsLqznDwFJd0isz6s%2BI2Xw4djcbwK2OmmZ592rCz3HjqJHcBxkCJjvpFqP6reWnf71tvmnGU3px9h%2BRL0GEXaVqEc2oHoigp0ol4kT%2Bn%2Bt2PF76RTUltrMJDe780GOqUBrRjP1G0ef5Y%2Bd0XOrXLvJK8BaTLQvoek6onuqSK5vHz4arhFgdos9UhII2FDAIJbXmzmzWZ2M10hHHB8jPiC8RRiNQLsV9tEPdM6PMYC153Co7jpdJZqkcXOfOjwydDEXn5wZ16peYptN8iIKScc3Mh3YYKM8j2ouslpGLS9wnYqaShL2FtIe4eee7ylyDRWLxWeJHgdqneOPmtlrWLrYbxRPsrE&X-Amz-Signature=38032584f99b6a558a258a44c1fbdb505de6fff4c7a0048b5a724d6724d766f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

