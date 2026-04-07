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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UATE4Z6D%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQCkL5a%2F1vf1g%2Bqx%2FjIis1Vizcph7xUZNzFQCpmJj8bCSQIhAMzKtYnJsATx9fy5TKGXscPGei2RmNEnpIo1qrSS4fDRKogECO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgySeTsSEIkK3fcuXckq3AOcqQa7tSSDj4Lv4obJMo0DwtPD3tHwsS%2FeE%2BJQ415yuCG7UOCoFLtQV0xsduZg1H3olss7gkvQAGmMisn6IY%2FrX%2BNRses2r7MXMXPSjjCde%2BfhISQRsCxJmO6%2BH%2B%2Bc%2BHiFyIYI6TtXTyfd60PhrLAb7is7AchNZ4nXGrWsuFnd5UE%2B1BR07tq%2BH7uQBCPemmM7HZ9cTIqDO1AndYgivWcNqfpfKTH4uHoXnhfyZogOt5ZqnTwiWN046s1WnYYvYFVDXF5iu76zJyGHcjGDbhjCx7z7kA1H6gdQwveNkjo5%2FZ9As9cqN4pXb7dw5u2evjF7W9Mt4xo0bK8SbyeeKY6mu6TAYBDBTPQ2XOk4mxVPRx9JdSnTWE9FPxH16tHYnTWQkGjY3Qxhi8xf5LORnBXnGiosW0oIXp6qcv92mM0Ts9bp2Epn1koq4D061s5TMhiCNgAtbRnNqT5oYMbEvoZTrzrabbhU7WLs7afgxk9ma5dAWK7%2BsCKs2NzUQ9RB9WivVZdaroBq9zMSpCCZLc0G2CLMYaUrmONT%2Bvj5%2FfvLscx7MNrMfthwtwjt%2Fv%2FnEg8uqxKrie48uIWtZyD25uop4ydiJbNiVeaLZU9d1rX3JF1ztwrPRqEMSBBVVjCA4dXOBjqkAQniyyKD5B7y3vMfDvCgUE%2BX%2Fs%2BzYInd1GMLjC04IM0esQjMhzXSe87D0hWSHOfsO%2FUPK8HBjxyG%2B4JBbkzQ4PxaKTqXuBcD%2BeqhG4rqqaW%2FHYnmFjsBrssGVW8%2Fcvj4M0%2FwaO0K0oriFAsXwct0yAg5DYHcpeS%2F%2BKlEXWc4n9LIUVd2bW%2BP1myK6v2YO%2Forf9mgyp19QeU8qwOJaiezteGgSTMa&X-Amz-Signature=8632f2962ec9282a6105eb775e89180d5e091e578f846698b33777c33c73e615&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UATE4Z6D%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQCkL5a%2F1vf1g%2Bqx%2FjIis1Vizcph7xUZNzFQCpmJj8bCSQIhAMzKtYnJsATx9fy5TKGXscPGei2RmNEnpIo1qrSS4fDRKogECO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgySeTsSEIkK3fcuXckq3AOcqQa7tSSDj4Lv4obJMo0DwtPD3tHwsS%2FeE%2BJQ415yuCG7UOCoFLtQV0xsduZg1H3olss7gkvQAGmMisn6IY%2FrX%2BNRses2r7MXMXPSjjCde%2BfhISQRsCxJmO6%2BH%2B%2Bc%2BHiFyIYI6TtXTyfd60PhrLAb7is7AchNZ4nXGrWsuFnd5UE%2B1BR07tq%2BH7uQBCPemmM7HZ9cTIqDO1AndYgivWcNqfpfKTH4uHoXnhfyZogOt5ZqnTwiWN046s1WnYYvYFVDXF5iu76zJyGHcjGDbhjCx7z7kA1H6gdQwveNkjo5%2FZ9As9cqN4pXb7dw5u2evjF7W9Mt4xo0bK8SbyeeKY6mu6TAYBDBTPQ2XOk4mxVPRx9JdSnTWE9FPxH16tHYnTWQkGjY3Qxhi8xf5LORnBXnGiosW0oIXp6qcv92mM0Ts9bp2Epn1koq4D061s5TMhiCNgAtbRnNqT5oYMbEvoZTrzrabbhU7WLs7afgxk9ma5dAWK7%2BsCKs2NzUQ9RB9WivVZdaroBq9zMSpCCZLc0G2CLMYaUrmONT%2Bvj5%2FfvLscx7MNrMfthwtwjt%2Fv%2FnEg8uqxKrie48uIWtZyD25uop4ydiJbNiVeaLZU9d1rX3JF1ztwrPRqEMSBBVVjCA4dXOBjqkAQniyyKD5B7y3vMfDvCgUE%2BX%2Fs%2BzYInd1GMLjC04IM0esQjMhzXSe87D0hWSHOfsO%2FUPK8HBjxyG%2B4JBbkzQ4PxaKTqXuBcD%2BeqhG4rqqaW%2FHYnmFjsBrssGVW8%2Fcvj4M0%2FwaO0K0oriFAsXwct0yAg5DYHcpeS%2F%2BKlEXWc4n9LIUVd2bW%2BP1myK6v2YO%2Forf9mgyp19QeU8qwOJaiezteGgSTMa&X-Amz-Signature=8632f2962ec9282a6105eb775e89180d5e091e578f846698b33777c33c73e615&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAN27L7V%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQCz4FjcJDb32iTA1lioapH7UNV8MqOyJWhtTTUHqZSRkgIgLvmiiGk0SF%2BJ09ordtYNPQMIDpoDrU881hzoXGmIGgkqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOPrOh%2BPfVwHarINaCrcA%2Bp0P1pYRbsoMSesIdd1EhS1TYfpkMQsha58vClhqZqChOUP6iSdGbduqycOlbAX9WtTJ%2Fhzd9V1jALJ5%2FsYOfUIQpSXvTC83LZ4%2FBmYTI7%2BLKKHaqKNHyB3TlDJg49a%2BwEex%2FvIzdP4TWljHpeAaFzlninBTlQJi8VEoUe6JIkdzZ9MwiC3EEDEVv5LDvhQ5EDfSTnYXQalhBU1ijCTZbBP0BsJ9qzLzR7dbmt6FfrClQk%2FxTr8n1hj3V89%2BV0EBSmpUBXYAgGPAlsV%2BlgiQl2Q%2FHtX07no1IrOnf5NHmGhfiHemVHJYBFHHT5h4MiYAF58KvaeZj9UaWbMjfL78OarUfEuSuR%2BqPhxpwLieI0qxTCVQ36YalcbQqoIihk0%2BhfKx4VOweUqStbrT8p099PHidkbWvEFNbMmAT3NIvGxZiQe8hwPwDVIs1%2FVlR4Ja6PWAxnDndKMR%2Fn8xufiIIjWQuiXkzVPVM2vHEJn5hXnb%2BkfDiCYVhrFmev4n00iOPxGhzx2MU8zJnC8dZNihJqFDuFlzvUUcND5NXmToiKBQXzAJRp22dMNCeqSFB2xM1QeXBiyg1ETT9Ga%2B8ClCArpxW3gYxuux%2FB%2BeQuqqaMnnQ1nw%2BkxNneIGhGMMJfh1c4GOqUBiYPFYQNDC1HDy8rdENSdJISLDMmj%2BuL9jzgsOGTCq9tJsSqsc0ymqIBMY%2B1A6Bp49mQHxvKUEJkX%2FrUBLCKau07Yy3VuvHaIay1M6Hq4YfganQ%2Bu86ObiNpRL15AuDjEtuj8xCXsVP7UPWnKiJaPi2AU584burSKu%2Fg4Njek6b5NjMn8E3D5V1jRQVoWjFEIzholKbWvqmeNBjdA0l3UenEwjVhg&X-Amz-Signature=358e2601d9e8b8ba802788997b10a8597adf2b7866f47fed01d8d29d81489b87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IM4NTAQ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQD9HdkkVbbYZjLhGKqpsMvONExY6aZqiUnzrstUSotCgQIgIJHF7%2Fiw41KKMyX2m2W0VRRsv8Fx2e6KXMP4DlNlTsQqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJS%2FGKteoI2dgEnB8CrcA9vg6JVAnz%2Bz46hrLbGLpLUox98jxl0co3QZUZujdneUQTrW2Lal7aSB6iPUque80pJw9yXrLpHwLx5CoVaUnzogyC7XQxt7eclCDgZ50FJ0yV1wKCz337rwM3xstRIMxIWBwtPQFVJpsxIyVgswF44K0IkA6jlca91411cgq42m4RM%2BAlN8Je9WgTHPXtIbTNJnTrc2sksDTllasHkRHsxFwK54u%2BLPLzS8yZA9fbWUz4sttSF5OubSmDE1zndL2YWa4988sGbNA9CDVJTPrQP5AoppK5P3%2FFfXFFLubIATPc42zyl2Oq6HK7qePwMeh6Cn7SAMNEo428wU3RfMflcMMmDTxlqyM%2FljoU0UXW5BioGlErO%2BnK8KfP01n%2FNQMPnGToMqHe%2FBSzlCPnRxOyMlNuy%2FA6xQGlX8qh66nMtLQZBoIKOm6DyS%2BdwpH7JRK1xvqeHaOPmII41tHLAUBnJKuyDGB2SPhMDJHIQzTKg4fe2FoQ3baCR79G%2FZF0paYURnPWXlnS5Hd7eyJ%2FrXoT6KluBRDJqlH5CaMM9LV9t%2F%2Bm6adtZPadcUz0XctAdbcB34ATkDiFb5gJ3woC798j0l%2BuVx1DoBLkSn7JRnPueLyvQOMuX0s2vAYJI%2BMNbj1c4GOqUBB%2B3qr%2BM50kCHL0KHd1EYKE9W7tsu3CGNZYek0xR8tM%2FMDKLXnaUMldyLFqcfoi1j9tEhQloZoyaLuMXF3GX%2Fuzx2E6K339OspsSE%2Fsv%2F%2Bn4F1B6OItDlhgxBEMNKNir0ZsVrMC2Msarrep%2B5bchC1sTR0zSX1sZmpXb8WNXygM7%2B6oPmZF7OAMxjS9xmyA4dOAUkLB8tsphvkHXoTuwZPk27Zaib&X-Amz-Signature=cd48731c518de21f689d538632b713a93e30a690f03708d10e000eede6f0a691&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IM4NTAQ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQD9HdkkVbbYZjLhGKqpsMvONExY6aZqiUnzrstUSotCgQIgIJHF7%2Fiw41KKMyX2m2W0VRRsv8Fx2e6KXMP4DlNlTsQqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJS%2FGKteoI2dgEnB8CrcA9vg6JVAnz%2Bz46hrLbGLpLUox98jxl0co3QZUZujdneUQTrW2Lal7aSB6iPUque80pJw9yXrLpHwLx5CoVaUnzogyC7XQxt7eclCDgZ50FJ0yV1wKCz337rwM3xstRIMxIWBwtPQFVJpsxIyVgswF44K0IkA6jlca91411cgq42m4RM%2BAlN8Je9WgTHPXtIbTNJnTrc2sksDTllasHkRHsxFwK54u%2BLPLzS8yZA9fbWUz4sttSF5OubSmDE1zndL2YWa4988sGbNA9CDVJTPrQP5AoppK5P3%2FFfXFFLubIATPc42zyl2Oq6HK7qePwMeh6Cn7SAMNEo428wU3RfMflcMMmDTxlqyM%2FljoU0UXW5BioGlErO%2BnK8KfP01n%2FNQMPnGToMqHe%2FBSzlCPnRxOyMlNuy%2FA6xQGlX8qh66nMtLQZBoIKOm6DyS%2BdwpH7JRK1xvqeHaOPmII41tHLAUBnJKuyDGB2SPhMDJHIQzTKg4fe2FoQ3baCR79G%2FZF0paYURnPWXlnS5Hd7eyJ%2FrXoT6KluBRDJqlH5CaMM9LV9t%2F%2Bm6adtZPadcUz0XctAdbcB34ATkDiFb5gJ3woC798j0l%2BuVx1DoBLkSn7JRnPueLyvQOMuX0s2vAYJI%2BMNbj1c4GOqUBB%2B3qr%2BM50kCHL0KHd1EYKE9W7tsu3CGNZYek0xR8tM%2FMDKLXnaUMldyLFqcfoi1j9tEhQloZoyaLuMXF3GX%2Fuzx2E6K339OspsSE%2Fsv%2F%2Bn4F1B6OItDlhgxBEMNKNir0ZsVrMC2Msarrep%2B5bchC1sTR0zSX1sZmpXb8WNXygM7%2B6oPmZF7OAMxjS9xmyA4dOAUkLB8tsphvkHXoTuwZPk27Zaib&X-Amz-Signature=c535b6ce2a1d2739e1e7a2cb24ed3400bebfdb3a4028ef365092ef46b870e0bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZH5V2T3%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQC32DPNRrZkkFnnA%2FnUTggQQeWpUk8p8738yeWrVNJQYQIhALoFzul2QDXt3oXdQQMuHae0B5ZF%2FIj%2Bv%2FVtFHwfQ9XYKogECO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxNdNhsVO2BF7Sx8Z4q3ANEGmKMcGxzj23KJKDJQvq8zPPY8xK1En%2FsaWfvOxztdo4iMxEdsyaQSZ62hNHgpD2TmxtrRg8B9Vu1YDj3INbjcBGT7Xn8NdpjJgswo4auyM%2BdZIzEC3%2FS3YekUTcokJ2nURcV1XQB6UM3%2BYNQutvCAdkBo8A3SuUE835uT3jZqzVBntw9%2B8Dd5PdiWnIHgJ4N8nZhOl6OIfhi8eJ3Z9gTvL7qjwzkgo%2BFREiUnHRtLyvMjzFusig2y7V02xLmQab81WxlgKJ4a2KXC%2Fd%2BGJpaUbMlfsLoRfBRG4tCETe2YbFQeNMvThkY1nqcKqZM%2Fnql17sua4p5q1zhpWdkgr59vyfy%2FDxBshUAj%2F4il1jENBjg52DLneqCJOV1XQZLwc6oBzGdmVWwmLQ52IiNMejj%2FhwYCCh9B5L6xM%2BO6gXgfkp2l7Su%2FogKfAzMkNKtekSKvDvpy5UoWaveDsqqGivFWonBvt2adN5LCh97DohmKbUHNMXVNnsPMkqEMK%2BpbJK09Ss1WgY2XTetyzkRe1vrAC1TiHG9L0q%2FSlqpNaI%2FttHhOEfBYT6oKPH7v3YdyBqC5tIArLn4mRLktthjTlrQ9laHJLKX3yZJT1TaAWfn4JZzsg5vS7rg2U%2FvEzDs4NXOBjqkAWxDPH8CKTC4MJFEEpMlxmkMLtx8N5oYG1CLHrjB1bVYR3gjWjQjkTF63l1IQpvVBykRJwv5f61oNjxv%2Fg4702%2FrNukv6qLYn5%2Bsv8wtsnGyzeUEeXF9MnXv00FyXTW95BUXNnWiDcQap5e6%2Bhds51J1tl2CVQLuCidmKi4O2A3YsqlbPlymJ9dab7WCPOpJ9yV3oXIK6Xw9xf%2BsTvNuJOfhH%2FLI&X-Amz-Signature=39c71070b2258ab75c878057ed81dbf9a9ad4967f8a4770adf77fcf13d61c64a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZM6XK3X%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQCR7b8v0nGb9GsikfmVPJ%2B2kagGcQ5dVeJbow9Rijj1OQIhAIQTXNdB1TgIuKx8GvZYXuqPRsjK6zbNcyTXPg5utfsxKogECO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzD4S9IfmgeRt47pSYq3AOIueNlb3CmkolE8iEkxhHcoXiaySY0NVdBdD4oP3XVrVX%2Bt%2FmJLkhnnBS19HoEWEq2HtmF0v5dMBfl93yBaNq2IeX%2F9%2FWT%2FaiJRLod0dQoN5ySDMPC4MFNi1kOUE%2BX9jJc6FICU6GGrQuPXPSzLkgeewe%2FdSrAPxGeLGL8HvCnQB6hmPuAKtk4i8gRAUh4NsCBusSzqTkimHJVddJPKxvQf6G1EyoBz5HMjnynvW%2BQZvexhG1GyU%2Fh6QPxNo9EvSbNh0Go9SZ3BDSCgFn4PGOO3CTQTlS023K0vgl5CT02FFqZQmTa5IRwjudQbvtZFNnAg7WTO9mvjm2P%2FK7O73d95tEMWMOLlxKoIC7aOlWS9qO73M8PDu1wNiOSwe3qTs8y0lSaKEVkd4dhMTMlO855p9YHW6t3OMAocbH7bmQB7W5mZVBRZi%2BlzTfmHB5S%2F6bWd9RJam42xPqB6RnGAASefDSPm5GwhfbNhtEbS5EhvuJvGoDgQ4a0VFnlfKt4xsYBhZ0VyWm%2BDqW1w4awgBVzR9HLqSwxADmBMyqlINk4%2BzIgstJcHzmO5RrJ3x6innOHDcT10KqcK1JXm5xYNHnzwVryHwhiCJV8mWCqWXna8pvCRqlcXSZWZZAsJzDK4NXOBjqkAcxajKTf99slGliDPzsmKAA27%2Ff89b12E60osyqhPSIS7O8YeCV6GE8vyUKOkEIfx4fIBeVtcHsaicnrjGlqBUtny9upaiamNvtZX9ddqOR8SqRJSD%2FjHn%2BOXwrO9rIZzh%2B28hs98XRx4GtsGfzG2sKTgJSUOASzed2twRek2%2BIHKJViLIMkaZJUor50pNh2KxgrNb%2FyJ8vall0luUhRe7%2FQySgN&X-Amz-Signature=da44e98c8f388630fa967ed7cd340bd02109fd9f97595a6695a730d3ca5defd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665L7F7ODK%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJGMEQCICy9ABd4N0T6TsVqm9zxBrkvvMTFvElBdA20LIIiXzPKAiAZP2h61xY86Nz6hKKR%2BPcq1HqBlgkgmlIfqABWhCDdxyqIBAju%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMn1aKi3YgscfsDRIYKtwDIiLcN6M2dv%2FHvJgmjCe6syClLdWtHdad0ZjfK2S8s9c%2FOmtGEc%2BDToFEHnHcg0kUcRoWcqDl8%2BfwrZ%2B7hEbGiTuUobAcc3MTT2lqRQ2zRjwwdS%2Fq777T9FVTlQhNuT%2BrSv8nFQwSBWLLA6dt7IXQxjrRFUOxJCeSIDHBu%2BjT48W0f%2BPAb9bnPlMlrmCnqYiJNbg%2BecMHT08GKkpW1hvxJssVfu5NOI8kvFC854stpgJh5XWC2L1pX5wPljgac3FH%2Bi1ajq03e1FOj0dKAhQG%2BhbhCKVKOX4yUkxdKZQWm%2Bg%2FuS4EKrBw0abV5%2BCE0tmVtSs4MpbVjeplpE7R5zt36UxLe5cGgE8sstzBrAI9Wysk5zlOIpMUs6oF%2BIT7dRtg1rhHX3L5c1SIdZoZDhJmeXZQ7XoL0i0lkEBpeuI8W0ejeSFtr%2BUqh65S7eErapB%2BdGRLuLcsnpU4Z%2FfBbYvDs8APjxzZVOKBjHkmrbMys42NFA70Pebsqh%2FoU6yMb%2F5sJm%2Bn3KQwW0phyJzNHNWgck9jatNKkyw%2BDAXzOZ2VvEiCsKccw8ZRv%2B05JND42GhKHT%2F6crFNR71Z5nLQRR8LeBKSnQHOS4xllhW2TF%2Bbj3D3fY30jDQXi7Uz4g0ww%2BLVzgY6pgETwoiLPSyZvcHg9iwee%2BHBxqVxC1HxmBs1smvlmfgaQAf2%2FfoR5CKdhCwyVt2ye3z6LZVNvG4otrqPvbvj4OVuOxIYZeYbVfI7aGYf9W7r0qUc%2FYfM3%2BW7Iel%2Fp5f9Q1bo41fx5ogd7DdBi88ceEULT0D6WgPmc6dwr0bXZ8eEZlDgjAduaC0PbrC5LPlfcz0Gp8fv%2FQqxn5j0s10cTa0sQrKWSyC%2F&X-Amz-Signature=a847ddfe137933ffccb5e48fd1bbfbd0aed83caf8fb5e3efd25015c28c7599d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDZKA2CS%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQC%2FrJguOAJ0OhynO9lh2FPnHtrRTyr2gu9vtFCjW63mjwIhAKw1twWdLtXVuS66ieT1LKcFmAT2LZ7LneVzF0ug2FBNKogECO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwDZLoBWIGDlqjq1Jcq3AP2GsxPt%2FEHIDOtu%2FuKO3h3qRMPShmHmjuV38hc8kT2Uq4OH8uipLBr34ahClS61bnj5oPQcoiVgoPVWS88WqDQ2HxWOWPws8btUrs%2BiEn9atcMGUwMW4ZK0LUFXkAhTkLInwZQHXLezIXVjt3sXtSOIHPWs%2FlZNYqIe0D85v4fK6eySh9a5AoCfNkk9WAJ8fw34Zf1%2Fg8MbV9lawnFIyHMbDjXLGrGrYJ%2BsxKZOqMWhi3x9u3Gq17kgrHkQTkwQ4F6szuth%2Fs7G%2FbFzExJoDWytCEIA7qWGyXWWWuNoMmhGGs%2B9GGjFZPlXqrA4dU1fzV2mlvGwf2tdSqnazfiuGwM8sI%2BEBKvRcl1MUWkw1xc6wv9WSjSQ7dhS0sarmIpkmPKl8o54CG2Nx0%2BZqR22q%2FlwNPOBtTuznQn6Ek5eHSrZy1xzcWJq4IttlZF9P9nf2q1rWpdm2GjXATprIz%2FLDUxpsBvqLKLvn%2FwYT5dflEo37kGVzjgJMjpqSqHW0bt2ExieN26ZsHgeD7i%2FL1cEuMXKhk27GVEVjQfzJtH59vK%2FIsm7IuYuJOvY1GzBbXN2szYMIcgQCUaYLmCwbx0fmPR9CLjLqvZv7zbjGS0S0r%2BXeUh0dg7hM6utZQi7zDE4tXOBjqkAX1CdrSBXZ8Qh5dQchkvmns%2BqVVpV5how2ZT9v5daFUQEB8Qep9oFI0Z3Qwj%2BubwOnTxUanQN54p7VgOEdDD%2FC1s3z0%2FLXGSolo7w1FiOWxYNiYwKtTdwqt%2FvnBOajjQGLJDOxiYGg8lbyMh6T5CdWZgdVy4%2FUF1Xia4oKVTE4ZMBYCcPzR%2BTqHxcsZtWtxwfhQP0mqEqNWlSqDQgXuYZLFO5ZKN&X-Amz-Signature=e572ab9c6518751b2b713d8d0c98f8be4d5a669cbd26f563b4004c64b3df2c45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDZKA2CS%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQC%2FrJguOAJ0OhynO9lh2FPnHtrRTyr2gu9vtFCjW63mjwIhAKw1twWdLtXVuS66ieT1LKcFmAT2LZ7LneVzF0ug2FBNKogECO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwDZLoBWIGDlqjq1Jcq3AP2GsxPt%2FEHIDOtu%2FuKO3h3qRMPShmHmjuV38hc8kT2Uq4OH8uipLBr34ahClS61bnj5oPQcoiVgoPVWS88WqDQ2HxWOWPws8btUrs%2BiEn9atcMGUwMW4ZK0LUFXkAhTkLInwZQHXLezIXVjt3sXtSOIHPWs%2FlZNYqIe0D85v4fK6eySh9a5AoCfNkk9WAJ8fw34Zf1%2Fg8MbV9lawnFIyHMbDjXLGrGrYJ%2BsxKZOqMWhi3x9u3Gq17kgrHkQTkwQ4F6szuth%2Fs7G%2FbFzExJoDWytCEIA7qWGyXWWWuNoMmhGGs%2B9GGjFZPlXqrA4dU1fzV2mlvGwf2tdSqnazfiuGwM8sI%2BEBKvRcl1MUWkw1xc6wv9WSjSQ7dhS0sarmIpkmPKl8o54CG2Nx0%2BZqR22q%2FlwNPOBtTuznQn6Ek5eHSrZy1xzcWJq4IttlZF9P9nf2q1rWpdm2GjXATprIz%2FLDUxpsBvqLKLvn%2FwYT5dflEo37kGVzjgJMjpqSqHW0bt2ExieN26ZsHgeD7i%2FL1cEuMXKhk27GVEVjQfzJtH59vK%2FIsm7IuYuJOvY1GzBbXN2szYMIcgQCUaYLmCwbx0fmPR9CLjLqvZv7zbjGS0S0r%2BXeUh0dg7hM6utZQi7zDE4tXOBjqkAX1CdrSBXZ8Qh5dQchkvmns%2BqVVpV5how2ZT9v5daFUQEB8Qep9oFI0Z3Qwj%2BubwOnTxUanQN54p7VgOEdDD%2FC1s3z0%2FLXGSolo7w1FiOWxYNiYwKtTdwqt%2FvnBOajjQGLJDOxiYGg8lbyMh6T5CdWZgdVy4%2FUF1Xia4oKVTE4ZMBYCcPzR%2BTqHxcsZtWtxwfhQP0mqEqNWlSqDQgXuYZLFO5ZKN&X-Amz-Signature=f4876ddc34c018817a20153973e61d91b16f8d3e3c5c4f22f1cadeb4b022adfa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUF4G4VT%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQDjSwJfsvPGuhkoC4nubLvsoz%2Bq6Tdp3S1rPtOAPB1j1AIhAI108vuXRVZawyEQZA10dce4Oykn7ASUApV4xCPtGMleKogECO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyOjzlaDkPvmAL1XwQq3AOTtoDgpNzGDqYjMqwF%2FawwLTUKEJ%2Bl11vuAp3F4oDmkuixqcagz24blIgE0B4uQS78DEB21xs5fFdzFmP0E36oxgV4exq1WjI7UzTVFR82vp9S%2B9u%2FuOFj%2Brp5XjeXS3RVyXh0JBSrva3KoJO8Nu71NnW8F5Vmt3j5Q6Z6JLiqtxsXQEV2Tu%2FYh%2BwSYVAyuoOkX009cEZDRtlSNtSI%2FwXFu6Eer28%2FtXOvmzNWbhlCBJknk2umx6JSJQvtEEsCiBH003JkQ98PJ87um%2Bpu%2BYi4qbutga6M31gmhg9SAAI9gWBhlgZ7mIlSYAV8H1V%2B2e6IWONfIGTL6XHhVtHe%2BJIK%2FUejLrU1YEN%2Bn8ZOEDltuOZpKgtjfujgj7dQIqWeY9%2FBg8lGPeza2f3epWbYr%2F2UfxZimhDs%2BWPpQwiBjNAxoa%2FimwApP7ffXrhJqLpSGW7%2FAPBHT3ORgKB5GCUxpejkwBiYwGKkQHpmqcAf0eQG3M0cghS68EMG5DscCS%2BJimj01hC4wZCL4GPJ9J1NXsgghZKnTJblvUVOPtA2Y6Ut%2FqabCyAR%2FViQ9vQGnm0nIrJFUlndjlZvuLENQo8M5pZYKVzIyYFAhaDsntviPBSBZWtdXMQOg3a%2BngwFVTCn4dXOBjqkASNKAV3F8uECVwqc%2Fi0NtlzXF2VXp0Fw8XJ8VVC6FHXQUrI0A%2BYWvbvxqz%2BiudnYG1oHgWChJJUJd3dkFYi567boQdfO%2BqOInK%2BGVXbssaO%2B4ZzgdAfC%2FVVGxr%2FShgOUPpZgTPV%2Bj203jR5p8En3xbmV1rxLOCH%2BGR9MqWji%2FB2SKeX4wFWKamiqbJHBiPWJ6AQt2yJz5syi2aJ4IsMToSJqo%2BbQ&X-Amz-Signature=28cada8071e0f117a9f4004924a34352e22cd95ed263b31b4b6da589645ec027&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UVEDT5F%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQC4pZJjq8nRwwmVImL%2FSx%2B1YCA%2FsmHxSIotJiJK%2BblnGwIgYmfCkz%2BCMjXIA6%2Bi87gr6sArWAfgD8Y8abxXKLgUvXoqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMijLTJcRMbliQLIoSrcA7WbsyMEV%2FdWHtBI4Gs97D%2Ff7eTQ1Y3VRXhLP%2BSmvQ6MzVGxT3s3IxQOSIbNCOr9DoExJw5kbPeZ7Ib19DSa%2FFMQYyGAWqYDErjjvyFMWZPtG51EFT41GjceSBbHTGAbWBESNbmL%2B8loXIdLRMxfNeIpG2xWb5qs0GKdOvsxW8UR89Hgv7CNQ8JNykXKKjvz7FZnVnXS0fTAHXWzog9pVkaofkI2AwvFOUu4oe%2BwRc3jyLxtnRUxKs2ZnuA87klEh0%2BrKVE%2BAYxC%2BM6eBso1hDSZ5QmnVpKZpE1uCZlw57OTguCAJHMpaZUxGtSkq1livVT6vZEzMH3RJd1NbnHjQHFSt2F6yB91%2FRgJKRLoDoH9SSbAGNjJRU4TEjaFWvgdt0WUlFnRSkL2SsX%2FScGlBTV4g0l8tAQJDCwUVzOc1hxRPnvoAFqPSSm2TCpG3zBzLnSwXteoSFb1UjZAUvfJ4ELo62DIAgqYj2ptxQue%2F%2Fjpi%2BcYmrZHrq7KIcOJT6%2Fs2WVkj%2BUiVDsVyzzKSOFc8Qx2DujBBa43WtXZev81U%2BF0iE3sSTFJBS3rJ%2BtzoeZZFx7gsIs4JFbFJw0wlMy76BLvgMI9Xy0wpPCiXFY6C3RMpAuTkohMqHZL8OGCMLvg1c4GOqUB6rLV08bIAVOjUXYjG6PWvW1p0leQg3F5xASOtAAkELO%2B5rM2EdDQvkblPI4Zj%2BixE%2BhPYc2xubY2uFH%2FyUyNICIG2Zsg%2BTIEcHzrtczf53CDjSm6FGAvRzgsNG4Ej5%2BFMCWX1DBVxmhka27h4jlkASjiZ7M%2BpmpVaQJkjAVEiONEx5vOOTpifvgE9P8YwDs5SZ%2FxC41nByRrIMXiZOYpAYhDyZbK&X-Amz-Signature=2c3bd3397864c7147d8ef9fbc5bd0620262e73a224b6fb3165d3c1ef42218431&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UVEDT5F%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQC4pZJjq8nRwwmVImL%2FSx%2B1YCA%2FsmHxSIotJiJK%2BblnGwIgYmfCkz%2BCMjXIA6%2Bi87gr6sArWAfgD8Y8abxXKLgUvXoqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMijLTJcRMbliQLIoSrcA7WbsyMEV%2FdWHtBI4Gs97D%2Ff7eTQ1Y3VRXhLP%2BSmvQ6MzVGxT3s3IxQOSIbNCOr9DoExJw5kbPeZ7Ib19DSa%2FFMQYyGAWqYDErjjvyFMWZPtG51EFT41GjceSBbHTGAbWBESNbmL%2B8loXIdLRMxfNeIpG2xWb5qs0GKdOvsxW8UR89Hgv7CNQ8JNykXKKjvz7FZnVnXS0fTAHXWzog9pVkaofkI2AwvFOUu4oe%2BwRc3jyLxtnRUxKs2ZnuA87klEh0%2BrKVE%2BAYxC%2BM6eBso1hDSZ5QmnVpKZpE1uCZlw57OTguCAJHMpaZUxGtSkq1livVT6vZEzMH3RJd1NbnHjQHFSt2F6yB91%2FRgJKRLoDoH9SSbAGNjJRU4TEjaFWvgdt0WUlFnRSkL2SsX%2FScGlBTV4g0l8tAQJDCwUVzOc1hxRPnvoAFqPSSm2TCpG3zBzLnSwXteoSFb1UjZAUvfJ4ELo62DIAgqYj2ptxQue%2F%2Fjpi%2BcYmrZHrq7KIcOJT6%2Fs2WVkj%2BUiVDsVyzzKSOFc8Qx2DujBBa43WtXZev81U%2BF0iE3sSTFJBS3rJ%2BtzoeZZFx7gsIs4JFbFJw0wlMy76BLvgMI9Xy0wpPCiXFY6C3RMpAuTkohMqHZL8OGCMLvg1c4GOqUB6rLV08bIAVOjUXYjG6PWvW1p0leQg3F5xASOtAAkELO%2B5rM2EdDQvkblPI4Zj%2BixE%2BhPYc2xubY2uFH%2FyUyNICIG2Zsg%2BTIEcHzrtczf53CDjSm6FGAvRzgsNG4Ej5%2BFMCWX1DBVxmhka27h4jlkASjiZ7M%2BpmpVaQJkjAVEiONEx5vOOTpifvgE9P8YwDs5SZ%2FxC41nByRrIMXiZOYpAYhDyZbK&X-Amz-Signature=2c3bd3397864c7147d8ef9fbc5bd0620262e73a224b6fb3165d3c1ef42218431&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664P5PXDZK%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T222438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIGjTzZIAnaOt%2FI%2F4zUFbHsUnj9iyfS00j5NFdhwS5gTDAiEAhEUS1gThP02neYvDBHd%2B2odhLK4kDl%2Fv%2F%2BEcWOjUvHoqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMbCAPdTNylivwI2BircAx2j1VtFXwKiPJtcjATk%2FC79pgkPVz7CVswLFbU%2F%2BWdFkpEDGqhRafrtX43MlCfLYLyaKY2XaGPhdprLZbf3ezFjn3NvhgHIAQDpOFhVem3I6HIavClbhZ6kiHRQIv4fQkzEFtpiYdQLFd0%2B3Sq1ngh3%2BoAG16hHw6uPRH8I%2B0%2FMuI4cQBGgqJn4i9DIcoYeP0Andgk7Uwrypb5kG8T6rQHRm%2Bqmi8nFB%2FzJ8kayE9RQwiIJfPkvbQBUukhzVlqz5LNBAOAgB7vee0mx6j28AgYPE0rPtnPfLm4QepvMRGEaRkdtiD0S1vlNi3ez3zQNkDwOBnh2vMdJozDZpC9CifTKufXTZKW%2FxogHHcPF2WR%2FRE8FOG%2FlAC%2F4nl5wbc7PKRWHYIRtCJRbd9wo5ixEHHUGSzq54rgqhhoI3MSH0pcFxDOWni1XILXX%2FQkkhYSiDz9zLXQQi71xc7Y%2FgaoUYOZ5ZvY5mG48nlsYdPYGmQPJJGQoPLSN90fnE2ULto%2Fflyrwn7qvG8NE0REJkQ2bQQDUhdAeuGjyHclUZj%2FlRgsO7yjJLkJo7PKZh7evBCZIDyo%2BVMgBKyCMWJ3fpb3tIGJjuSc9aRgqxppGriG1UM6FTeSwtldWs7ZmtUtRMIHh1c4GOqUBH5VQm2WInxnKHS5nkeWEJARC0HTVMeF8hGoJXVBd%2FB2ooBXQ4lECus%2F1DBKnl%2BhWVpORc5HA5KpEq7LDz%2FAFDujNVoz4csZO6yXyGRYO4kiTwEM7IhWtPA92DoN0GKAeP%2BxbOy9Uy7xHRP7x%2BGj3dlyCBTL8uPKeLZEI3nOOwss4PSyeRIQE7eJq1zliqpBP2cnzXio7VO%2FUM5NwfbW6XxL1eUrx&X-Amz-Signature=6f4dc02581491fea3e8480cfc0c5a8c3b075ac8e7e48a95d0ab9efbf5d8f0e90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

