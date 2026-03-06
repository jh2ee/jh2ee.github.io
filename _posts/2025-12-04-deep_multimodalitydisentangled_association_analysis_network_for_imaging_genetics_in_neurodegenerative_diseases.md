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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5VODS5H%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIQD3YrsniO0mklLaR%2FYELdUxYVh%2BBEr54m02QbHQE3J82gIgFsVg%2FXvLExs12h07bdh7CkEujuuMJtttZmkIPGA4i%2BoqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIYtnt82iI9fIV9UiSrcAx%2Bw4Neu6AL4LqIj%2BBGFAIepS1INx%2B423zoLBK8ZSqA4iIxboLuKZtNFlPndtTGcC5SnGBxw64dUVCh3sk%2Bt8wgpYHRUqBZFxw1xPKdPTbDtu3UpCnu9VcXSvO29hCMV8PwnjeHV3P9JEO8YstlrVOGZyjswFqVMB2KuQAG6iroDczhAFsM6i%2BPOoZdZdBMwXxQ%2BN%2FIHA%2BsRAD%2Fos%2FEiy6RlrBBpPyxERxfEC0dzbZ0Nf95hUWqlyCuGGj3Whf9hSYbjbHBKFeTIWNeSETiPT9%2Bi1xV3l6zmhrFQuxMGnTxS9F1NRFaGQWpTZIqIOReQmC0uUBXnciaVQPohEGgj3U0n%2Bx59TvBNTMuDgD%2FRsVQUsk3CLdTYtfedczV42TkRg4FxCJQT6mRx%2Bd9B4Zrn6EB9KDJqIKREuGAKE3freNjAvzBZp6Cv2D35caxZMKpWbIaKtPb98YAvVkzQKux43Owq88uTbPi6DbarSiEc4UCZYV72SB1IGdaFEycMfRaBTJtYnx3bmBBT8zjhNqlokfp%2FcqUQbf%2B08KzmUYRiCjEfK2NETDFlKemaukGKeWOr8Lr4cQ%2B7HMa0A9ENkfuCjySKnjLia%2BS7pikH3YN8pt0Ns8uAaTuxOPtSFqJFMKaHq80GOqUBWJgyfoT4mjuWeQ14KSQ9OSa7bKSwA6NjWq4toKIEyFvDOGOPyPyd6BPntnCM%2BYSVgSE788gZEP7k2UwVnsBLZBc7N2uq0%2BdUiU2%2FsY48HL9Pqgab%2F%2F8kY7hVVVm0v0N3WFdpWc2DBKvLAszasvlixbpWJRzt4mSp6dmJMhM9w7veJePb0zt6NClkBBlDQ%2Fgekdnpv9knyeBVo8JGLNIFDD5fvTD2&X-Amz-Signature=246d325f8cbc63d12e82ca934679f932d12313d2b8d232482f79eb68f066d890&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5VODS5H%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIQD3YrsniO0mklLaR%2FYELdUxYVh%2BBEr54m02QbHQE3J82gIgFsVg%2FXvLExs12h07bdh7CkEujuuMJtttZmkIPGA4i%2BoqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIYtnt82iI9fIV9UiSrcAx%2Bw4Neu6AL4LqIj%2BBGFAIepS1INx%2B423zoLBK8ZSqA4iIxboLuKZtNFlPndtTGcC5SnGBxw64dUVCh3sk%2Bt8wgpYHRUqBZFxw1xPKdPTbDtu3UpCnu9VcXSvO29hCMV8PwnjeHV3P9JEO8YstlrVOGZyjswFqVMB2KuQAG6iroDczhAFsM6i%2BPOoZdZdBMwXxQ%2BN%2FIHA%2BsRAD%2Fos%2FEiy6RlrBBpPyxERxfEC0dzbZ0Nf95hUWqlyCuGGj3Whf9hSYbjbHBKFeTIWNeSETiPT9%2Bi1xV3l6zmhrFQuxMGnTxS9F1NRFaGQWpTZIqIOReQmC0uUBXnciaVQPohEGgj3U0n%2Bx59TvBNTMuDgD%2FRsVQUsk3CLdTYtfedczV42TkRg4FxCJQT6mRx%2Bd9B4Zrn6EB9KDJqIKREuGAKE3freNjAvzBZp6Cv2D35caxZMKpWbIaKtPb98YAvVkzQKux43Owq88uTbPi6DbarSiEc4UCZYV72SB1IGdaFEycMfRaBTJtYnx3bmBBT8zjhNqlokfp%2FcqUQbf%2B08KzmUYRiCjEfK2NETDFlKemaukGKeWOr8Lr4cQ%2B7HMa0A9ENkfuCjySKnjLia%2BS7pikH3YN8pt0Ns8uAaTuxOPtSFqJFMKaHq80GOqUBWJgyfoT4mjuWeQ14KSQ9OSa7bKSwA6NjWq4toKIEyFvDOGOPyPyd6BPntnCM%2BYSVgSE788gZEP7k2UwVnsBLZBc7N2uq0%2BdUiU2%2FsY48HL9Pqgab%2F%2F8kY7hVVVm0v0N3WFdpWc2DBKvLAszasvlixbpWJRzt4mSp6dmJMhM9w7veJePb0zt6NClkBBlDQ%2Fgekdnpv9knyeBVo8JGLNIFDD5fvTD2&X-Amz-Signature=246d325f8cbc63d12e82ca934679f932d12313d2b8d232482f79eb68f066d890&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HKZ277E%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIE1tMHbVufHaryKdjXH1fgP2cGBVXfLUwZb%2FsrgT2U0cAiEAwHoWFI%2FhVBQ8VLD7b1NcJVNu8N1LjZEynWQgxQNnYXAqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG92rjB%2B%2Fu3D51lzGircA8YejXOjVJ2MAmGXzXyc86p%2BNwHLDJVljUmsk0WSKwVgospVhlfshnibYItUphLUNGXKz90sPxM28Sftc4%2BBcuMuDsWuN6c92td80RDTZyaASa2cnniD14CWiRT9S7rHl3SZ3vUiRw4ttlxIUEA6xratzlYK5%2BUHu3pJsOsuLILt5TNKFD%2BbaTLrDKt7dG4uQwGCIWaP7hmmkV34mGsqV8KqxwYBFgRHDa%2FXYNtvOrQTRNn5pYshu0p4vZK0lex6gmmC%2FtT7QE1JPv%2BIPML6t6PLb1SLW11BtO6LjNXjXB%2Ba%2FylyrRY%2BBmq0vyldPgZMoZfepwW4JOymLeEwolkc9ogHwO1GT6rIBMzp60d1acWc2nN6vO6jEg7X6vUdyJ87sy3LW4ROn0VpJvphI1Ch%2BvvChmLrGFIIm6oKszx0RoLN%2FqwRQr%2Bd0l0nxJfitv%2F8yfFlFzQCPaoWGIo6yIsaSKlTmCzBgjj1yHG50JscPA1d73vMnH6zJd0TXe%2FC2o1Aa0AX6fqSJW%2BhjWRgZySG%2FaR4fwoVAZdUdAQ3avXtuP2SNXwCc4tWqBqIHviyzmh1O3ZTHDJsPTV75Eqn1AcbLJMSajjbHEuKUdID65Yd2hiT77D6%2Fyk3EiANmXxrMMaHq80GOqUBxx6CcoYBtmwmBwx47MIeP6w4bViiHwjh6SN8K5g1QLRbw7Hcz78LpXLPKbe1mxnILR8fDaggkrbGqQ%2FWUTYnVTvSq3VA8cmZtzpul7qh%2FUWKlOfVTWOcUDYWvaUtnBmjqFvURJy3Qo7qK33soYq525hDqMF0U9cw1O68bV2LbWi7KPUKC1KUA8798x8VEG95FVRZGp20YE51swnjsBRcOww6WvRj&X-Amz-Signature=ff7d6484e0424af7c45bacc53263f9e4a4d2fcfd00b590378a172c0e2537085b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPC3XLDZ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIQDBKl93KBxs%2B0kLMQ%2F423ZTG1oafaYWfmRhoIrsqw8aAwIgfFgIEWVp09BPTNcmO69vQmWVfYUonrD%2BcBnmjkn6Q5AqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOKYtPSjMZQIVK47UircA7Aqox1PqxoCfNWwWbUq4LKMA30d8YYSlQCNkw0wpPsd7HQSySj%2B%2BaVnLog4JfJKNuMLHQqvtNayEdwnSvBxb%2FNkVymSXORl3VkNYmBI5pIdThLLt9VK3LHXeJQ6slt6bmb3GglNaYynVTAkpfNXMnZf8B0rGYbNaloTX20PqsYInZbGOfw8Xlb%2FqUS5U9jf8ASgAWf95XAgMVq7VRIl58Y9fF4ZOuAsYtAy1BxTVOv6oPRfeyD2JA%2F%2FBPKhpFdPuQX4DCbwNee2oz4h7bBZ7rNrrc%2BS0bM15kfFHsFLk1qUJTTeAqr%2FTuS08xX6EJlLlhqAZnUgIcLZQSiMaaLClUjE%2By0M%2FRQOYSU%2FwFvtFrST6snk26gA3Gjf%2BKXYD6LU1LNgMUQBMR4YpGLAFsSIPUJgJNQEnv2TOR2Q4HIkNB96RUwPztXPxs3RNBkjFHnkwpb0mo%2BtKAQXTDKugEME22q7NCU2NfbelxGKj3yEthGi%2B29ANOeaq0AEiu3W5XDw7zj6lU1aC50wmI5zfvDCNSHfMKWuYvJQgjRDN6zFRvkTQjMdBdK7NjAStwfB0NVjQmkh9ISaaKYadoSlA0rZ5rTulimusx1XP3No2uWlUTxhR%2B42X01lBoOZcfE9MJOHq80GOqUBD%2FI8cF9jVs%2BEX3AcFT0Fgt%2FlcUJ1cblUFkS8VmfpMCy3A9iVkQEBzxZwx6cydR4YWTKEviTRrLLUQOCs5pwibcSMOZr546LN4sdHa9OiGP30VqgAvqnctH7QDNBXwOMNKtCv4Da%2Bul6HGIrX7OVzJAypSb%2FsSSPze5wWagTTd%2F5T1YQHf19WY3ZiV2IHRqsSVZjBDrYtSrGxVZhL9cPNffKP%2FhB%2B&X-Amz-Signature=cb1fa9b97811774f0c53f61cc0a3383d0f2c7039232abf66c4c63eea7b940c6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPC3XLDZ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIQDBKl93KBxs%2B0kLMQ%2F423ZTG1oafaYWfmRhoIrsqw8aAwIgfFgIEWVp09BPTNcmO69vQmWVfYUonrD%2BcBnmjkn6Q5AqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOKYtPSjMZQIVK47UircA7Aqox1PqxoCfNWwWbUq4LKMA30d8YYSlQCNkw0wpPsd7HQSySj%2B%2BaVnLog4JfJKNuMLHQqvtNayEdwnSvBxb%2FNkVymSXORl3VkNYmBI5pIdThLLt9VK3LHXeJQ6slt6bmb3GglNaYynVTAkpfNXMnZf8B0rGYbNaloTX20PqsYInZbGOfw8Xlb%2FqUS5U9jf8ASgAWf95XAgMVq7VRIl58Y9fF4ZOuAsYtAy1BxTVOv6oPRfeyD2JA%2F%2FBPKhpFdPuQX4DCbwNee2oz4h7bBZ7rNrrc%2BS0bM15kfFHsFLk1qUJTTeAqr%2FTuS08xX6EJlLlhqAZnUgIcLZQSiMaaLClUjE%2By0M%2FRQOYSU%2FwFvtFrST6snk26gA3Gjf%2BKXYD6LU1LNgMUQBMR4YpGLAFsSIPUJgJNQEnv2TOR2Q4HIkNB96RUwPztXPxs3RNBkjFHnkwpb0mo%2BtKAQXTDKugEME22q7NCU2NfbelxGKj3yEthGi%2B29ANOeaq0AEiu3W5XDw7zj6lU1aC50wmI5zfvDCNSHfMKWuYvJQgjRDN6zFRvkTQjMdBdK7NjAStwfB0NVjQmkh9ISaaKYadoSlA0rZ5rTulimusx1XP3No2uWlUTxhR%2B42X01lBoOZcfE9MJOHq80GOqUBD%2FI8cF9jVs%2BEX3AcFT0Fgt%2FlcUJ1cblUFkS8VmfpMCy3A9iVkQEBzxZwx6cydR4YWTKEviTRrLLUQOCs5pwibcSMOZr546LN4sdHa9OiGP30VqgAvqnctH7QDNBXwOMNKtCv4Da%2Bul6HGIrX7OVzJAypSb%2FsSSPze5wWagTTd%2F5T1YQHf19WY3ZiV2IHRqsSVZjBDrYtSrGxVZhL9cPNffKP%2FhB%2B&X-Amz-Signature=e0d2c2ff377dfd858dba3d30fefadb7df3652a43a9628eff7346c962f9735e9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYPTITXK%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJGMEQCIBLJwfVD%2BCduZaIC3HRiObnU5eWLB85G%2Bd%2FD9dnLGOfzAiA9kBy0%2BGUaDczppt4gRea8C9QLkxquXodSDaYzmV6u3iqIBAjl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRAuRri04KWOv1Z8KKtwDxRIPvvLTMZMmV%2Bm7H7YKqEiB8lmd8tHj3RcdEHpUX8SNGhRKTroOgs%2F9V7BzYw0%2FhLOGLGbtdSzFDTqQYVx580R7qnrCqsmYL3YkZ59N%2Bx2Nf1bqqOgqCLyxbbbk9v1J36qdkSg0myqjxoIQXoToZ4fcWI0hrDg6U4OL5AMWXDg2rcxb4FbL3eUKbXiRf8JtieKeTjuAav1WvG3L61HNx5krA3ZdNygjr6gslfiY%2FqBETCYXxu8%2BQCiPQvy21XFJUEbkiNQQrn2%2BpRTbzS6KwIx4JiOlajZKfRsqnG0j8uxlzT3yKCC%2Fn9ta7oow0DdukvnIdKGcL1PxqI9xeISpG4qRdmiYFmV6tEy7%2Fs50XjieCh69kpAqPaUjbXf%2FIYeqrUHbm6azI3lZT8K9zOr9yBF51q0TMnPBKp%2B%2FratI0WpD0OicyEuvux4QbxF7AMHyFbGI8aS8PlIIVlPFdM4r%2B5HLdx65ODWb0l%2B2RbQB0kiHQ4PGYcwa2y3DJt1XeA8hbRjf%2FYsmyNeGL2G26wwapJdYZHKjiN0W72A2e%2FasB8DsXfVeIawHJvHktWOGjQSsu62nKPThfwGxRTS7mc9VbNBQAGkqNwhKCIIYz89yenByiiwhX2OfbdE5mmUw%2BIarzQY6pgFroyJR%2BDMhhRhC2dAyvlHs63ewqg1zqeZd7kRLUX1aE4kv9sg4ZID5ypKfzqFus8iCImJKs9f22fGM65uZbaawn9iXBttH5aaKeAn0RMOwa7eTJ%2F2l8hOZCwZrJ6fn2DfYUp%2FDRdzunKHVcDf3ai9FuOHBK6j42N%2BLCVwAgOWYZaMSSSu3HfMjxZ%2B1i4Hz3Lr1NFpSENndaem9jpwXazZ7jCiJcBwX&X-Amz-Signature=7d02ec4f4fa63727cac6612d17ce135e63a511b0b801371d96e1dee6c069dd33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652M5JETB%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJGMEQCIBQQ%2Bll2GCz3r2ROfcQ8PozoLAsOjUKwsibV081J0ExoAiAd%2FIGf0LV1bxO54Va%2BAIE1yNy%2F3wO2wI0u9MOS2LU%2F5SqIBAjl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMP%2Bl8oWFogJZOtQ4sKtwDkhz5WUHuc3cvllHvRBGIXnC6xZA1T04VXcCvtoG95yxBq36XJAS00ngHRolwIm6IhRqA0AWXZT9OHhiRn%2FEZGceMarDGlxTY4NV9%2FQnGoQoFuOysjvkYV6G4Ei38YzkHfPfpPiwH0ERvm8QwhMZ9bbLu2%2FfzJ3s2MHpzQfecBwuoa7UIbpFkkwYq641eHZTNDIH4Ng3WqpFghWAnF3jHYR40H6NzMuT76uh7VXtA%2B9O3i4Zjzry7rIaNfCXLgnvIPJA0FkDlhUzMWIgpoaVYyyAca%2BtJOrk5vYjDVvVRDHvumiUcvYdgvmgMZLev0VeOjIvpgxFgbNhUN9woREx00OtNjrr6jiMXSW1TKbON2KUVxKW9vdFW3skLrA5fGL6xvqkU%2B2wTR8effZjDJLr%2Fja%2FxZGYQn7QTydo%2B0YyfX%2BzOaZlBsAnLjI3A4L4kiAswlNBr6pYjhfeQGZjKPshMw1CdUD1Z%2Fti3ZrzqiyABOlNH90u59Flr9gMBmKr6OtUPJdM9Zc%2Fi7dsZ41twrp1smNrhe9A1YQ72JoilxJ4josIZutVKwJZLGG%2B7I7u8t6znG%2F%2FzC7EkBzr%2BxBguNWGa8TCbDb7TRHPb%2FSrnyEb2%2FKxLPnjUGlCA2Lc%2FPjcww4erzQY6pgEzos%2B0RHI1rrPP%2BsJ%2F4nRQ1%2FDgGXS%2FwfKfP37UzpYNU3mOPt6bpXYHcZm4G8gVYjmq6Ub1ZHXO7s5Y%2FL1HfuLC1o28MdPOebW0ngqlG6BOW0XryNWvGVYjSu0wS5D9FmFX58IG316YO2RLHmqBOZqJzzQrF1ymTc1wtr6HCu47WlI3qwWRa9spwA90MrsPv0kaC348nboTdBEMCE01UtA2YFky2KJ6&X-Amz-Signature=d443dc615dcad0278fbc7ac5074dae43b605d9686ed8a99356658640eafa7e07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPRU55HS%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJGMEQCIGPrDKIpUfEdTfNcMMisdXjsnJOXQ3N%2F1eqtMTNV%2B7sLAiA5PFyWyQUWB14ZIF3cWaYCIOeXeeSf%2BNTnbIXjmSVHUyqIBAjl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsGFPvQSVGoIg8mQOKtwDS9II8eVfqNx1DdI07xh9YrvLijYd3DFnzV1Fptf5r4apaidHUr0hfSrYCC1U6evBBpHzkukVJCpKPZc7ZOxu1Rv%2F3bjnKLj0%2FOtlNavLBpuhFKvigJleYiSJNblruvPBRR%2FIhzk7Wx%2Bpcm1XIVgZ8AWR2617g8Z8bESkRixN3jbh2zGPjhkxpbR%2FWxt%2F4jMbT1gwYGG2ji4j8XSjFCkXrrMAE6%2F0PyfRR01quRlFUb0kBxU6%2Bv%2BiGzmtkwoWqgx2WQHn39IiZaZavA%2Fo9NGJqNkQuUgoQ1bisO4q58bxmdODHtvJtg3L%2B836fJBRVipbGEu8fW%2F6rlpYPh29X9qs2PgYXI4F63Q99oljyJ8lWOdD22%2F%2B5AykXpTMXdCCv4m9u1ZpVRDqlL%2B12c%2BhRVwTQdMEaisBUFVm%2F%2BXf1LSKRVkizZAB%2B4q6zrxranMrZ%2B3kz%2FSHEvSfCGCqycMkuVT7smyTkuxT7s6LYYgf9%2Fm%2FdV89jCBqCXSSdqqXK1VWM3Rw5oQMMN6J5VI%2Bg0JSFduCsfA%2BxpL64AVjYsGHRXoGTL9JM1H7%2F73caUTFzbpDVrtq9gPqmxD4Dp8osRNJ8LwyHxkmCgUFUYzp%2Ff5Dp6Bi%2FCDy1nO%2BxBzohxij4w0w1oerzQY6pgEVHaYP2SvSblzhiE%2FzsDP6m6gk9qbvlmzomlvNasqufReBAJSb%2Bia%2BKZ1%2FubXoSDpRzAG1xajp0ebjuGTgHo1y6tv1mVMwYbPy5MstpAl5UD9MYOZMNJKF8Th%2BMhwq9RB1a6zE5Sl%2F7FjlDTczo5JxFPxpFipig0B1tb0W49%2FNFTrWUl3r8aZ8k4Mo%2BJzzsPGTjMqyIe7lgBV7V4zwehRUK9l2%2Faxm&X-Amz-Signature=04409b46c6afb715a9554767a84a99620f52dc78729c23767792c9b2acc3c81e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKPJXHVK%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIQDFmlHNx6pQrGfhhkuAASW7deEQulOA5nKs7qDcianflwIgOMMVKoM8KNoYCLKRmaLtGeRF3hJqifAetfNymbPFWToqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIr2cxmONgs%2B3RON6ircA3fRHWo4TWT77yJrsOWJh%2FAZKGZ2gJ7ZQNe2%2FNhi7vHWCPhFt14B4VtO%2FTOVzY3Mm%2Fgo92UncqsAdhi0t3FAVIjLY9CdB8THPF2yhKJRLtvthxMqCuFZQNN8v1on%2BKeZDJQR7m16RBWCiropG8Ml16dPk6bh7iXRcxU%2BqoB7aBhoUiSE1TTNlqmj1pvPDA21F%2BRPIa%2FO3d%2FvheEa2LlStWTqWqElwTXiPRF%2BKXYpJZXYONk9W8X%2BAXeIlTpgwHhYASMcmX7MouazlXWRl%2F1cZLAQ%2BAHXdGCbOwfTQ9mErmyfp5RB38XGENryC5PoumY%2FHByYmOkErgGDT80WBe3wpFZgRoDYkyp0FmYWttiMXtQWpSpQnwhxLMtUb4NdEtwyt31MZx%2BgNh5ZRlaVlK496ggobYFHBrjo4yh3omYkFagRbzmIvEsXSZe8CEDFUJtE58CF4UCydNzLx4yLsLcYCRsGX6iPGhOjHhpfciX9sWMearJtfTJHLIy8OyaCpdwJUYwZnlK6Rsf3fK%2F7FiupRkYr8F%2BJgDA0kLKODy6a4b7e6S3VYAUsfuCY02Zt00bV2HO7YvlV0W8X%2BK1YZIy1OSy7RgPz25xKhqE2Dz13BqCzl1etmAnu209MYLBfMPuHq80GOqUBAfaugS3G1j1noLcOBuzxJ42yXtAop7MmWGggRzG86mbihqUS3cFnqvfD4VtJyjbxRC5Xj3%2FR%2BK1nkg4PjPxyfWmal2tAMjBdvqnJ9QcTp%2FVMx4ag3ev6dfPre6NB12443RZ99t26MdJxmODAaknPIq%2FbHgQHFmXDi44YwjqhMjBkCAOaAmUOZsjLvT0XddmABb2UL5XPfgTzYVaKq3h5mtYE0CFB&X-Amz-Signature=e566ec767ef784352059091afbc293136865dd23e2d8a051c80818f1704cb112&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKPJXHVK%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIQDFmlHNx6pQrGfhhkuAASW7deEQulOA5nKs7qDcianflwIgOMMVKoM8KNoYCLKRmaLtGeRF3hJqifAetfNymbPFWToqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIr2cxmONgs%2B3RON6ircA3fRHWo4TWT77yJrsOWJh%2FAZKGZ2gJ7ZQNe2%2FNhi7vHWCPhFt14B4VtO%2FTOVzY3Mm%2Fgo92UncqsAdhi0t3FAVIjLY9CdB8THPF2yhKJRLtvthxMqCuFZQNN8v1on%2BKeZDJQR7m16RBWCiropG8Ml16dPk6bh7iXRcxU%2BqoB7aBhoUiSE1TTNlqmj1pvPDA21F%2BRPIa%2FO3d%2FvheEa2LlStWTqWqElwTXiPRF%2BKXYpJZXYONk9W8X%2BAXeIlTpgwHhYASMcmX7MouazlXWRl%2F1cZLAQ%2BAHXdGCbOwfTQ9mErmyfp5RB38XGENryC5PoumY%2FHByYmOkErgGDT80WBe3wpFZgRoDYkyp0FmYWttiMXtQWpSpQnwhxLMtUb4NdEtwyt31MZx%2BgNh5ZRlaVlK496ggobYFHBrjo4yh3omYkFagRbzmIvEsXSZe8CEDFUJtE58CF4UCydNzLx4yLsLcYCRsGX6iPGhOjHhpfciX9sWMearJtfTJHLIy8OyaCpdwJUYwZnlK6Rsf3fK%2F7FiupRkYr8F%2BJgDA0kLKODy6a4b7e6S3VYAUsfuCY02Zt00bV2HO7YvlV0W8X%2BK1YZIy1OSy7RgPz25xKhqE2Dz13BqCzl1etmAnu209MYLBfMPuHq80GOqUBAfaugS3G1j1noLcOBuzxJ42yXtAop7MmWGggRzG86mbihqUS3cFnqvfD4VtJyjbxRC5Xj3%2FR%2BK1nkg4PjPxyfWmal2tAMjBdvqnJ9QcTp%2FVMx4ag3ev6dfPre6NB12443RZ99t26MdJxmODAaknPIq%2FbHgQHFmXDi44YwjqhMjBkCAOaAmUOZsjLvT0XddmABb2UL5XPfgTzYVaKq3h5mtYE0CFB&X-Amz-Signature=943f2646a4d3e35bee619372f0a85d8b6857c78289a7ddb6d4fd16cab7d2593e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4OUSPAR%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJIMEYCIQCy5IdTyCeBYoDppkDNz8O4VgcNfKAQPphJKlVVYFK%2BAQIhAPWOV8RauNK%2BBWY054zxRV1mc04jjXyL9zm3G%2FJE9J%2BZKogECOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw6fekuzADqb%2FqXLLcq3APmXYSXX59BYpa3vYldRi9DCYd6HfAfJo5wkj5fLsqu%2By5nVnXwVJ4DHo5%2BVK6SzEYUmFcFwP%2Bkotorq9n0wdQtJoV0a%2Be0DL3x8aFsvOjqXBFNtmfaEYIhqaT%2FFTVSx%2F5b4FQ0JJfVP%2FLPNoX62J5MPFRn3dwoz%2Ff6MzOK3zYFgW6WW0CA8Ibse6wOH1MKggS1RsM6%2FQXK%2F7OiKJMVeq747DLd71YWvFSYvPpH%2BkX05HeEoSLbboFeM7UWIkQjlxuj0m3M0K6efaIvxOMjZO6YjHzEaJ24EjH4NC8ijptJWJhvXmVrWlYwYVjtNFLAJDwbLfkDnBPWd%2F7%2B2470g1Y4W66CC0hNa0I2w5GjrGn31zmM9FV1yi9A5UdM6bsk%2BY55c5W2q5GsdPJCDHBwHI5Bk%2Fc906HVxFsjfhW6ehIIN3U39gHPCdmBeTa3kXO%2BFzSh1dW3nV6wPLgmrcAEqP1YFiSkffiWfT4TydNlUUJOdoCH96iXOPnPdHwFvRe9AHeEzeu9JTyQcFw%2FE4JwKw88GMePeq%2BhtOR8bSL7iV7ruqvnWODmodEjrUaRnzP1uVFrSnE8vhzPROu1pUadktGF%2BiHXbTI%2FqSQtnX25RW2pxzSDtrRhIxnlUvEqJTDFh6vNBjqkAaRmYCimuMREPhnPD48sm3qbJlhK0O86c2Mp2ZKRWYZY1xIG14F%2F7ACDBmd%2F1lvt9Goo%2FJFSs44CCxwqaYkrLJ2%2Bq7GMDJQT5JxrM2tssgb3TDQnMrK1vRNIlf7yZKzHBSDnclH9na7a%2FYX%2Fqx2vXQ7dGcQq0pW8va70aNT4E7VdJ%2BYOTOPNmhFHNUm1a17103rzQuGBAab3yG5wnSBTnICdVcVe&X-Amz-Signature=01d5fbcbcf78f0664ce911011201a54a7efc87985ca52c5c91bf8d949c80fc3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YD56F6WU%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIB2I6UhB7J7bdZL%2BbYPk5XH%2BCi%2BO0RdpfYw81yLTVrjDAiEA97NuGRKT1Nsne%2FxVzp3HYSYGuKp47CFon9XgNLVcYYMqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCoeSSo0duUPrQOcECrcA1j8OBcJyGoEXO6eeCTw%2F2TfOvcE3SgyMTJEjFwPDlBA1JwxKYavCbU2r4ugEYuA6eoDN6b7ggtK%2FIzNNpL6rdlXMUlxAZ%2FPq6x9B%2FtZcmxZDOwaLMeB%2BnO3P63BtRIV4uNqQryQ3YJ6OyJaOsPdK%2BIO9m6w3OfAYwttjSaizJVJL%2BgxnjDUrXE3tUzMvv0XNdIvh0JxVmWrGMEKRIIy%2BkRI9zvkZnmu7yH9TAWZvw7ZizkbFfAbyY0JxdBlId%2Ff6LM9%2FVlN4UjTmaFTQ6XioxBFLtJ9K9DmMD%2FTbc26kh1uAorKBt0XHujIxWGtcNTvMTxkw9y23HUfdhmPtF4XKhVYEWkPw0FwfZSoF75usQCdrwt%2F843x7CQ8pdOBng8acaWO9%2BVNlk0CQfiXKxq%2BXZPKE9yNg3qpFeQYH52jzK%2FioBNvo8NURmXJ7wVGYejoC30Mui2LkjwhIC%2F0WiYML5SPXrJqhfPQHwzquEbtpFzBF9%2FZQ4KEbl5tdL8A6av3GwPYhUCvXffye60UlLIP37coWZi9IaIxsM6%2FC0HXKf30Te2HOsQ%2Bo%2FRRGwEa3BdId6kZM%2FdIvOb38IszSUqTsWqg%2Fdt9653fQhqjmPY%2BrCst6P7o0fL4995GHPyKMOqGq80GOqUB8yxchzYaM551EvOrkLvJYGAdUkSGdtjG3P75J3k3YzTYepA8V1gyIE1uLUSYFpOERHd1pEKdX2laJve0isZhbGNPIBurHUs%2F7tQnxJIffxWO4zydT8s%2Bc9PXsbiZwcxvOonymI18YV6XItGfhFrO6UNvfYUBNgMuvimET4NF49mxuNmYVTtIWs5PI%2BLAZ%2F03%2F%2Bvsn%2FM3w2Ec63qfHQvDdEI6ocsF&X-Amz-Signature=409833dfad5c4583b27d3bb918ca507e5ee35d76d098ebd6eeaab1e71fcb6be2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YD56F6WU%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIB2I6UhB7J7bdZL%2BbYPk5XH%2BCi%2BO0RdpfYw81yLTVrjDAiEA97NuGRKT1Nsne%2FxVzp3HYSYGuKp47CFon9XgNLVcYYMqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCoeSSo0duUPrQOcECrcA1j8OBcJyGoEXO6eeCTw%2F2TfOvcE3SgyMTJEjFwPDlBA1JwxKYavCbU2r4ugEYuA6eoDN6b7ggtK%2FIzNNpL6rdlXMUlxAZ%2FPq6x9B%2FtZcmxZDOwaLMeB%2BnO3P63BtRIV4uNqQryQ3YJ6OyJaOsPdK%2BIO9m6w3OfAYwttjSaizJVJL%2BgxnjDUrXE3tUzMvv0XNdIvh0JxVmWrGMEKRIIy%2BkRI9zvkZnmu7yH9TAWZvw7ZizkbFfAbyY0JxdBlId%2Ff6LM9%2FVlN4UjTmaFTQ6XioxBFLtJ9K9DmMD%2FTbc26kh1uAorKBt0XHujIxWGtcNTvMTxkw9y23HUfdhmPtF4XKhVYEWkPw0FwfZSoF75usQCdrwt%2F843x7CQ8pdOBng8acaWO9%2BVNlk0CQfiXKxq%2BXZPKE9yNg3qpFeQYH52jzK%2FioBNvo8NURmXJ7wVGYejoC30Mui2LkjwhIC%2F0WiYML5SPXrJqhfPQHwzquEbtpFzBF9%2FZQ4KEbl5tdL8A6av3GwPYhUCvXffye60UlLIP37coWZi9IaIxsM6%2FC0HXKf30Te2HOsQ%2Bo%2FRRGwEa3BdId6kZM%2FdIvOb38IszSUqTsWqg%2Fdt9653fQhqjmPY%2BrCst6P7o0fL4995GHPyKMOqGq80GOqUB8yxchzYaM551EvOrkLvJYGAdUkSGdtjG3P75J3k3YzTYepA8V1gyIE1uLUSYFpOERHd1pEKdX2laJve0isZhbGNPIBurHUs%2F7tQnxJIffxWO4zydT8s%2Bc9PXsbiZwcxvOonymI18YV6XItGfhFrO6UNvfYUBNgMuvimET4NF49mxuNmYVTtIWs5PI%2BLAZ%2F03%2F%2Bvsn%2FM3w2Ec63qfHQvDdEI6ocsF&X-Amz-Signature=409833dfad5c4583b27d3bb918ca507e5ee35d76d098ebd6eeaab1e71fcb6be2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPLJ6A62%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T122502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIQDlxu562pFToDTxv7JPyQgckPswudYZSXiU6Fe3c9rA%2FAIgL2cYgJhhUHsomLMEbdwQPtzNZUrhSC9UaPDN%2FB4kTk0qiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDDhktTeQPU%2Bv%2F1XeSrcA%2BIzvZt%2BxOxDK6FE7qESjdAeZ3UtkFQHCQq9FVs4oL4btih2N88UxUEuJ1yg%2B3MbpvveCoHvNwzHneUG42IyG3rWY9CdYatRU88f4OU2S92KgpA8u%2B5aPExgaEclhs6CXOBrn7TBkDf1eP%2BRwzcZXceAJ7temLH0vlYrqhtcN4DXmUqviHVHX3%2B5fQpe%2FBGT7yqUsBx5b3u7iU%2B3Aki9SxtXhiSHg79xaf6k7pWWY%2BQ8Zvnmk0wbbwufgRjGPOdwYlNmZx9zcyIGCoC86YGsL9fM%2BDrcekZLISCX8c3ZfiELtOVgf1XTNrOxxlhVzNHvIwW4n8aY6nGYRXEMaodGICQiUCaRwKK8MqolJesYeEaAv4YxAe%2Fkv8yzNDL5RmwIedsH3e%2Fldq2oFYDucarIBflE9H5uCFzca773%2FmgtAEDGN7dBaOgGE4L3%2BTQxQImMu0csQTBdGSG8QrtYnCUNNTxCQvi1MnZY2MqyiaMkD4Os%2F5mZcheKjPQaIVZCSz%2FQSwupv%2BIm9dcCwFqOwAbeg9tTuh104esW1nqnFHySfvsmp1d8ID8ISBi%2FzD4BQUS7QbUd7qttfstCggBjv5RvLBYSiMV2lmd0bLzAoj3LXjXlTd%2FLoJeFLmVqyMvrMJGIq80GOqUBZAchKH2OxzaLgxWJ%2F7LS9qQWr8%2F8N0HAia4VYXHVTFbz6%2BY9K5RH%2BWtIf%2B8iNbrQKbsjVEmD8Q60%2BtBjVyIJdd%2F%2FY4%2B7waXX0rINAl9MMWS1hdbMj5wcQEw2Qvm7NHbYjOioOZyvETEkFMMq1iZ6sbieAmc58xOcW%2B%2FJo2cNvGM6fEQwzAk6hXNlyWZ1t9gc1mSAlOcbz9slrcnRvydPiiyTqkYZ&X-Amz-Signature=dcfdbd68e80e4c08c7300d56c127658f645c8dc264dca18d6f960204d86fb478&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

